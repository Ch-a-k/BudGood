import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  try {
    const data = await req.json();
    console.log('Received data:', data);
    
    const { name, email, phone, message } = data;

    if (!name || !email || !phone || !message) {
      console.error('Missing required fields:', { name, email, phone, message });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('Missing environment variables:', { 
        hasBotToken: !!BOT_TOKEN, 
        hasChatId: !!CHAT_ID 
      });
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    console.log('Sending to Telegram:', { text: message });

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: `
            New message from: ${name}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
          `,
        }),
      }
    );

    const result = await response.json();
    console.log('Telegram API success:', result);

    if (!response.ok) {
      console.error('Telegram API error:', result);
      return NextResponse.json(
        { error: 'Failed to send message to Telegram' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in telegram route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
