import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

    try {
      const res = await fetch(`${strapiUrl}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsed.data }),
      });

      if (!res.ok) {
        console.error("Strapi message store failed:", await res.text());
      }
    } catch (strapiErr) {
      console.error("Strapi unreachable:", strapiErr);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
