// ───────────────────────────────
// 📦 Dependencies
// ───────────────────────────────
import { NextResponse } from 'next/server';

import { GetRequest } from "@/lib/api/api.client"

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { data } = await GetRequest(
      {
        baseURL: process.env.SERVICE_API_URL,
        url: `/rest/bpm/wle/v1/process/${body.piid}`,
        data: {
          parts: "all",
        },
        auth: {
          username: "BAGR01",
          password: "abc123"
        }
      });

    return NextResponse.json({ data });

  } catch (error) {
    console.error('Error al obtener los datos:', error);

    return NextResponse.json({ error: 'Error al obtener los datos.' }, { status: 500 });
  }
}
