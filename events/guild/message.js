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
            relic: 0,
            artifact: 0,
            created: message.createdAt.toLocaleString(),
        }, { merge: true });
    }
    else {
        if(document.get("username") == null){
            document.ref.update({ username: message.author.tag })
         }
        if(document.get("userId") == null){
            document.ref.update({ userId: message.author.id })
         }
        if(document.get("xp") == null){
            document.ref.update({ xp: 0 })
         }
        if(document.get("level") == null){
            document.ref.update({ level: 1 })
         }
        if(document.get("coins") == null){
            document.ref.update({ coins: 0 })
         }
        if(document.get("relic") == null){
            document.ref.update({ relic: 0 })
         }
        if(document.get("artifact") == null){
            document.ref.update({ artifact: 0 })
         }
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

    let xp, currentLevel, nextLevel, artifact = 0;

    let rand = Math.floor(Math.random() * 30) + 1;
    
    await db.collection("users").doc(message.author.id).get().then(function(doc) {
		if(doc.exists) {
            xp = doc.data().xp;
            currentLevel = doc.data().level;
            artifact = doc.data().artifact;
        } else {
			console.log("No document found in database.");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
    });
    
    xp += xpAdd + artifact;
    nextLevel = (currentLevel * 1000) * (currentLevel + 1) / 2;

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

    if(rand === 15)
    {
        artifact += 1;

        let item = new RichEmbed()
            .setTitle("Congratulations. You found an Artifact.")
            .setThumbnail(message.author.avatarURL)
            .setColor(blue)
            .addField('To see how many artifacts you have type', "$items")

        message.channel.send(item).then(msg => {msg.delete(10000)}).catch(e => console.log(e));

        db.collection("users").doc(message.author.id).update({
            artifact: artifact
        });
    }
}

// Coins System
async function coinsSystem(message) {
    let coinsAdd = Math.floor(Math.random() * 2) + 1;

    let coins, relic = 0;

    let rand = Math.floor(Math.random() * 30) + 1;

    await db.collection("users").doc(message.author.id).get().then(function(doc) {
		if(doc.exists) {
            coins = doc.data().coins;
            relic = doc.data().relic;
        } else {
			console.log("No document found in database.");
		}
	}).catch(function(error) {
		console.log("Error getting document:", error);
    });
    
    coins += coinsAdd + relic;

    db.collection("users").doc(message.author.id).update({
        coins: coins
    })

    if(rand === 15)
    {
        relic += 1;

        let item = new RichEmbed()
            .setTitle("Congratulations. You found a Relic.")
            .setThumbnail(message.author.avatarURL)
            .setColor(blue)
            .addField('To see how many relics you have type', "$items")

        message.channel.send(item).then(msg => {msg.delete(10000)}).catch(e => console.log(e));

        db.collection("users").doc(message.author.id).update({
            relic: relic
        });
    }
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
