const fetch = require('node-fetch');
const { RichEmbed } = require("discord.js");
const { blue } = require("../../colors.json");
const { VERSION } = require("../../globals.js");

module.exports = {
    config: {
        name: "kidol",
        aliases: [],
        usage: "",
        description: "Display an idol from a random K-Pop group.",
        accesibleby: "Members",
        category: "fun"
    },

    run: async (bot, message, args) => {
        try {
            let data = await (await fetch('http://www.kapi.xyz/api/v1/idols/random/')).json();
            if (!data) return console.log("No [kidol] available.");
            data = data[Object.keys(data)[0]];
            const imageUrl = new URL(data[Object.keys(data)[Math.floor(Math.random() * Object.keys(data).length)]]);
            const groupAndIdol = imageUrl.pathname.split('/').slice(4, 6);

            let embed = new RichEmbed()
                .setColor(blue)
                .setTitle(`**${groupAndIdol[0]}** from **${groupAndIdol[1]}**`)
                .setImage(imageUrl)
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