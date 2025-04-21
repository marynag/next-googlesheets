import { NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export async function POST(req: Request) {
  const body = await req.json();

  const { email, firstName, lastName, message } = body;

  if (!process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error("Missing GOOGLE_PRIVATE_KEY");
  }
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL");
  }
  if (!process.env.GOOGLE_SHEET_ID) {
    throw new Error("Missing GOOGLE_SHEET_ID");
  }

  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join("\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SHEET_ID ?? "",
    serviceAccountAuth
  );

  try {
    if (!email) {
      throw new Error("Missing email");
    }

    await doc.loadInfo();

    //getting the different sheets in 1 file
    const sheet = doc.sheetsByIndex[0];

    //adding new rows. BUT make sure the "email", "firstName", "lastName", "message" header should exist
    await sheet.addRow({
      email: email,
      firstName: firstName,
      lastName: lastName,
      message: message,
    });
    sheet.saveUpdatedCells();

    return NextResponse.json({ message: "A ok!" });
  } catch (error) {
    console.error("Google API error -", error);
    return NextResponse.json({ message: error });
  }
}

export async function GET() {
  if (!process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error("Missing GOOGLE_PRIVATE_KEY");
  }
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL");
  }
  if (!process.env.GOOGLE_SHEET_ID) {
    throw new Error("Missing GOOGLE_SHEET_ID");
  }

  const serviceAccountAuth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join("\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    process.env.GOOGLE_SHEET_ID ?? "",
    serviceAccountAuth
  );

  try {
    await doc.loadInfo();

    //getting the different sheets in 1 file
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const rowData = rows.map((row) => {
      const formattedRow: Record<string, string | number | null | undefined> =
        {};
      sheet.headerValues.forEach((header) => {
        formattedRow[header] = row.get(header);
      });
      return formattedRow;
    });

    return NextResponse.json(rowData);
  } catch (error) {
    console.error("Google API error -", error);
    return NextResponse.json(error);
  }
}
