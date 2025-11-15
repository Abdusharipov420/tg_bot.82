import TelegramBot from "node-telegram-bot-api";

const TOKEN = ""

const bot = new TelegramBot(TOKEN, { polling: true })

bot.on("message", (msg) => {
    console.log(msg)
    const chatId = msg.chat.id
    const text = msg.text

    bot.sendMessage(chatId, text)
})

console.log("Bot ishga tushdi");
