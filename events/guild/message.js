//const { prefix } = require("../../botconfig.json");
const fs = require("fs");

var xp = require("../../xp.json");
var coins = require("../../coins.json");

module.exports = async (bot, message) => {
    if(message.author.bot || message.channel.type === "dm") return;

    // No Swear Measure
    noSwear(message);

    // Level System
    levelSystem(message);

    // Coins System
    coinsSystem(message);

    let args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if(!message.content.startsWith(process.env.PREFIX)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)
}

// Leveling System
function levelSystem(message) {
    let xpAdd = Math.floor(Math.random() * 10) + 1;

    if(!xp[message.author.id]) {
        xp[message.author.id] = {
            name: message.author.username,
            xp: 0,
            level: 1
        };
    }

    let currentXp = xp[message.author.id].xp;
    let currentLevel = xp[message.author.id].level;
    let nextLevel = xp[message.author.id].level * 300;
    
    xp[message.author.id].xp = currentXp + xpAdd;

    if(nextLevel <= xp[message.author.id].xp) {
        xp[message.author.id].level = currentLevel + 1;
        let lvlUp = new discord.RichEmbed()
            .setTitle("Level up")
            .setThumbnail(message.author.avatarURL)
            .setColor(colors.blue)
            .addField('Congratulations', message.author.tag)
            .addField("Your new level is", currentLevel+1)

        message.channel.send(lvlUp).then(msg => {msg.delete(10000)});
    }

    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
        if(err) console.log(err);
    });
}

// Coins System
function coinsSystem(message) {
    let coinsAdd = Math.floor(Math.random() * 2) + 1;

    if(!coins[message.author.id]) {
        coins[message.author.id] = {
            name: message.author.username,
            coins: 0
        };
    }
    
    coins[message.author.id].coins += coinsAdd;

    fs.writeFile("./coins.json", JSON.stringify(coins), 'utf8', (err) => {
        if(err) console.log(err);
    });
}

// Anti-Swearing
function noSwear(message) {
    const swears = ["nigger"];

    if(swears.includes(message.content.toLowerCase()) == true)
    {
        message.delete();
    }
}