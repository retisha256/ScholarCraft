import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, service } = body

    // In production, send email via Nodemailer, Resend, or SendGrid
    // For now, we log it and return success
    console.log(`New project request from ${name} (${email}) for service: ${service}`)

    // Example: Send via fetch to Resend API
    // await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: 'noreply@academicpro.com',
    //     to: process.env.ADMIN_EMAIL,
    //     subject: `New Project Request from ${name}`,
    //     html: `<p>New request from <strong>${name}</strong> (${email}) for <strong>${service}</strong>. Login to the admin dashboard to view details.</p>`,
    //   }),
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Notification error:', error)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
