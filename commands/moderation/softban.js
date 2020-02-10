const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");

module.exports = {
    
    config: {
        name: "softban",
        aliases: [],
        usage: "@name",
        description: "Softbans a user from this server.",
        accessibleby: "Owner",
        category: "moderation"
    },
    
    run: async (bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR") || !message.guild.owner) return message.channel.send("You do not have permission.");

        let banMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!banMember) return message.channel.send("Provide a user to softban.");

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given.";

        if(!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send("I do not have permission.");

        message.delete();

        banMember.send(`You've been softbanned from ${message.guild.name} for ${reason}`);
        message.guild.ban(banMember, { days: 1, reason: reason}).then(() => message.guild.unban(banMember.id, { reason: "Softban" })).catch(err => console.log(err));

        // Send an embed to the logs channel
        let embed = new RichEmbed()
            .setColor(red)
            .setAuthor(`${message.guild.name} Log`, message.guild.iconURL)
            .addField("Command", "softban")
            .addField("User: ", `${banMember.user.username}`)
            .addField("Moderator: ", message.author.username)
            .addField("Reason: ", reason)
            .addField("Date: ", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "logs");
        sChannel.send(embed);
    }
}