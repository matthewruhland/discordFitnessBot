let request = require(`request`);
let fs = require('fs');
let Discord = require("discord.js");
let bot = new Discord.Client();
let txt2 = require("./txtToImg.js");
const config = require('./configJSON/config.json');
// let parse = require("./parseTxtData.js");


// Functions
function downloadAndProcess(url, msg) {
    request.get(url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(txt2.filePaths.imgSavePath));
    console.log('downloaded')
    msg.reply(`Thank you for the .jpg image.\nIf this was a Food Log I will get your feedback shortly.\n\nThinking...\n.\n.\n.`);
    txt2.processImageToText(msg)
}


// Bot Stuff
bot.on('ready', () => {
    console.log('bot is ready')
})

bot.on('message', async (msg) => {
    if (msg.author.bot) return; // Never do anything with bot messages

    // Download attachments for use later
    if (msg.attachments.first()) { // checks if an attachment is sent
        console.log('attachment found')
        let url = msg.attachments.first().url
        console.log(url)
        if (url.toUpperCase().includes('.JPG', (url.length - 4)) || url.toUpperCase().includes('.PNG', (url.length - 4))) // check ending chars, Download only jpg
        {
            downloadAndProcess(url, msg);
        }
        else {
            console.log('not jpg format, please fix')
            msg.reply(`This message was not in .jpg format, please fix.\nApologies.`);
        }
    }
    else
        console.log('no attachments')
})

// Start
bot.login(config.token)