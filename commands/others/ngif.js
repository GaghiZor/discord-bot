const fetch = require('node-fetch');
const { RichEmbed } = require("discord.js");
const { blue } = require("../../colors.json");
const { VERSION } = require("../../globals.js");

module.exports = {
    config: {
        name: "ngif",
        aliases: [],
        usage: "",
        description: "Just why ??",
        accesibleby: "Members",
        category: "others"
    },

    run: async (bot, message, args) => {
        try {
            const author = message.author.username;
            const member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            const data = await (await fetch('https://nekos.life/api/v2/img/ngif')).json();
            if (!(data || data.url)) return console.log("No [ngif] available.");

            let user;
            if(!member){
                user = "THEMESELVES";
            } else {
                user = member.displayName;
            }

        let embed = new RichEmbed()
            .setColor(blue)
            .setTitle(`${author} cuddles ${user}`, "")
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