const { RichEmbed } = require("discord.js");
const { blue } = require("../../colors.json");

module.exports = {

    config: {
        name: "whois",
        aliases: ["who"],
        usage: "<@mention>",
        description: "Get information about a discord user.",
        accessibleby: "Members",
        category: "miscellaneous"
    },

    run: async (bot, message, args) => {
        const member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        if(!member){
            return message.channel.send("Who are you interested in?");
        }

        var roles = member.roles.map(r => `${r}`).join(' | ');

        let whoIsEmbed = new RichEmbed()
            .setTitle(`${member.user.username}`)
            .setThumbnail(member.user.avatarURL)
            .setColor(blue)
            .addField("Name:", member.user.tag, true)
            .addField("User ID:", member.user.id, true)
            .addField("Created at:", member.user.createdAt.toLocaleString(), true)
            .addField("Roles:", roles, true)

        message.channel.send(whoIsEmbed);
    }
}