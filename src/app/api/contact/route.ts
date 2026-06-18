import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN =
  process.env.TELEGRAM_BOT_TOKEN ||
  "7715117776:AAF-EWZnyhRNDiS0hL1wIYxsn093HAu5noY";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "2044475931";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, telegram, subject, message } = body;

    // Validate required fields
    if (!name || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "Barcha maydonlar to'ldirilishi shart" },
        { status: 400 },
      );
    }

    if (!TELEGRAM_CHAT_ID) {
      console.error(
        "TELEGRAM_CHAT_ID is not configured in environment variables",
      );
      return NextResponse.json(
        { error: "Telegram bot sozlanmagan" },
        { status: 500 },
      );
    }

    // Split chat IDs to support multiple recipients
    const chatIds = TELEGRAM_CHAT_ID.split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    if (chatIds.length === 0) {
      return NextResponse.json(
        { error: "Telegram chat ID topilmadi" },
        { status: 500 },
      );
    }

    // Format the message for Telegram (HTML parse mode)
    const formattedDate = new Date().toLocaleString("uz-UZ", {
      timeZone: "Asia/Tashkent",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const telegramMessage = [
      `<b>📩 Yangi Murojaat — TATUAL</b>`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Foydalanuvchi:</b> ${escapeHTML(name)}`,
      `📞 <b>Telefon:</b> ${escapeHTML(phone)}`,
      telegram ? `✈️ <b>Telegram:</b> ${escapeHTML(telegram)}` : ``,
      `📌 <b>Mavzu:</b> ${escapeHTML(subject)}`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `💬 <b>Xabar matni:</b>`,
      `<i>${escapeHTML(message)}</i>`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `📅 <b>Yuborilgan sana:</b> <i>${formattedDate}</i>`,
    ]
      .filter((line) => line !== "")
      .join("\n");

    // Send to Telegram Bot API (all chat IDs in parallel)
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const sendRequests = chatIds.map(async (chatId) => {
      const response = await fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage,
          parse_mode: "HTML",
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        console.error(`Telegram API error for chat_id ${chatId}:`, result);
        throw new Error(`Chat ${chatId} ga xabar yuborib bo'lmadi`);
      }
      return result;
    });

    await Promise.all(sendRequests);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Server xatoligi yuz berdi" },
      { status: 500 },
    );
  }
}

/**
 * Escape HTML special characters for Telegram's HTML parse mode.
 */
function escapeHTML(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
