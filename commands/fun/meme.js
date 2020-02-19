const { RichEmbed } = require("discord.js");
const { blue } = require("../../colors.json");
const { VERSION } = require("../../globals.js");
const fetch = require("node-fetch");

module.exports = {

    config: {
        name: "meme",
        aliases: [],
        usage: "",
        description: "Shows you a random meme.",
        accessibleby: "Members",
        category: "fun"
    },

    run: async (bot, message, args) => {
        let msg = await message.channel.send("Searching...");

        fetch('https://meme-api.herokuapp.com/gimme')
        .then(res => res.json()).then(body => {
            if(!{body}) return message.channel.send("Can't find any memes right now.")

            let embed = new RichEmbed()
                .setColor(blue)
                .addField("Here's a meme for you.", '[^_^]')
                .setImage(body.url)
                .setTimestamp()
                .setFooter(VERSION, bot.user.displayAvatarURL)

            message.channel.send({embed: embed}).then(async embedMessage => {
                await embedMessage.react("👍");
                await embedMessage.react("👎");
            });
            msg.delete();
        })
    }  
}