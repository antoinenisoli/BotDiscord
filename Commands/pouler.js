const Discord = require("discord.js")
const cron = require('cron');
const channelID = 1120974571047235585

module.exports = {
    name: "pouler",

    async alert(bot, message)
    {
        var text = alert()
        await message.reply(text)
    },

    async startJob(bot, time)
    {
        const channel = await bot.channels.fetch('1120974571047235585');
        console.log(`start scheduled Message job every day at ${time}`)
        let scheduledMessage = new cron.CronJob(time, () => 
        {
            // This runs every day at 09:00:00, you can do anything you want
            var alertText = alert()
            channel.send(alertText)
        });
        
        scheduledMessage.start()
    },

    async startCountdown(bot)
    {
        const dayOfWeek = new Date().getDay()
        const currentHour = new Date().getHours()
        if (dayOfWeek === 2 && currentHour < 12)
        {
            console.log("start countdown every 2 hours")
            const channel = await bot.channels.fetch('1120974571047235585');
            setInterval (function () 
            {
                channel.send(`${remainingHours(12)} hours left before the pouler !!!`) 
            }, 
            120 * 60000); //every 2 hours : 7200000 ms
        }
    },
}

function remainingHours(time)
{
    const currentHour = new Date().getHours()
    var diff = time - currentHour
    return diff
}

function getDaysDifference(otherDay, dayOfWeek)
{
    return ((otherDay + 7) - dayOfWeek) % 7
}

function alert()
{
    const thursday = 2
    const dayOfWeek = new Date().getDay()
    var text = ""

    if (dayOfWeek === thursday)
        text = `:rotating_light: **[ALERTE POULER] Jour du pouler !!! Tous aux abris !!!** :rotating_light:`
    else
    {
        var diff = getDaysDifference(thursday, dayOfWeek)
        text = `:rotating_light: pas de pouler pour aujourd'hui mon gars... il faut attendre encore ${diff} jours ! :rotating_light:`
    }

    return text
}