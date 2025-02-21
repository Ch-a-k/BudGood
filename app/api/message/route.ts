import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  try {
    const { name, email, message } = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Missing environment variables:', { hasBotToken: !!botToken, hasChatId: !!chatId });
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const text = `
      New message from ${name} \n
      Email: ${email} \n
      Message: ${message}
    `;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Telegram API error:', result);
      return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return NextResponse.json({ success: false, message: 'Error sending message.' }, { status: 500 });
  }
}
