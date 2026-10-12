import { NextResponse } from 'next/server';
import { INITIAL_PROJECTS } from '@/data/initialData';

export async function GET() {
  return NextResponse.json({
    projects: INITIAL_PROJECTS,
  });
}

export async function POST(request: Request) {
  try {
    const newProject = await request.json();
    return NextResponse.json({
      success: true,
      project: newProject,
      message: 'Project registered successfully.',
    });
  } catch {
    return NextResponse.json({ error: 'Failed to create project.' }, { status: 500 });
  }
}
