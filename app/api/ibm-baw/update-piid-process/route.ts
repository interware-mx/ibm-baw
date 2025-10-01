// ───────────────────────────────
// 📦 Dependencies
// ───────────────────────────────
import { NextResponse } from "next/server";

import { PutRequest } from "@/lib/api/api.client";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const dataParams = Object.assign({}, body);

    delete dataParams.tkiid;

    const { data } = await PutRequest({
      baseURL: process.env.SERVICE_API_URL,
      url: `/rest/bpm/wle/v1/task/${body.tkiid}`,
      data: {
        action: "finish",
        params: dataParams,
        parts: "data",
      },
      auth: {
        username: process.env.SERVICE_API_USERNAME || "",
        password: process.env.SERVICE_API_PASSWORD || "",
      },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error al actualizar la tarea:", error);

    return NextResponse.json(
      { error: "Error al actualizar la tarea." },
      { status: 500 },
    );
  }
}
