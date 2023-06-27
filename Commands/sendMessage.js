const Discord = require("discord.js")
var { tagueule } = require("../main")

module.exports = {
    name: "sendMessage",

    async apagnan(message)
    {
        let prob = getRandomInt(100)
        console.log(`${prob} ; ${tagueule}`)
        if (prob > 50 && !tagueule)
        {
            let responses = ["coubeh", "feur"]
            let random = getRandomInt(responses.length)
            await new Promise(resolve => setTimeout(resolve, 5000)); //5 seconds delay
            await message.reply(`${responses[random]} :joy_cat:`)
        }
    },

    async tg(message)
    {
        tagueule = !tagueule
        let responses = [
        "euuuuuh déja tu me parle pas comme ça mon gars ?", 
        "bon ok j'arrête",
        ]

        let random = getRandomInt(responses.length)
        await message.reply(`${responses[random]} ${tagueule}`)
    },
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}