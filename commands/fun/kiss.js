const fetch = require("node-fetch");
const { RichEmbed } = require("discord.js");
const { blue } = require("../../colors.json");
const { VERSION } = require("../../globals.js");

module.exports = {

    config: {
        name: "kiss",
        aliases: [],
        usage: "<@mention>",
        description: "Kiss someone.",
        accessibleby: "Members",
        category: "fun"
    },

    run: async (bot, message, args) => {
        try {
            const author = message.author.username;
            const data = await (await fetch('https://nekos.life/api/v2/img/kiss')).json();
            const member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

            if (!(data || data.url)) return console.log("No [kiss] gif available.");

            let user;
            if(!member){
                user = "THEMESELVES";
            } else {
                user = member.displayName;
            }

            let embed = new RichEmbed()
                .setColor(blue)
                .setTitle(`${author} gives a kiss to ${user}`, "")
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