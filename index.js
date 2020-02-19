const { Client, Collection } = require("discord.js");
const { token } = require("./botconfig.json");
const bot = new Client();

["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

// Start the bot
//bot.login(process.env.TOKEN); // Heroku
bot.login(token);               // Local