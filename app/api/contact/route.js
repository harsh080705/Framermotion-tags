import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Optional integration with Formspree, Resend, or Webhook if environment variable is configured
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT;
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

    if (formspreeEndpoint) {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) {
        throw new Error('Failed to send via Formspree');
      }
    } else if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `📩 *New Contact Form Submission*\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`,
        }),
      });
    }

    console.log(`[Contact Form Received] Name: ${name}, Email: ${email}`);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process submission. Please try again later.' },
      { status: 500 }
    );
  }
}
