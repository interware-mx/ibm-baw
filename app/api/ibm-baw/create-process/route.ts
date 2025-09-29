// ───────────────────────────────
// 📦 Dependencies
// ───────────────────────────────
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail/send-email';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await sendEmail({
      to: process.env.EMAIL_RECIPIENT || "",
      subject: "[DEMO]: Solicitud de material",
      templateName: 'template',
      context: body,
    });

    return NextResponse.json({ success: true, message: 'Correo enviado correctamente.' });

  } catch (error) {
    console.error('Error al enviar el correo:', error);

    return NextResponse.json({ error: 'Error al enviar el correo.' }, { status: 500 });
  }
}
