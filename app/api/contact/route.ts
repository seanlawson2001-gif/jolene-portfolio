// app/api/contact/route.ts
// Handles contact form submissions — sends an email to Jolene via Resend.
//
// SETUP:
// 1. Sign up at https://resend.com (free — 3,000 emails/month)
// 2. Go to API Keys → Create API Key → copy it
// 3. Add to .env.local:  RESEND_API_KEY=re_xxxxxxxxxxxx
// 4. Add to Vercel dashboard → Settings → Environment Variables (same key)
//
// IMPORTANT: On Resend's free plan you can only send FROM onboarding@resend.dev
// unless you verify a custom domain. The email will arrive FROM that address
// but will say "Reply-To: visitor's email" so Jolene can reply directly.

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  // Debug — logs show in Vercel → Logs tab. Remove once working.
  console.log("[Contact API] KEY EXISTS:", !!process.env.RESEND_API_KEY);
  console.log("[Contact API] KEY PREFIX:", process.env.RESEND_API_KEY?.slice(0, 6) ?? "undefined");

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { success: false, message: "Server config error: API key missing." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { name, email, subject, inquiryType, message } = body;

    // ── Validate ──────────────────────────────────────────────────────────
    const errors: string[] = [];
    if (!name?.trim() || name.trim().length < 2)
      errors.push("Name is required.");
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push("A valid email is required.");
    if (!message?.trim() || message.trim().length < 10)
      errors.push("Message must be at least 10 characters.");

    if (errors.length > 0)
      return NextResponse.json({ success: false, message: errors.join(" ") }, { status: 400 });

    // ── Send email via Resend ─────────────────────────────────────────────
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      // UPDATE: Once you verify a domain on Resend, change this to your own email
      // e.g. "Jolene Portfolio <noreply@tjzoomer.com>"
      // Until then, use the free Resend address:
      from: "Jolene Portfolio <onboarding@resend.dev>",

      // UPDATE: Change this to Jolene's actual email address
      to: ["tjzoomer1@gmail.com"],

      replyTo: email.trim(),

      subject: `New message from ${name.trim()}${subject ? ` — ${subject}` : ""}`,

      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #1C1917; margin-bottom: 4px;">New Portfolio Enquiry</h2>
          <p style="color: #6B5E58; margin-top: 0; margin-bottom: 24px; font-size: 14px;">
            Submitted via jolene-portfolio-coral.vercel.app
          </p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5DED5; color: #6B5E58; font-size: 13px; width: 120px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5DED5; color: #1C1917; font-size: 14px;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5DED5; color: #6B5E58; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5DED5; color: #1C1917; font-size: 14px;">
                <a href="mailto:${email.trim()}" style="color: #C4856A;">${email.trim()}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5DED5; color: #6B5E58; font-size: 13px;">Type</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5DED5; color: #1C1917; font-size: 14px;">${inquiryType || "General Inquiry"}</td>
            </tr>
            ${subject ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5DED5; color: #6B5E58; font-size: 13px;">Subject</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #E5DED5; color: #1C1917; font-size: 14px;">${subject.trim()}</td>
            </tr>` : ""}
          </table>

          <div style="background: #F3EFE8; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px;">
            <p style="color: #6B5E58; font-size: 13px; margin: 0 0 8px 0;">Message</p>
            <p style="color: #1C1917; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message.trim()}</p>
          </div>

          <p style="color: #6B5E58; font-size: 12px; margin: 0;">
            Hit Reply to respond directly to ${name.trim()} at ${email.trim()}
          </p>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Thanks! Your message has been sent. Jolene will be in touch soon." },
      { status: 200 }
    );

  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again or email directly." },
      { status: 500 }
    );
  }
}