module.exports = {

    config: {
        name: "uptime",
        aliases: [],
        usage: "",
        description: "Shows for how long the bot is running.",
        accessibleby: "Members",
        category: "miscellaneous"
    },

    run: async (bot, message, args) => {
        function duration(ms) {
            const sec = Math.floor((ms / 1000) % 60).toString();
            const min = Math.floor((ms / (1000 * 60)) % 60).toString();
            const hr = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
            const day = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();

            return `${day.padStart(1, '0')} days, ${hr.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `;
        }

        message.channel.send(`I have been online for: ${duration(bot.uptime)}`);
    }
}