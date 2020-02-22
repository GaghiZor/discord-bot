const fetch = require('node-fetch');
const { RichEmbed } = require("discord.js");
const { blue } = require("../../colors.json");
const { VERSION } = require("../../globals.js");

module.exports = {
    config: {
        name: "erok",
        aliases: [],
        usage: "",
        description: "Just why ??",
        accesibleby: "Members",
        category: "others"
    },

    run: async (bot, message, args) => {
        try {
            const data = await (await fetch('https://nekos.life/api/v2/img/erok')).json();
            if (!(data || data.url)) return console.log("No [erok] available.");

            let embed = new RichEmbed()
                .setColor(blue)
                .setImage(data.url)
                .setTimestamp()
                .setFooter(VERSION, bot.user.displayAvatarURL)
            message.channel.send({embed: embed}).then(async embedMessage => {
                await embedMessage.react("👍");
                await embedMessage.react("👎");
            });
      } catch (error) {
        //return console.log("No [kiss] gif available.(REQUEST_FAILED)");
        return console.error(error);
      }
    }
}