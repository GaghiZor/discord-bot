const discord = require("discord.js");
const superagent = require("superagent");
const botconfig = require("../botconfig.json");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {
    const APIKEY = "cUGKR6zHc3zg2VoHxOzvmv5OZxBobhPw";

    let msg = await message.channel.send("Searching...");

    let {body} = await superagent
        .get('https://api.giphy.com/v1/gifs/random?api_key=cUGKR6zHc3zg2VoHxOzvmv5OZxBobhPw&tag=&rating=G')
    if(!{body}) return message.channel.send("Can't find any gifs right now.")

    let embed = new discord.RichEmbed()
        .setColor(colors.blue)
        .addField("Here's a gif for you.", '[^_^]')
        .setImage(body.url)
        .setTimestamp()
        .setFooter('v1.0.0', bot.user.displayAvatarURL)
        
    message.channel.send({embed: embed}).then(embedMessage => {
        embedMessage.react("👍");
        embedMessage.react("👎");
    });
    msg.delete();
}

module.exports.config = {
    name: "gif",
    aliases: []
}