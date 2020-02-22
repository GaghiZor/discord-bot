const { RichEmbed } = require("discord.js");
const { blue } = require("../../colors.json");
const { db } = require("../../database.js");

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
        message.channel.send("Working").then((msg) => msg.delete(3000));

        let currentXp, currentLevel, currentCoins;

        await await db.collection("users").doc(message.author.id).get().then(function(doc) {
            if(doc.exists) {
                currentXp = doc.data().xp;
                currentLevel = doc.data().level;
                currentCoins = doc.data().coins;
            } else {
                console.log("No document found in database.");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        let nextLevelXp = currentLevel * 300;
        let difference = nextLevelXp - currentXp;

        let infoEmbed = new RichEmbed()
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
        
        message.channel.send(infoEmbed).then(msg => {msg.delete(10000)});
    }
}