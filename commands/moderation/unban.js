const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");

module.exports = {
    
    config: {
        name: "unban",
        aliases: [],
        usage: "@name",
        description: "Unbans a user from this server.",
        accessibleby: "Owner",
        category: "moderation"
    },
    
    run: async (bot, message, args) => {

        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")
    
            
        if(isNaN(args[0])) return message.channel.send("You need to provide an ID.")
        let bannedMember = await bot.fetchUser(args[0])
            if(!bannedMember) return message.channel.send("Please provide a user id to unban someone!")
    
        let reason = args.slice(1).join(" ")
            if(!reason) reason = "No reason given!"
    
        if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I do not have permission to perform this command!")|
        message.delete()
        try {
            message.guild.unban(bannedMember, reason)
            message.channel.send(`${bannedMember.tag} has been unbanned from the server!`)
        } catch(e) {
            console.log(e.message)
        }
    
        let embed = new RichEmbed()
            .setColor(red)
            .setAuthor(`${message.guild.name} Log`, message.guild.iconURL)
            .addField("Command", "unban")
            .addField("User:", `${bannedMember.username} (${bannedMember.id})`)
            .addField("Moderator:", message.author.username)
            .addField("Reason:", reason)
            .addField("Date:", message.createdAt.toLocaleString())
        
        let sChannel = message.guild.channels.find(c => c.name === "logs")
        sChannel.send(embed)
    
        }
}