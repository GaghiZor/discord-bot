const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");

module.exports = {
    
    config: {
        name: "givexp",
        aliases: ["gxp"],
        usage: "20",
        description: "It gives you 'x' amount of xp.",
        accessibleby: "Owner",
        category: "owner"
    },
    
    run: async (bot, message, args) => {
        message.delete();
        if(!message.member.hasPermission("ADMINISTRATOR") || !message.guild.owner) return;
        
        if(!args[0]) return message.reply("Ex: $givexp 20").then(x => x.delete(10000));

        if(isNaN(args[0])) return message.reply("Ex: $givexp 20").then(x => x.delete(10000));

        //let currentXp = xp[message.author.id].xp
        //xp[message.author.id].xp = currentXp + parseInt(args[0]);

        message.author.send("You gave yourself [" + args[0] + "] XP. \n Server: " + message.guild.name);

        // Send an embed to the logs channel
        let embed = new RichEmbed()
            .setColor(red)
            .setAuthor(`${message.guild.name} Log`, message.guild.iconURL)
            .addField("Command", "givexp")
            .addField("Amount", args[0])
            .addField("Moderator: ", message.author.username)
            .addField("Date: ", message.createdAt.toLocaleString())

        let sChannel = message.guild.channels.find(c => c.name === "logs");
        sChannel.send(embed);
    }
}