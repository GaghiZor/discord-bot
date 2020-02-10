const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json")

module.exports = {
    
    config: {
        name: "clear",
        aliases: ["delete"],
        usage: "5",
        description: "Clears 'x' amount of messages.",
        accessibleby: "Admins",
        category: "moderation"
    },

    run: async (bot, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner)
                return message.channel.send("You do not have permission.").then(messagee => messagee.delete(5000));

        if (!args[0]) return message.reply("Error. ( Ex: $clear 2 )");

        if(isNaN(args[0])) return message.reply("Insert a number between 1 and 100"); 

        // Send an embed to the logs channel
        let embed = new RichEmbed()
            .setColor(red)
            .setAuthor(`${message.guild.name} Log`, message.guild.iconURL)
            .addField("Command", "Clear")
            .addField("Moderator: ", message.author.username)
            .addField("Number of messages: ", args[0])
            .addField("Date: ", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "logs");
        sChannel.send(embed);
        
        message.channel.bulkDelete(args[0]).then(messagee => messagee.delete(5000));
    }
}