const { RichEmbed } = require("discord.js");

module.exports = {

    config: {
        name: "websites",
        aliases: ["sites", "ws"],
        noalias: "No aliases",
        usage: "",
        description: "A list of where you can find us.",
        accessibleby: "Members",
        category: "miscellaneous"
    },

    run: async (bot, message, args) => {
        let embed = new RichEmbed()
            .setTitle('Where you can find us')
            .addField('Twitch', 'https://www.twitch.tv/teamdadice')
            .addField('Youtube', 'https://www.youtube.com/teamdadice')
            .setThumbnail(message.guild.iconURL)
            .setColor(0xFF0000)
            message.channel.send(embed);
    }
}