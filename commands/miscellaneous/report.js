module.exports = {

    config: {
        name: "report",
        aliases: [],
        usage: "@name",
        description: "Reports a user from the server.",
        accessibleby: "Members",
        category: "miscellaneous"
    },

    run: async (bot, message, args) => {

        message.delete();

        // Mentioned or grabbed user
        let target = message.mentions.members.first() || message.guild.members.get(args[0]);
        if(!target) return message.channel.send("Please provide a valid user.").then(m => m.delete(15000));
        
        // Reason
        let reason = args.slice(1).join(" ");
        if(!reason) return message.channel.send(`Please provide a reason for reporting **${target.user.tag}**.`).then(m => m.delete(15000));

        // Grab reports channel
        let sChannel = message.guild.channels.find(x => x.name === "reports");

        message.author.send("Your report has been filed to the staff team. Thank you! \n **Note:** if you report users for no reason you will be punished. ");
        sChannel.send(`${message.author.tag} has reported **${target.user.tag}** for: **${reason}**`).then(async msg => {
            await msg.react("✅");
            await msg.react("❌");
        });
    }
}