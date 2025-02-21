import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

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

    const response = await axios.post(telegramUrl, {
      chat_id: chatId,
      text: text,
    });

    if (response.data.ok) {
      return NextResponse.json({ success: true, message: 'Message sent successfully!' });
    } else {
      return NextResponse.json({ success: false, message: 'Failed to send message.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return NextResponse.json({ success: false, message: 'Error sending message.' }, { status: 500 });
  }
}
