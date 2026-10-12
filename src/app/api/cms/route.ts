import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import projectsJson from '@/data/projects.json';
import heroSlidesJson from '@/data/heroSlides.json';
import testimonialsJson from '@/data/testimonials.json';

const GITHUB_REPO = 'itsmyapp-code/sistine';
const GITHUB_BRANCH = 'main';

const FILE_MAP: Record<string, string> = {
  projects: 'src/data/projects.json',
  hero: 'src/data/heroSlides.json',
  testimonials: 'src/data/testimonials.json',
};

const DATA_MAP: Record<string, any> = {
  projects: projectsJson,
  hero: heroSlidesJson,
  testimonials: testimonialsJson,
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'all';

  if (type === 'all') {
    return NextResponse.json({
      projects: DATA_MAP.projects,
      hero: DATA_MAP.hero,
      testimonials: DATA_MAP.testimonials,
    });
  }

  const data = DATA_MAP[type];
  if (!data) {
    return NextResponse.json({ error: 'Invalid data type requested' }, { status: 400 });
  }

  return NextResponse.json({ [type]: data });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data, githubToken } = body;

    if (!type || !FILE_MAP[type] || !Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Invalid payload. "type" and "data" array are required.' },
        { status: 400 }
      );
    }

    const relativeFilePath = FILE_MAP[type];
    const formattedJson = JSON.stringify(data, null, 2);

    // 1. Try local filesystem write if in local environment
    let localSaved = false;
    try {
      const localFilePath = path.join(process.cwd(), relativeFilePath);
      if (fs.existsSync(path.dirname(localFilePath))) {
        fs.writeFileSync(localFilePath, formattedJson, 'utf-8');
        localSaved = true;
      }
    } catch (fsErr) {
      console.warn('Local FS write skipped or failed:', fsErr);
    }

    // 2. Sync to GitHub repository via GitHub REST API
    const token = githubToken || process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
    let githubSynced = false;
    let githubMessage = '';

    if (token) {
      try {
        const fileApiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${relativeFilePath}`;
        
        // Get current file SHA to update
        let fileSha = '';
        const getRes = await fetch(fileApiUrl, {
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'Sistine-CMS-Sync',
          },
          cache: 'no-store',
        });

        if (getRes.ok) {
          const getJson = await getRes.json();
          fileSha = getJson.sha;
        }

        // Base64 encode JSON
        const contentBase64 = Buffer.from(formattedJson, 'utf-8').toString('base64');

        // Put commit to GitHub
        const putRes = await fetch(fileApiUrl, {
          method: 'PUT',
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'Sistine-CMS-Sync',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `[CMS Live Sync] Update ${type} data via Admin Portal`,
            content: contentBase64,
            sha: fileSha || undefined,
            branch: GITHUB_BRANCH,
          }),
        });

        if (putRes.ok) {
          githubSynced = true;
          githubMessage = `Successfully committed and synced ${type} to GitHub repository (${GITHUB_REPO})`;
        } else {
          const putErr = await putRes.json();
          githubMessage = `GitHub commit error: ${putErr.message || putRes.statusText}`;
        }
      } catch (ghErr: any) {
        githubMessage = `GitHub API request failed: ${ghErr?.message || ghErr}`;
      }
    } else {
      githubMessage = 'No GitHub Token provided. Saved locally / in browser.';
    }

    return NextResponse.json({
      success: true,
      localSaved,
      githubSynced,
      githubMessage,
      itemCount: data.length,
    });
  } catch (error: any) {
    console.error('Error in CMS API handler:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process CMS update.' },
      { status: 500 }
    );
  }
}
