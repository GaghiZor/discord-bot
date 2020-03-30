module.exports = async bot => {
    console.log(`${bot.user.username} is online`)

   let statuses = [
       `${bot.guilds.size} servers!`,
       "$help",
       `over ${bot.users.size} users!`
   ]

   setInterval(function() {
       let status = statuses[Math.floor(Math.random() * statuses.length)];
       bot.user.setActivity(status, {type: "WATCHING"});

   }, 5000);


   // Send random relics / artifacts
   var textChannel = bot.channels.find(channel => channel.id === "424326387151929344");
   var textChannel2 = bot.channels.find(channel => channel.id === "672513099630247948");

   setInterval(() => {
       textChannel2.send("Test.");
   }, 5000);

}