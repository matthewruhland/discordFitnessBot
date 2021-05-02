const Discord = require("discord.js");
// JSON Config data
const config = require('./configJSON/config.json');
const messages = require('./configJSON/messages.json');

// Constants
const client = new Discord.Client();

// Start
client.on('ready', () => {
    // List servers the bot is connected to
    client.guilds.cache.forEach((guild) => {
        guild.channels.cache.forEach((channel) => {
            if (channel.id === config.channelId) {
                const random = Math.floor(Math.random() * messages.dailyMessages.length);
                channel.send(messages.dailyMessages[random]).then(m => {
                    client.destroy();
                });
            }
        })
    })

})

client.login(config.token)
