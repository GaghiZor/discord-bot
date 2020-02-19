const fetch = require("node-fetch");

module.exports = {

    config: {
        name: "chucknorris",
        aliases: ["cnjk", "cj"],
        usage: "",
        description: "Random Chuck Norris joke.",
        accessibleby: "Members",
        category: "fun"
    },

    run: async (bot, message, args) => {
        try {
            const data = await (await fetch(`https://api.chucknorris.io/jokes/random`)).json();
        
            if (!(data || data.value)) return console.log("No [chucknoris] joke available.");

            message.channel.send(data.value);
          } catch (error) {
            //return console.log("No [kiss] gif available.(REQUEST_FAILED)");
            return console.error(error);
          }
    }
}