import TelegramBot from "node-telegram-bot-api";

const TOKEN = "YANGI_TOKENNI_SHUYERGA_QOYING";

const bot = new TelegramBot(TOKEN, { polling: true });

console.log("🤖 Bot ishga tushdi...");


// --------------------------
// /start HANDLER
// --------------------------
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();
  const firstName = msg.chat.first_name || "foydalanuvchi";

  if (text === "/start") {
    bot.sendMessage(
      chatId,
      `
👋 Assalomu alaykum, ${firstName}!

📚 *100x Academy* o‘quv markazining rasmiy botiga xush kelibsiz!

Bu bot orqali siz:
• Kurslar haqida batafsil ma’lumot olasiz  
• Onlayn ro‘yxatdan o‘tishingiz mumkin  
• Dars jadvali va to‘lovlar bilan tanishasiz  

Quyidagi menyudan tanlang 👇
      `,
      {
        parse_mode: "Markdown",
        reply_markup: {
          keyboard: [
            [{ text: "📚 Kurslar" }, { text: "✍️ Ro‘yxatdan o‘tish" }],
            [{ text: "ℹ️ Markaz haqida" }, { text: "💬 Fikr bildirish" }],
            [{ text: "❓ Yordam" }],
          ],
          resize_keyboard: true,
        },
      }
    );
  }

  // --------------------------
  // MENYULAR
  // --------------------------
  else if (text === "📚 Kurslar") {
    bot.sendMessage(
      chatId,
      `
🎓 *Bizning kurslar:*

Quyidagi kurslardan birini tanlab, batafsil ma’lumot olishingiz mumkin:
      `,
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "🇬🇧 Ingliz tili", callback_data: "course_english" }],
            [{ text: "🇷🇺 Rus tili", callback_data: "course_russian" }],
            [{ text: "🧮 Matematika", callback_data: "course_math" }],
            [{ text: "💻 Dasturlash", callback_data: "course_it" }],
            [{ text: "🎨 Grafik dizayn", callback_data: "course_design" }],
          ],
        },
      }
    );
  }

  else if (text === "ℹ️ Markaz haqida") {
    bot.sendMessage(
      chatId,
      `
🏫 *100x Academy haqida*

📍 Manzil: Chilonzor-9  
📞 Aloqa: +998 90 123 45 67  
🌐 Sayt: 100x.uz  
⏱ Ish vaqti: 09:00 — 21:00

*Biz bilan bilimlaringizni 100 baravar oshiring!*
      `,
      { parse_mode: "Markdown" }
    );
  }

  else {
    bot.sendMessage(
      chatId,
      `
⚠️ Kechirasiz, bu buyruqni tushunmadim.

Iltimos, quyidagidan foydalaning:
/start
      `
    );
  }
});


// --------------------------
// CALLBACK HANDLER (KURSLAR)
// --------------------------
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  const info = {
    course_english: {
      title: "🇬🇧 Ingliz tili kursi",
      desc: `
📘 *Ingliz tili kursi (Beginner — IELTS)*  

• Grammatikaga asoslangan darslar  
• Speaking & Listening mashg'ulotlar  
• IELTS tayyorlov  
• Haftasiga 3 kun  
• Narxi: 350 000 so‘m / oy  
      `,
    },
    course_russian: {
      title: "🇷🇺 Rus tili kursi",
      desc: `
📕 *Rus tili 0 dan*  

• Kundalik suhbat  
• Grammatikani chuqur o‘rgatish  
• Haftasiga 3 kun  
• Narxi: 300 000 so‘m / oy  
      `,
    },
    course_math: {
      title: "🧮 Matematika kursi",
      desc: `
📗 *Maktab va oliy ta’limga tayyorlov*  

• Maktab matematika  
• Abituriyentlar uchun maxsus kurs  
• Haftasiga 3–4 kun  
• Narxi: 400 000 so‘m / oy  
      `,
    },
    course_it: {
      title: "💻 Dasturlash kursi",
      desc: `
💻 *Programming (Python & Web)*  

• Python asoslari  
• Frontend (HTML, CSS, JS)  
• Real loyihalar  
• Narxi: 450 000 so‘m / oy  
      `,
    },
    course_design: {
      title: "🎨 Grafik dizayn",
      desc: `
🎨 *Adobe Photoshop & Illustrator kursi*  

• Dizayn asoslari  
• Banner, logo, social media  
• Portfolio yaratish  
• Narxi: 400 000 so‘m / oy  
      `,
    },
  };

  if (info[data]) {
    bot.sendMessage(
      chatId,
      `*${info[data].title}*\n${info[data].desc}`,
      { parse_mode: "Markdown" }
    );
  }

  bot.answerCallbackQuery(query.id);
});
