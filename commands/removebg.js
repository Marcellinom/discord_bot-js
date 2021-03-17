const { Client, MessageAttachment } = require('discord.js');
require('dotenv').config()
var request = require('request');
var fs = require('fs');
module.exports = {
    remove_bg: async function(mes) {
        if(mes.attachments.array()[0]){
            console.log(mes.attachments.array()[0].attachment)
            var img = mes.attachments.array()[0].attachment.split('/')
            console.log(img[img.length-1])
            request.post({
                url: 'https://api.remove.bg/v1.0/removebg',
                formData: {
                  image_url: `${mes.attachments.array()[0].attachment}`,
                  size: 'auto',
                },
                headers: {
                  'X-Api-Key': process.env.tokenRemovebg
                },
                encoding: null
              }, function(error, response, body) {
                if(error) return console.error('Request failed:', error);
                if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
                fs.writeFileSync(img[img.length-1], body);
                const attachment = new MessageAttachment(`./${img[img.length-1]}`);
                mes.channel.send('nyoh :u', attachment)
              });
        } else {
            mes.channel.send('no image provided!')
        }
    }
}