import { NextResponse } from 'next/server';

export async function GET() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Маскируем токен для безопасности, показываем только первые и последние 4 символа
  const maskedToken = botToken ? 
    `${botToken.slice(0, 4)}...${botToken.slice(-4)}` : 
    'not set';

  return NextResponse.json({
    hasBotToken: !!botToken,
    botTokenMasked: maskedToken,
    hasChatId: !!chatId,
    chatIdPresent: chatId ? 'set' : 'not set'
  });
}
