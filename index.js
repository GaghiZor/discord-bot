const { Client, Collection } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Client();

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

// Info Variables
module.exports = {
    VERSION: "1.0.4 Alpha",
    AUTHOR: "GaghiZor"
}

// Start the bot
bot.login(token);