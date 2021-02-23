import { createTransport, getTestMessageUrl } from 'nodemailer';

interface Envelope {
  from: string;
  to?: string[] | null;
}

interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeEmail(text: string): string {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello there!</h2>
      <p>${text}</p>
      <p>From Paul</p>
    </div>
  `;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = (await transporter.sendMail({
    to,
    from: 'test@example.com',
    subject: 'Your password reset token',
    html: makeEmail(
      `Your password reset link is here! Click<a href=${process.env.FRONTEND_URL}/reset?token=${resetToken}>here</a>to reset.`
    ),
  })) as MailResponse;

  if (process.env.MAIL_USER.includes('etheral.email')) {
    console.log(`📧 Message sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
