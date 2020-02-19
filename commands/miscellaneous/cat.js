const { RichEmbed } = require("discord.js");
const { blue } = require("../../colors.json");
const { VERSION } = require("../../globals.js");
const fetch = require("node-fetch");

module.exports = {

    config: {
        name: "cat",
        aliases: [],
        usage: "",
        description: "Shows you a random cat picture.",
        accessibleby: "Members",
        category: "miscellaneous"
    },

    run: async (bot, message, args) => {
        let msg = await message.channel.send("Searching...");
        let check = false;

        fetch('http://aws.random.cat/meow')
        .then(res => res.json()).then(body => {
            if(!body) return message.channel.send("Can't find any cats right now.")

            let embed = new RichEmbed()
                .setColor(blue)
                .addField("Here's a cat for you.", '[^_^]')
                .setImage(body.body)
                .setTimestamp()
                .setFooter(VERSION, bot.user.displayAvatarURL)
            message.channel.send({embed: embed}).then(async embedMessage => {
                await embedMessage.react("👍");
                await embedMessage.react("👎");
            });
            msg.delete();
            check = true;
        })

        if(check === false)
        {
            msg.delete();
            message.channel.send("Can't find any cats right now :( ");
        }
    }
}