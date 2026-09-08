import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Simple in-memory rate limiter (per instance — enough for early stage)
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 20; // max requests per window per IP
const rateBuckets = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();

  // Periodic eviction of expired buckets to prevent unbounded memory growth
  if (rateBuckets.size > 1000) {
    for (const [key, b] of rateBuckets.entries()) {
      if (now - b.windowStart > RATE_WINDOW_MS) {
        rateBuckets.delete(key);
      }
    }
  }

  const bucket = rateBuckets.get(ip);
  if (!bucket || now - bucket.windowStart > RATE_WINDOW_MS) {
    rateBuckets.set(ip, { count: 1, windowStart: now });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_MAX;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Juda ko'p so'rov yuborildi. Birozdan keyin qayta urinib ko'ring." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { name, phone, telegram, message, website } = body;

    // Honeypot: hidden field that bots fill. Silently accept to fool them.
    if (typeof website === "string" && website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    if (
      typeof name !== "string" ||
      typeof phone !== "string" ||
      typeof message !== "string" ||
      (telegram !== undefined && typeof telegram !== "string") ||
      (website !== undefined && typeof website !== "string")
    ) {
      return NextResponse.json(
        { error: "Noto'g'ri ma'lumot formati" },
        { status: 400 },
      );
    }

    const nameTrimmed = name.trim();
    const phoneTrimmed = phone.trim();
    const messageTrimmed = message.trim();
    const telegramTrimmed = (telegram ?? "").trim();

    if (!nameTrimmed || !phoneTrimmed || !messageTrimmed) {
      return NextResponse.json(
        { error: "Ism, telefon va xabar matni to'ldirilishi shart" },
        { status: 400 },
      );
    }

    if (
      nameTrimmed.length > 100 ||
      phoneTrimmed.length > 30 ||
      messageTrimmed.length > 4000 ||
      telegramTrimmed.length > 100
    ) {
      return NextResponse.json(
        { error: "Ma'lumotlar juda uzun" },
        { status: 400 },
      );
    }

    // Phone validation: between 7 and 15 digits (ITU-T E.164 standard)
    const phoneDigits = phoneTrimmed.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return NextResponse.json(
        { error: "Telefon raqam formati noto'g'ri (7-15 ta raqam bo'lishi kerak)" },
        { status: 400 },
      );
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error(
        "TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured in environment variables",
      );
      return genericError();
    }

    // Split chat IDs to support multiple recipients
    const chatIds = TELEGRAM_CHAT_ID.split(",")
      .map((id) => id.trim())
      .filter((id) => id.length > 0);

    if (chatIds.length === 0) {
      console.error("TELEGRAM_CHAT_ID contains no valid chat ids");
      return genericError();
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
      `👤 <b>Foydalanuvchi:</b> ${escapeHTML(nameTrimmed)}`,
      `📞 <b>Telefon:</b> ${escapeHTML(phoneTrimmed)}`,
      telegramTrimmed ? `✈️ <b>Telegram:</b> ${escapeHTML(telegramTrimmed)}` : ``,
      `💬 <b>Xabar matni:</b>`,
      `<i>${escapeHTML(messageTrimmed)}</i>`,
      `━━━━━━━━━━━━━━━━━━━━━━`,
      `📅 <b>Yuborilgan sana:</b> <i>${formattedDate}</i>`,
    ]
      .filter((line) => line !== "")
      .join("\n");

    // Send to Telegram Bot API (all chat IDs in parallel)
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    await Promise.all(
      chatIds.map(async (chatId) => {
        const response = await fetch(telegramUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage,
            parse_mode: "HTML",
          }),
        });
        if (!response.ok) {
          const result = await response.json().catch(() => null);
          console.error(
            `Telegram API error for chat_id ${chatId}:`,
            result ?? `HTTP ${response.status}`,
          );
          throw new Error("telegram_send_failed");
        }
      }),
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return genericError();
  }
}

// Never leak internal error details (chat IDs, stack traces) to the client.
function genericError() {
  return NextResponse.json(
    {
      error:
        "Xabar yuborishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring yoki telefon orqali bog'laning.",
    },
    { status: 500 },
  );
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
