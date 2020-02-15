const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");
const index = require("../../index.js");

module.exports = {
    
    config: {
        name: "nowplaying",
        aliases: ["np"],
        usage: "",
        description: "Shows the current song that is benig played.",
        accesibleby: "Members",
        category: "music"
    },

    run: async (bot, message, args) => {
        
    }
}