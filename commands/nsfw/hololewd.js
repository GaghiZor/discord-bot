const fetch = require('node-fetch');
const { RichEmbed } = require("discord.js");
const { blue } = require("../../colors.json");
const { VERSION } = require("../../globals.js");

module.exports = {
    config: {
        name: "hololewd",
        aliases: [],
        usage: "",
        description: "Hololewd **[NSFW]**",
        accesibleby: "Members",
        category: "nsfw"
    },

    run: async (bot, message, args) => {
        try {
            if(message.channel.nsfw === true) {
                const member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
                const data = await (await fetch('https://nekos.life/api/v2/img/hololewd')).json();
                if (!(data || data.url)) return console.log("No [hololewd] available.");
    
                let embed = new RichEmbed()
                    .setColor(blue)
                    .setImage(data.url)
                    .setTimestamp()
                    .setFooter(VERSION, bot.user.displayAvatarURL)
                message.channel.send({embed: embed}).then(async embedMessage => {
                    await embedMessage.react("👍");
                    await embedMessage.react("👎");
                });
            } else {
                message.channel.send("This command requires you to be in a NSFW text-channel");
            }
        } catch (error) {
            //return console.log("No [kiss] gif available.(REQUEST_FAILED)");
            return console.error(error);
        }
    }
}