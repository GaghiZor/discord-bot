const joke = require("../../jokes.json");

module.exports = {
    
    config: {
        name: "joke",
        aliases: ["jk"],
        usage: "",
        description: "Get a random joke",
        accesibleby: "Members",
        category: "miscellaneous"
    },

    run: async (bot, message, args) => {
        const randomJoke = joke[Math.floor(Math.random() * joke.length)];

        message.channel.send(randomJoke);
    }
}