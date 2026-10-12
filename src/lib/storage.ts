'use client';

import { Project, Testimonial, HeroSlide } from '@/types';
import { INITIAL_PROJECTS, INITIAL_TESTIMONIALS, INITIAL_HERO_SLIDES } from '@/data/initialData';

const PROJECTS_STORAGE_KEY = 'apex_projects_data_v2';
const TESTIMONIALS_STORAGE_KEY = 'apex_testimonials_data_v2';
const HERO_SLIDES_STORAGE_KEY = 'apex_hero_slides_data_v2';
const GITHUB_TOKEN_STORAGE_KEY = 'sistine_github_token';

export function getGitHubToken(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(GITHUB_TOKEN_STORAGE_KEY) || sessionStorage.getItem(GITHUB_TOKEN_STORAGE_KEY) || '';
}

export function saveGitHubToken(token: string): void {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem(GITHUB_TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(GITHUB_TOKEN_STORAGE_KEY);
  }
}

export async function syncDataToOnline(type: 'projects' | 'hero' | 'testimonials', data: any[]) {
  try {
    const token = getGitHubToken();
    const res = await fetch('/api/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        data,
        githubToken: token,
      }),
    });
    return await res.json();
  } catch (err) {
    console.warn('Online sync failed:', err);
    return { success: false, error: err };
  }
}

export function getStoredHeroSlides(): HeroSlide[] {
  if (typeof window === 'undefined') return INITIAL_HERO_SLIDES;
  try {
    const data = localStorage.getItem(HERO_SLIDES_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(HERO_SLIDES_STORAGE_KEY, JSON.stringify(INITIAL_HERO_SLIDES));
      return INITIAL_HERO_SLIDES;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading hero slides from storage', e);
    return INITIAL_HERO_SLIDES;
  }
}

export function saveStoredHeroSlides(slides: HeroSlide[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(HERO_SLIDES_STORAGE_KEY, JSON.stringify(slides));
    window.dispatchEvent(new Event('apex_data_updated'));
    // Trigger online sync in background
    syncDataToOnline('hero', slides);
  } catch (e) {
    console.error('Error saving hero slides to storage', e);
  }
}

export function getStoredProjects(): Project[] {
  if (typeof window === 'undefined') return INITIAL_PROJECTS;
  try {
    const data = localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    const parsed: Project[] = JSON.parse(data);
    if (parsed.some((p) => typeof p.order === 'number')) {
      return [...parsed].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
    }
    return parsed;
  } catch (e) {
    console.error('Error reading projects from storage', e);
    return INITIAL_PROJECTS;
  }
}

export function saveStoredProjects(projects: Project[]): void {
  if (typeof window === 'undefined') return;
  try {
    const withOrder = projects.map((p, idx) => ({ ...p, order: idx + 1 }));
    localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(withOrder));
    window.dispatchEvent(new Event('apex_data_updated'));
    // Trigger online sync in background
    syncDataToOnline('projects', withOrder);
  } catch (e) {
    console.error('Error saving projects to storage', e);
  }
}

export function getStoredTestimonials(): Testimonial[] {
  if (typeof window === 'undefined') return INITIAL_TESTIMONIALS;
  try {
    const data = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
      return INITIAL_TESTIMONIALS;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading testimonials from storage', e);
    return INITIAL_TESTIMONIALS;
  }
}

export function saveStoredTestimonials(testimonials: Testimonial[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials));
    window.dispatchEvent(new Event('apex_data_updated'));
    // Trigger online sync in background
    syncDataToOnline('testimonials', testimonials);
  } catch (e) {
    console.error('Error saving testimonials to storage', e);
  }
}

export function resetToDefaults(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
  localStorage.setItem(HERO_SLIDES_STORAGE_KEY, JSON.stringify(INITIAL_HERO_SLIDES));
  window.dispatchEvent(new Event('apex_data_updated'));
  syncDataToOnline('projects', INITIAL_PROJECTS);
  syncDataToOnline('hero', INITIAL_HERO_SLIDES);
  syncDataToOnline('testimonials', INITIAL_TESTIMONIALS);
}

