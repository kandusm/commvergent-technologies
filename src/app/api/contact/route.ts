import { NextResponse } from "next/server";

type Payload = { name: string; email: string; message: string; website?: string };

// Health check (visit /api/contact in browser → should return JSON)
export async function GET() {
  return NextResponse.json({ ok: true, method: "GET" });
}

export async function POST(req: Request) {
  let data: Partial<Payload>;
  try {
    data = (await req.json()) as Partial<Payload>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message, website } = data;

  // Honeypot for bots
  if (website && website.trim()) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  // TODO: wire your mailer here. For now, just log:
  console.log("Contact form submission:", { name, email, message });

  return NextResponse.json({ ok: true });
}
