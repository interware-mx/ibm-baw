// ───────────────────────────────
// 📦 Dependencies
// ───────────────────────────────
import { NextResponse } from 'next/server';

import { GetRequest } from "@/lib/api/api.client"

export async function GET() {
  try {
    const { data } = await GetRequest(
      {
        baseURL: process.env.SERVICE_API_URL,
        url: "/rest/bpm/wle/v1/processes/search",
        data: {
          userFilter: process.env.SERVICE_API_USER_FILTER,
          statusFilter: "Active",
          projectFilter: "SM",
          limit: 10,
          includeNonAdmin: false,
          startedByMe: true
        },
        auth: {
          username: process.env.SERVICE_API_USERNAME || "",
          password: process.env.SERVICE_API_PASSWORD || ""
        }
      });

    return NextResponse.json({ data });

  } catch (error) {
    console.error('Error al obtener los datos:', error);

    return NextResponse.json({ error: 'Error al obtener los datos.' }, { status: 500 });
  }
}
