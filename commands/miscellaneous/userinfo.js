let xp = require("../../xp.json");
let coins = require("../../coins.json");

const { RichEmbed } = require("discord.js");
const { blue } = require("../../colors.json")

module.exports = {

    config: {
        name: "userinfo",
        aliases: ["ui", "useri"],
        usage: "",
        description: "User informations",
        accessibleby: "Members",
        category: "miscellaneous"
    },

    run: async (bot, message, args) => {
        if(!xp[message.author.id]) {
            xp[message.author.id] = {
                name: message.author.username,
                xp: 0,
                level: 1
            };
        }

        if(!coins[message.author.id]) {
            coins[message.author.id] = {
                name: message.author.username,
                coins: 0
            };
        }

        let currentXp = xp[message.author.id].xp;
        let currentLevel = xp[message.author.id].level;
        let nextLevelXp = currentLevel * 300;
        let difference = nextLevelXp - currentXp;
        
        let currentCoins = coins[message.author.id].coins;

        let lvlEmbed = new RichEmbed()
            .setTitle('User Informations')
            .setAuthor(message.author.tag)
            .setColor(blue)
            .setThumbnail(message.author.avatarURL)
            .addField("Coins", currentCoins, true)
            .addField("Level", currentLevel, true)
            .addField("XP", currentXp, true)
            .addBlankField()
            .addField('Visit our $websites', "[ ^_^ ]")
            .setFooter(`${difference} XP until you level up`, message.author.displayAvatarURL)
        
        message.channel.send(lvlEmbed).then(msg => {msg.delete(10000)});
    }
}