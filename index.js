import TelegramBot from "node-telegram-bot-api";

const TOKEN ="8224847574:AAG8QWG_RCYvQ5q4wwxua2sFJhLTKYdpwFc"
const bot = new TelegramBot(TOKEN,{polling: true});
bot.on("message",function(msg)  {
    const chatId = msg.chat.id;
    const text = msg.text;
    console.log(msg);

    bot.sendMessage(chatId,`-->${text}`);
    bot.sendDice(chatId);
});

console.log("Bot ishga tushdi...");


