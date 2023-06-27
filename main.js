const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loader/loadCommands")
const config = require("./config")

bot.commands = new Discord.Collection()
bot.login(config.token)
loadCommands(bot)

bot.on("messageCreate", async message => {
    console.log(message.content)
    if (message.content === "!ping")
        return bot.commands.get("ping").run(bot, message)

    if (message.content === "!pouler")
        return bot.commands.get("pouler").alert(bot, message)
})

bot.on("ready", async ()=>{
    console.log(`${bot.user.tag} est bien en ligne !`)
    return bot.commands.get("pouler").startJob(bot, '00 00 09 * * *')
})

bot.on("ready", async ()=>{
    return bot.commands.get("pouler").startCountdown(bot)
})