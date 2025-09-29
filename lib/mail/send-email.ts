// ───────────────────────────────
// 📦 Dependencies
// ───────────────────────────────
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { promises as fs } from 'fs';
import path from 'path';
import handlebars from 'handlebars';

// ───────────────────────────────
// 🧷 Custom Types
// ───────────────────────────────
interface EmailData {
  to: string;
  subject: string;
  templateName: string;
  context: Record<string, unknown>;
}

// ⚙️ Configuración OAuth2
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export async function sendEmail({ to, subject, templateName, context }: EmailData): Promise<void> {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token!,
    },
  });

  const templatePath = path.join(process.cwd(), 'lib', 'mail', 'templates', `${templateName}.html`);
  const templateSource = await fs.readFile(templatePath, 'utf8');

  const compiledTemplate = handlebars.compile(templateSource);
  const html = compiledTemplate(context);

  await transporter.sendMail({
    from: `"No reply: Solicitudes" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
