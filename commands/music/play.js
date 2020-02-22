const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");

module.exports = {
    
    config: {
        name: "play",
        aliases: [],
        usage: "<YouTube LINK>",
        description: "Play a song.",
        accesibleby: "Members",
        category: "music"
    },

    run: async (bot, message, args) => {
    }
}
