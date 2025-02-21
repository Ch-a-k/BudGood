import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { name, email, phone, message } = data;

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'Brak wymaganych pól' },
        { status: 400 }
      );
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return NextResponse.json(
        { error: 'Błąd konfiguracji serwera' },
        { status: 500 }
      );
    }

    const text = `
<b>Nowa wiadomość</b>
<b>Imię:</b> ${name}
<b>Email:</b> ${email}
<b>Telefon:</b> ${phone}
<b>Wiadomość:</b> ${message}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: 'HTML'
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', result);
      return NextResponse.json(
        { error: 'Nie udało się wysłać wiadomości' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Błąd wewnętrzny serwera' },
      { status: 500 }
    );
  }
}
