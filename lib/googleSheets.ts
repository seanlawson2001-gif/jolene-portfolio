// lib/googleSheets.ts
// Handles writing contact form submissions to Google Sheets.
// Updated for googleapis v171+ (uses google-auth-library for auth).
//
// SETUP GUIDE — READ BEFORE DEPLOYING:
// ═══════════════════════════════════════════════════════════════════════════
// 1. Go to https://console.cloud.google.com/ → create a project
// 2. Enable the "Google Sheets API" for your project
// 3. IAM & Admin → Service Accounts → Create a service account
// 4. Give it any name, grant role "Editor", click Done
// 5. Click the service account → Keys tab → Add Key → JSON
//    This downloads a .json file. NEVER commit this file to GitHub.
// 6. From the JSON file, copy:
//    - "client_email" → GOOGLE_SHEETS_CLIENT_EMAIL in .env.local
//    - "private_key"  → GOOGLE_SHEETS_PRIVATE_KEY in .env.local
// 7. Create a Google Sheet at https://sheets.google.com/
//    Row 1 headers: Timestamp | Name | Email | Subject | Inquiry Type | Message
// 8. Share the Sheet with the service account email (Editor access)
// 9. Copy the Sheet ID from the URL:
//    https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit
//    → GOOGLE_SHEETS_SPREADSHEET_ID in .env.local
// ═══════════════════════════════════════════════════════════════════════════

import { google } from "googleapis";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  inquiryType: string;
  message: string;
}

/**
 * Appends a contact form row to Google Sheets.
 * Only called from the API route — never runs in the browser.
 */
export async function appendToSheet(data: ContactFormData): Promise<void> {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey  = process.env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error(
      "Missing Google Sheets env vars — check .env.local and the setup guide in lib/googleSheets.ts"
    );
  }

  // googleapis v171 uses GoogleAuth from google-auth-library under the hood.
  // The API is identical — google.auth.GoogleAuth still works.
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      // Env vars store \n as a literal string; convert back to real newlines
      private_key: privateKey.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Columns A–F: Timestamp | Name | Email | Subject | Inquiry Type | Message
  const row = [
    new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" }),
    data.name,
    data.email,
    data.subject     || "(no subject)",
    data.inquiryType || "(not specified)",
    data.message,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "Sheet1!A:F",
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });
}
