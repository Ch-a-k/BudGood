import { NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(req: Request) {
  console.log('API route called');
  
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

    const text = `
🔔 Nowa wiadomość ze strony:

👤 Imię: ${name}
📧 Email: ${email}
📱 Telefon: ${phone}
💬 Wiadomość: ${message}
    `;

    console.log('Sending to Telegram:', { text });
    
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to send message to Telegram', details: errorData },
        { status: 500 }
      );
    }

    const result = await telegramResponse.json();
    console.log('Telegram API success:', result);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully',
      result 
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
}

// Explicitly handle other HTTP methods
export async function GET(req: Request) {
  console.log('GET method called');
  return NextResponse.json(
    { error: 'Method not allowed. Use POST instead.' },
    { status: 405 }
  );
}

export async function PUT(req: Request) {
  console.log('PUT method called');
  return NextResponse.json(
    { error: 'Method not allowed. Use POST instead.' },
    { status: 405 }
  );
}

export async function DELETE(req: Request) {
  console.log('DELETE method called');
  return NextResponse.json(
    { error: 'Method not allowed. Use POST instead.' },
    { status: 405 }
  );
}

export async function PATCH(req: Request) {
  console.log('PATCH method called');
  return NextResponse.json(
    { error: 'Method not allowed. Use POST instead.' },
    { status: 405 }
  );
}
