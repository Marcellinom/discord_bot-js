const { Client, MessageAttachment } = require('discord.js');
const SamJs = require ('sam-js');
const sam = new SamJs();
var fs = require('fs');
require('dotenv').config()
module.exports = {
    sam_speak: async function(mes,client) {
        // sam.download("hello");
        // console.log(buf8.buffer);
        const buf32 = sam.buf32('heys');
        fs.writeFileSync("trollge.wav", buf32);
        // const audio = new MessageAttachment(buf8,'trollge.wav');
        // mes.channel.send(audio)
    // .catch(console.error);
    }
}