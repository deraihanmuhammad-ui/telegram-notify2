// app.js - simple Express server to forward form data to Telegram Bot API
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID  = process.env.CHAT_ID;

if (!BOT_TOKEN || !CHAT_ID) {
  console.error("ERROR: BOT_TOKEN or CHAT_ID not set in environment. See .env.example");
  process.exit(1);
}

function escapeHtml(str = "") {
  return String(str).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

app.post("/send", async (req, res) => {
  try {
    const { email, packageName, price, userAgent } = req.body;
    if (!email) return res.status(400).json({ ok: false, error: "email required" });

    const message = `📩 <b>NOTIF KONTAK BARU</b>\n📧 <b>Email/Telepon:</b> <code>${escapeHtml(email)}</code>\n💎 <b>Paket:</b> ${escapeHtml(packageName || "-")}\n💰 <b>Harga:</b> ${escapeHtml(price || "-")}\n🌐 <b>User Agent:</b> <code>${escapeHtml(userAgent || "")}</code>\n⏰ <b>Waktu:</b> ${new Date().toLocaleString('id-ID')}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML"
      })
    });
    const j = await r.json();
    if (!j.ok) {
      console.error("Telegram API responded with error:", j);
      return res.status(500).json({ ok: false, error: j });
    }
    return res.json({ ok: true, result: j.result });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
