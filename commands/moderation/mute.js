const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");

module.exports = {
    
    config: {
        name: "mute",
        aliases: [],
        usage: "@name reason",
        description: "Mutes a user from this server.",
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

        // Define mute role and if the mute role doesn't exist then create one.
        let muterole = message.guild.roles.find(r => r.name === "Muted");
        if(!muterole) {
            try {
                muterole = await message.guild.createRole({
                    name: "Muted",
                    color: "#000000",
                    permissions: []
                });
                message.guild.channels.forEach(async (channel, id) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        SEND_TTS_MESSAGES: false,
                        ADD_REACTIONS: false,
                        ATTACH_FILES: false,
                        SPEAK: false
                    });
                });
            } catch(e) {
                console.log(e.stack);
            }
        }

        // Add role to the mentioned user

        await(mutee.addRole(muterole.id)).then(() => {
            message.delete()
            mutee.send(`You've been muted in ${message.guild.name} for ${reason}`);
            mutee.setVoiceChannel(null);
            message.channel.send(`${mutee.user.username} was successfully muted`);
        })

        // Send an embed to the logs channel
        let embed = new RichEmbed()
            .setColor(red)
            .setAuthor(`${message.guild.name} Log`, message.guild.iconURL)
            .addField("Command", "mute")
            .addField("User: ", `${mutee.user.username}`)
            .addField("Moderator: ", message.author.username)
            .addField("Reason: ", reason)
            .addField("Date: ", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "logs");
        sChannel.send(embed);
    }
}