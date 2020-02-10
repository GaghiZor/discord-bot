const discord = require("discord.js");
const superagent = require("superagent");
const botconfig = require("../../botconfig.json");
const colors = require("../../colors.json");

module.exports = {
    
    config: {
        name: "unmute",
        aliases: [],
        usage: "@name reason",
        description: "Unmutes a user from this server.",
        accessibleby: "Admins",
        category: "moderation"
    },
    
    run: async (bot, message, args) => {
        // Check for permission
        if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You do not have permission.");

        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I do not have permission.");

        let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!mutee) return message.channel.send("Enter a user to be muted!");

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "No reason given.";

        let muterole = message.guild.roles.find(r => r.name === "Muted");
        if(!muterole) return message.channel.send("There is no mute role to remove!");

        // Remove role to the mentioned user
        mutee.removeRole(muterole.id).then(() => {
            message.delete();
            mutee.send("You have been unmuted in " + message.guild.name + " for: " + `${reason}`).catch(err => console.log(err));
            message.channel.send(`${mutee.user.username} was successfully unmuted`);
        });

        // Send an embed to the logs channel
        let embed = new RichEmbed()
            .setColor(red)
            .setAuthor(`${message.guild.name} Log`, message.guild.iconURL)
            .addField("Command", "unmute")
            .addField("User: ", `${mutee.user.username}`)
            .addField("Moderator: ", message.author.username)
            .addField("Reason: ", reason)
            .addField("Date: ", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "logs");
        sChannel.send(embed);
    }
}