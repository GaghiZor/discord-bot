const { PREFIX } = require("../../globals.js");
const { RichEmbed } = require("discord.js");
const { blue } = require("../../colors.json");
const { db } = require("../../database.js");

module.exports = async (bot, message) => {
    if(message.author.bot || message.channel.type === "dm") return;

    // No Swear Measure
    noSwear(message);
    
    let args = message.content.slice(1).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let document = await db.collection("users").doc(message.author.id).get();

    if (!(document && document.exists)) {
        await document.ref.set({
            username: message.author.tag,
            userId: message.author.id,
            xp: 0,
            level: 1,
            coins: 100,
            created: message.createdAt.toLocaleString(),
        }, { merge: true });
    }
    
    levelSystem(message);
    coinsSystem(message);
        
    if(!message.content.startsWith(PREFIX)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if(commandfile) commandfile.run(bot, message, args);
}

// Leveling System
async function levelSystem(message)  {
    let xpAdd = Math.floor(Math.random() * 10) + 1;

    let xp, currentLevel, nextLevel;
    
    await db.collection("users").doc(message.author.id).get().then(function(doc) {
		if(doc.exists) {
            xp = doc.data().xp;
            currentLevel = doc.data().level;
        } else {
			console.log("No document found in database.");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
    });
    
    xp += xpAdd;
    nextLevel = currentLevel * 300;

    if(nextLevel <= xp) {
        currentLevel += 1;
        let lvlUp = new RichEmbed()
            .setTitle("Level up")
            .setThumbnail(message.author.avatarURL)
            .setColor(blue)
            .addField('Congratulations', message.author.tag)
            .addField("Your new level is", currentLevel)

        message.channel.send(lvlUp).then(msg => {msg.delete(10000)}).catch(e => console.log(e));

        db.collection("users").doc(message.author.id).update({
            level: currentLevel
        });
    }

    db.collection("users").doc(message.author.id).update({
        xp: xp 
    });
}

// Coins System
async function coinsSystem(message) {
    let coinsAdd = Math.floor(Math.random() * 2) + 1;

    let coins;

    await db.collection("users").doc(message.author.id).get().then(function(doc) {
		if(doc.exists) {
            coins = doc.data().coins;
        } else {
			console.log("No document found in database.");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
    });
    
    coins += coinsAdd;

    db.collection("users").doc(message.author.id).update({
        coins: coins
    })
}

// Anti-Swearing
function noSwear(message) {
    const swears = ["nigger"];

    if(swears.includes(message.content.toLowerCase()) == true)
    {
        message.delete();
    }
}

function musicBot(message) {
    
}