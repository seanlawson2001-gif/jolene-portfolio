// app/api/contact/route.ts
// This is the backend API endpoint that handles contact form submissions.
//
// HOW IT WORKS:
// 1. The contact form on the site sends a POST request to /api/contact
// 2. This code validates the submitted data
// 3. If valid, it writes a new row to Google Sheets via lib/googleSheets.ts
// 4. It returns a JSON response (success or error)
//
// IMPORTANT: This code only runs on the server (Vercel), never in the browser.
// That's why it's safe to use Google API credentials here.

import { NextRequest, NextResponse } from "next/server";
import { appendToSheet, ContactFormData } from "@/lib/googleSheets";

// ─── POST Handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body sent by the contact form
    const body = await request.json();

    const { name, email, subject, inquiryType, message } = body;

    // ── Server-side validation ────────────────────────────────────────────
    // Always validate on the server even if the frontend also validates.
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.push("Name is required and must be at least 2 characters.");
    }

    if (!email || typeof email !== "string") {
      errors.push("Email is required.");
    } else {
      // Simple regex to check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        errors.push("Please provide a valid email address.");
      }
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      errors.push("Message is required and must be at least 10 characters.");
    }

    // If there are validation errors, return them
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors.join(" ") },
        { status: 400 }
      );
    }

    // ── Sanitise inputs ───────────────────────────────────────────────────
    const formData: ContactFormData = {
      name: name.trim().slice(0, 200),
      email: email.trim().toLowerCase().slice(0, 200),
      subject: (subject || "").trim().slice(0, 300),
      inquiryType: (inquiryType || "General Inquiry").trim().slice(0, 100),
      message: message.trim().slice(0, 5000),
    };

    // ── Write to Google Sheets ────────────────────────────────────────────
    await appendToSheet(formData);

    // ── Return success ────────────────────────────────────────────────────
    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been received. I'll be in touch soon.",
      },
      { status: 200 }
    );
  } catch (error) {
    // Log the error server-side (visible in Vercel logs)
    console.error("[Contact API] Error:", error);

    // Return a safe error message to the client
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while sending your message. Please try again or email me directly.",
      },
      { status: 500 }
    );
  }
}
