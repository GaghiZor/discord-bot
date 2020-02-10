const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");
const index = require("../../index.js");

module.exports = {
    
    config: {
        name: "info",
        aliases: ["serverinfo", "si"],
        usage: "",
        description: "Shows a few informations about server",
        accesibleby: "Members",
        category: "miscellaneous"
    },

    run: async (bot, message, args) => {
        let embed = new RichEmbed()
            .setColor(red)
            .setTitle('Informations')
            .addField('**Server Name**', message.guild.name)
            .addField('**Server Member Count**', message.guild.memberCount)
            .addField('**Bot Version**', index.VERSION)
            .setThumbnail(message.author.avatarURL)
            .setFooter('**Visit our !websites**', message.guild.iconURL)
        message.channel.send(embed);
    }
}