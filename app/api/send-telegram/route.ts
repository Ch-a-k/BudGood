import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, message } = data;

    const text = `
🔔 Nowa wiadomość ze strony:

👤 Imię: ${name}
📧 Email: ${email}
📱 Telefon: ${phone}
💬 Wiadomość: ${message}
    `;

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send telegram message');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending telegram message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
