import { NextResponse } from 'next/server';
import { INITIAL_TESTIMONIALS } from '@/data/initialData';

export async function GET() {
  return NextResponse.json({
    testimonials: INITIAL_TESTIMONIALS,
  });
}

export async function POST(request: Request) {
  try {
    const newTestimonial = await request.json();
    return NextResponse.json({
      success: true,
      testimonial: newTestimonial,
      message: 'Testimonial registered successfully.',
    });
  } catch {
    return NextResponse.json({ error: 'Failed to create testimonial.' }, { status: 500 });
  }
}
