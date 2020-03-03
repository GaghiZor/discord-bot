const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");

module.exports = {

    config: {
        name: "freea",
        aliases: ["fa"],
        usage: "<link> <more info (Not required)>",
        description: "Create a fast embed to announce everyone of a new free app.",
        accessibleby: "Collector",
        category: "free"
    },

    run: async (bot, message, args) => {

        message.delete();

        if(!args[0]) return message.channel.send("You must attach a link.");

        if(!message.member.hasPermission(["EMBED_LINKS", "MENTION_EVERYONE"]) || !message.guild.owner) return message.channel.send("You do not have permission.");

        // Grab free games channel
        let sChannel = message.guild.channels.find(x => x.name === "free-apps");

        let moreInfo;

        if(!args[1])
            moreInfo = "No special actions.";
        else moreInfo = args.slice(1).join(" ");

        sChannel.send("@everyone");
        
        let embed = new RichEmbed()
            .setColor(red)
            .setTitle('Free App')
            .addField('**Link**', args[0])
            .addField('**More info**', moreInfo)
            .addField('**Posted by**', message.author.tag)
            .setThumbnail(message.author.avatarURL)
        sChannel.send(embed).then(async msg => {
            await msg.react("✅");
            await msg.react("❌");
        });;
    }
}
