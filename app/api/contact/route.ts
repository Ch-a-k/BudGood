import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const { name, email, message } = await req.json();

  // Replace with your actual bot token and chat ID
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const text = `
    New message from ${name} \n
    Email: ${email} \n
    Message: ${message}
  `;

  try {
    // Send the message via the Telegram Bot API
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
