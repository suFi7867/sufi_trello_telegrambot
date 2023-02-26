require("dotenv").config();

const {Telegraf} = require("telegraf"); // telegram api
const TaskController = require("./controllers/TaskController");

const {TELE_BOT_TOKEN} = process.env; // Environment Variables


const bot = new Telegraf(TELE_BOT_TOKEN); // Crteated BOT

bot.startWebhook("/webhook", null, 5000);

// messages.
bot.start(ctx => {
  ctx.reply("Welcome To Sufi Trello Boards");
  ctx.reply(`Our Services
    To Create board click /create_board
    To Delete board click /delete_board
    To Add New List click /addNew_list
    To Add New Card click /addNew_card
    To Delete Card click /delete_card`);
});


bot.command("create_board", ctx => {
  ctx.reply(`Send Board Name in given Format
              : NewBoard_name`);
});

bot.command("delete_board", ctx => {
  ctx.reply(`Send Board ID in given Format
              : removeBoard_BoardID`);
});

bot.command("addNew_list", ctx => {
  ctx.reply(`Send Board ID and ListName in given Format
              : addNewList_BoardID_ListName`);
});

bot.command("addNew_card", ctx => {
  ctx.reply(`Send List ID and Taskname in given Format
              : addNewCard_ListID_Taskname`);
});

bot.command("delete_card", ctx => {
  ctx.reply(`Send Card ID in given Format
              : RemoveCard_CardID`);
});


bot.use(async ctx => {
  // console.log(ctx)

  if (ctx.message.text.includes("removeBoard")) {
    const id = ctx.message.text.split("_")[1];

    return TaskController.deleteBoard(id)
           .then(res => ctx.reply(res));
  }

  if (ctx.message.text.includes("NewBoard")) {
    const name = ctx.message.text.split("_")[1];

    return TaskController.createBoard(name)
           .then(res => ctx.reply(res));
  }

  if (ctx.message.text.includes("addNewList")) {
    const id = ctx.message.text.split("_")[1];
    const name = ctx.message.text.split("_")[2];

    return TaskController.addListToBoard(id, name)
           .then(res => ctx.reply(res));
  }

  if (ctx.message.text.includes("addNewCard")) {
    const id = ctx.message.text.split("_")[1];
    const task = ctx.message.text.split("_")[2];

    return TaskController.addTaskToList(id, task)
           .then(res => ctx.reply(res));
  }

  if (ctx.message.text.includes("RemoveCard")) {
    const id = ctx.message.text.split("_")[1];

    return TaskController.RemoveCard(id)
           .then(res => ctx.reply(res));
  }
});


const botLaunch = function () {
  bot.launch();
};

module.exports = botLaunch;
