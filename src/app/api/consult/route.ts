import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || !b.name?.trim() || !/^\S+@\S+\.\S+$/.test(b.email ?? "") || !b.phone?.trim() || !b.consent)
    return NextResponse.json({ error: "Name, valid email, phone and consent are required." }, { status: 400 });
  // TODO: send to your CRM or email provider (Resend, SendGrid, etc.). Logging only for now.
  console.log("Consultation request:", { ...b, receivedAt: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
