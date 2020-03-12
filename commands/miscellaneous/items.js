const { RichEmbed } = require("discord.js");
const { blue } = require("../../colors.json");
const { db } = require("../../database.js");

module.exports = {

    config: {
        name: "items",
        aliases: ["inv", "inventory"],
        usage: "",
        description: "Inventory",
        accessibleby: "Members",
        category: "miscellaneous"
    },

    run: async (bot, message, args) => {
        message.channel.send("Working").then((msg) => msg.delete(3000));

        let relic, artifact;

        await await db.collection("users").doc(message.author.id).get().then(function(doc) {
            if(doc.exists) {
                relic = doc.data().relic;
                artifact = doc.data().artifact;
            } else {
                console.log("No document found in database.");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        let infoEmbed = new RichEmbed()
            .setTitle('Inventory')
            .setAuthor(message.author.tag)
            .setColor(blue)
            .setThumbnail(message.author.avatarURL)
            .addField("Relics", relic, true)
            .addField("Artifacts", artifact, true)
        
        message.channel.send(infoEmbed).then(msg => {msg.delete(10000)});
    }
}