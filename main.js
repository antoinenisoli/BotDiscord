const Discord = require("discord.js");
const intents = new Discord.IntentsBitField(3276799);
const bot = new Discord.Client({ intents });
const loadCommands = require("./Loader/loadCommands");
const config = require("./config");

var tagueule = false;
module.exports = { tagueule };

bot.commands = new Discord.Collection();
bot.login(config.token);
loadCommands(bot);

bot.on("messageCreate", async (message) => {
  if (message.content === "!ping")
    return bot.commands.get("ping").run(bot, message);

  if (message.content === "!pouler")
    return bot.commands.get("pouler").alert(bot, message);

  if (message.content.endsWith("quoi"))
    return bot.commands.get("sendMessage").apagnan(message);

  if (message.content === "!tagueule")
    return bot.commands.get("sendMessage").tg(message);
});

bot.on("message", async (message) => {
  message.react(":hatched_chick:");
});

bot.on("ready", async () => {
  console.log(`${bot.user.tag} est bien en ligne !`);
  return bot.commands.get("pouler").startJob(bot, "00 00 09 * * *");
});

bot.on("ready", async () => {
  return bot.commands.get("pouler").startCountdown(bot);
});
