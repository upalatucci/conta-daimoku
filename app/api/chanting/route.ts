import { NextResponse, NextRequest } from "next/server";
import { kv } from "@vercel/kv";

const ACTIVE_CHANTERS_KEY = "active-chanters";

export async function GET() {
  const now = Date.now();

  await kv.zremrangebyscore(ACTIVE_CHANTERS_KEY, 0, now);

  const count = await kv.zcard(ACTIVE_CHANTERS_KEY);

  return NextResponse.json({ count }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const durationMinutes = parseInt(body.duration);
  if (isNaN(durationMinutes) || durationMinutes <= 0) {
    return NextResponse.json(
      { message: "Durata non valida" },
      { status: 400 }
    );
  }

  const sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  const expiresAt = Date.now() + durationMinutes * 60 * 1000;

  await kv.zadd(ACTIVE_CHANTERS_KEY, { score: expiresAt, member: sessionId });

  return NextResponse.json(
    { message: "OK", sessionId, expiresAt },
    { status: 200 }
  );
}
