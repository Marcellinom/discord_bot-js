const { Client, MessageAttachment } = require('discord.js');
require('dotenv').config()
var request = require('request');
var fs = require('fs');
module.exports = {
    remove_bg: async function(mes,client) {
        // console.log(mes)
        if (mes.embeds[0]) {
            console.log(mes.embeds[0].url)
            let url = mes.embeds[0].url
            if(url.includes('.jpg') || url.includes('.png') || url.includes('.jpeg')){
                var img = mes.embeds[0].url
            }
        } else if (mes.attachments.array()[0]){
            var img = mes.attachments.array()[0].attachment
        } else if(mes.mentions) {
            if(mes.mentions.users.array()[0].avatar){
                var img = `https://cdn.discordapp.com/avatars/${mes.mentions.users.array()[0].id}/${mes.mentions.users.array()[0].avatar}.png?size=1024`
            } else {
                var img = 'https://cdn.discordapp.com/embed/avatars/1.png'
            }
        } else {
            console.log("no image!")
            mes.channel.send('no image provided!')
            return ;
        }
        console.log(`image url: ${img}`) 
            request.post({
                url: 'https://api.remove.bg/v1.0/removebg',
                formData: {
                  image_url: img,
                  size: 'auto',
                },
                headers: {
                  'X-Api-Key': process.env.tokenRemovebg
                },
                encoding: null
              }, function(error, response, body) {
                if(error) return console.error('Request failed:', error);
                if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
                    fs.writeFileSync("no-bg.png", body);
                    const attachment = new MessageAttachment('./no-bg.png');
                    mes.channel.send('nyoh :u', attachment)
                    // .then(fs.unlink('./no-bg.png', function (e) {
                    //     if(e) throw(e)
                    // }))
              });
      
    }
}