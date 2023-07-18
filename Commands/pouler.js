const Discord = require("discord.js");
const cron = require("cron");
const channelID = 1120974571047235585;
var { tagueule } = require("../main");

module.exports = {
  name: "pouler",

  async alert(bot, message) {
    let text = alert();
    await message.reply(text);
  },

  async startJob(bot, time) {
    const channel = await bot.channels.fetch("1120974571047235585");
    console.log(`start scheduled Message job every day at ${time}`);
    let scheduledMessage = new cron.CronJob(time, () => {
      // This runs every day at 09:00:00, you can do anything you want
      if (!tagueule) {
        let alertText = alert();
        channel.send(alertText);
      }
    });

    scheduledMessage.start();
  },

  async startCountdown(bot) {
    let dayOfWeek = new Date().getDay();
    let currentHour = new Date().getHours();
    if (dayOfWeek === 2 && currentHour < 12) {
      console.log("start countdown every 2 hours");
      const channel = await bot.channels.fetch("1120974571047235585");
      setInterval(
        function () {
          if (new Date().getHours() < 12 && !tagueule)
            channel.send(
              `${remainingHours(12)} hours left before the pouler !!!`
            );
        },
        120 * 60000 //every 2 hours : 7200000 ms
      );
    }
  },

  async on_message(message) {
    reactChicky(message);
  },
};

function remainingHours(time) {
  let currentHour = new Date().getHours();
  let diff = time - currentHour;
  return diff;
}

function getDaysDifference(otherDay, dayOfWeek) {
  return (otherDay + 7 - dayOfWeek) % 7;
}

function alert() {
  let text = "";
  let thursday = 2;

  if (isThursday())
    text = `:rotating_light: **[ALERTE POULER] Jour du pouler !!! Tous aux abris !!!** :rotating_light:`;
  else {
    let diff = getDaysDifference(thursday, new Date().getDay());
    text = `:rotating_light: pas de pouler pour aujourd'hui mon gars... il faut attendre encore ${diff} jours ! :rotating_light:`;
  }

  return text;
}

function isThursday() {
  let thursday = 2;
  return new Date().getDay() === thursday;
}

function reactChicky(message) {
  if (isThursday) react(message, ":hatched_chick:");
}

function react(message, emoji) {
  message.react(emoji);
}
