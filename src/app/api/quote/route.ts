import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Server-side field validation
    if (!data.fullName || !data.phone || !data.email || !data.postcode) {
      return NextResponse.json(
        { error: 'Missing mandatory fields: Name, Phone, Email, and Postcode are required.' },
        { status: 400 }
      );
    }

    // In a production environment with email/webhook integration:
    // e.g. SendGrid / Resend / Postmark / Outstatic Git commit
    console.log('[APEX QUOTE INQUIRY RECEIVED]', {
      name: data.fullName,
      phone: data.phone,
      email: data.email,
      postcode: data.postcode,
      service: data.service,
      propertyType: data.propertyType,
      timeframe: data.timeframe,
      description: data.description,
      attachmentsCount: data.uploadedPhotos?.length || 0,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Quote request logged successfully. An estimator will contact you within 24 hours.',
      inquiryId: `inq-${Date.now()}`,
    });
  } catch (error) {
    console.error('Error handling quote POST:', error);
    return NextResponse.json(
      { error: 'Internal server error processing quote request.' },
      { status: 500 }
    );
  }
}
