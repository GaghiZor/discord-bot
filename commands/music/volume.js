const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");
const index = require("../../index.js");

module.exports = {
    
    config: {
        name: "volume",
        aliases: ["vol"],
        usage: "<A number betwen 0.0 and 1.0",
        description: "Set music volume",
        accesibleby: "Members",
        category: "music"
    },

    run: async (bot, message, args) => {
        
    }
}