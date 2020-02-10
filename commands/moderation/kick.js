const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");

module.exports = {
    
    config: {
        name: "kick",
        aliases: [],
        usage: "@name",
        description: "Kicks a user from this server.",
        accessibleby: "Admins",
        category: "moderation"
    },
    
    run: async (bot, message, args) => {
        if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"]) || !message.guild.owner) return message.channel.send("You do not have permission.");

        let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!kickMember) return message.channel.send("Provide a user to ban.");

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given.";

        if(!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I do not have permission.");

        kickMember.send(`You've been kicked from ${message.guild.name} for ${reason}`);
        kickMember.kick().catch(err => console.log(err));

        message.channel.send(`**${kickMember.user.tag}** has been successfully kicked`);

        // Send an embed to the logs channel
        let embed = new RichEmbed()
            .setColor(red)
            .setAuthor(`${message.guild.name} Log`, message.guild.iconURL)
            .addField("Command", "kick")
            .addField("User: ", `${kickMember.user.username}`)
            .addField("Moderator: ", message.author.username)
            .addField("Reason: ", reason)
            .addField("Date: ", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "logs");
        sChannel.send(embed);
    }
}