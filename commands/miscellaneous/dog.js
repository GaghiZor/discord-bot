const { RichEmbed } = require("discord.js");
const { blue } = require("../../colors.json");
const { VERSION } = require("../../globals.js");
const fetch = require("node-fetch");

module.exports = {
    
    config: {
        name: "dog",
        aliases: [],
        usage: "",
        description: "Shows you a random dog picutre.",
        accessibleby: "Members",
        category: "miscellaneous"
    },

    run: async (bot, message, args) => {
        let msg = await message.channel.send("Searching...");

        fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json()).then(body => {
            if(!{body}) return message.channel.send("Can't find any dogs right now.")

            let embed = new RichEmbed()
                .setColor(blue)
                .addField("Here's a dog for you.", '[^_^]')
                .setImage(body.message)
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
