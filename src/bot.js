require("dotenv").config();

const {Telegraf} = require("telegraf"); // telegram api
const {Trello_API_KEY, Trello_Secret_Token, TELE_BOT_TOKEN} = process.env; // Environment Variables

const bot = new Telegraf(TELE_BOT_TOKEN);
// Listen for any kind of message. There are different kinds of

bot.startWebhook("/webhook", null, 5000);

// messages.
bot.start((ctx) => {
    ctx.reply("Welcome To Sufi Trello Boards");
    ctx.reply(`our Services
    To Create board send : /create_board`);
});

bot.help(ctx => ctx.reply("Send me a sticker"));
bot.on("sticker", ctx => ctx.reply("👍"));
bot.hears("hi", ctx => ctx.reply("Hey there"));


bot.command("create_board", (ctx) => {
    ctx.reply("Hello");
});


const botLaunch = function (){
  bot.launch();
};

module.exports = botLaunch;
