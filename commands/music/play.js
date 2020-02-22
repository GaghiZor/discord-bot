const { RichEmbed } = require("discord.js");
const { red } = require("../../colors.json");
const ytdl = require("ytdl-core");

module.exports = {
    
    config: {
        name: "play",
        aliases: [],
        usage: "<YouTube LINK>",
        description: "Play a song.",
        accesibleby: "Members",
        category: "music"
    },

    run: async (bot, message, args) => {
        /*const voiceChannel = message.member.voiceChannel;
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel.");

        const permissions = voiceChannel.permissionsFor(message.client.user);

        if(!permissions.has('CONNECT')) return message.channel.send("I can not connect to voice channel.");
        if(!permissions.has('SPEAK')) return message.channel.send("I can not speak in this voice channel.");

        try {
            var connection = await voiceChannel.join();
        } catch (error) {
            console.error(`I could not join the voice channel ${error}`);
            return message.channel.send(`I could not join the voice channel ${error}`)
        }

        const dispatcher = connection.playStream(ytdl(args[0]).toString())
            .on('end', () => {
                console.log("The song has ended.");
                voiceChannel.leave();
            })
            .on('error', error => {
                console.error(error);
            });
        dispatcher.setVolumeLogarithmic(5 / 5);
            */
    }
}
