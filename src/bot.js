require("dotenv").config();

const {Telegraf} = require("telegraf"); // telegram api
const TaskController = require("./controllers/TaskController");

const {TELE_BOT_TOKEN} = process.env; // Environment Variables

const bot = new Telegraf(TELE_BOT_TOKEN);
// Listen for any kind of message. There are different kinds of

bot.startWebhook("/webhook", null, 5000);

// messages.
bot.start((ctx) => {
    ctx.reply("Welcome To Sufi Trello Boards");
    ctx.reply(`our Services
    To Create board click /create_board
    To Delete board click /delete_board
    To Add New List click /addNew_list
    To Add New Card click /addNew_card
    To Delete Card click /delete_card`);
});


bot.command("create_board", (ctx) => {
   ctx.reply(`Send Board Name in given Format
              : NewBoard_name`);  
});

bot.command("delete_board", (ctx) => {
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

//
//63fa24c32149a6b147bf583c
//
bot.use(async ctx => {
  // console.log(ctx)

  if (ctx.message.text.includes("removeBoard")) {
    const id = ctx.message.text.split("_")[1];

    return TaskController.deleteBoard(id).then(res => ctx.reply(res));
  }

  if (ctx.message.text.includes("NewBoard")) {
    const name = ctx.message.text.split("_")[1];

    return TaskController.createBoard(name).then(res => ctx.reply(res));
  }

  if (ctx.message.text.includes("addNewList")) {
    const id = ctx.message.text.split("_")[1];
    const name = ctx.message.text.split("_")[2];

    return TaskController.addListToBoard(id, name).then(res => ctx.reply(res));
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






  //   if (ctx.message.text.includes("addTask")) {
  //     const taskArr = ctx.message.text.split("_");

  //     const task_title = taskArr[1];
  //     const task_description = taskArr[2];
  //     const status = taskArr[3];
  //     const user_id = ctx.message.from.id;

  //     ctx.reply(
  //       TaskController.AddTaskFromTelegram({
  //         task_title,
  //         task_description,
  //         status,
  //         user_id,
  //       })
  //     );
  //   } else if (ctx.message.text.includes("remove_TaskId")) {
  //     const TaskId = ctx.message.text.split(":");
  //     const user_id = ctx.message.from.id;
  //     // console.log(TaskId);
  //     ctx.reply(TaskController.RemoveTaskFromTelegram(user_id, TaskId[1]));
  //   } else {
  //     ctx.reply("Please Provide correct command!");
  //   }
});


const botLaunch = function (){
  bot.launch();
};

module.exports = botLaunch;
