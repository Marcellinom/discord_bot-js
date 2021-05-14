const { MessageAttachment } = require('discord.js');
const { Canvas, Image } = require('canvas');
const sizeOf = require('image-size')
const resizeImg = require('resize-img');
const mergeImages = require('merge-images');
const download = require('image-downloader')
const fs = require('fs');
const request = require('request');
require('dotenv').config()
module.exports = {
    lleak: async function(mes,client) {
        if (mes.embeds[0] || mes.content.includes('.png') || mes.content.includes('.jpg') || mes.content.includes('.jpeg') || mes.content.includes('mm.bing.net')) {
            if(!mes.embeds[0]) {
                let temp = mes.content.split(' ')
                var img = temp[temp.length-1]
            } else {
                console.log(mes.embeds[0].url)
                let url = mes.embeds[0].url
                if(url.includes('.jpg') || url.includes('.png') || url.includes('.jpeg') || url.includes('mm.bing.net')){
                    var img = mes.embeds[0].url
                }
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

        const options = {
            url: img,
            dest: 'plain.png'                
          }
        download.image(options)
          .then(({ filename }) => {
            console.log('Saved as', filename)  

            const dimensions = sizeOf('./plain.png')
            console.log(dimensions.width, dimensions.height)

            var substractor=0;
            var add=0;
            if(dimensions.width > dimensions.height || dimensions.width == dimensions.height)
                substractor=dimensions.height
            else {
                substractor=dimensions.width;
                add=Math.abs(dimensions.width-dimensions.height);
            }
            var w = 1083-Math.floor(Math.abs((1083)-substractor));
            var h = Math.round(w/5)+add
            console.log("new",w,h)
            
            resizeImg(fs.readFileSync('./liveleak_logo.png'), {
                width: w,
                height: h
            })
            .then(img=>{
                fs.writeFileSync("new_liveleak_logo.png", img);
            }) 
        
        mergeImages(['./plain.png', './new_liveleak_logo.png'], {
                Canvas: Canvas,
                Image: Image
            })
            .then(b64 => {
                
                const imageStream = new Buffer.from(b64.split(',')[1], 'base64');
                const attachment = new MessageAttachment(imageStream);
                
                mes.channel.send(attachment);
            });
            // data:image/png;base64,iVBORw0KGgoAA...
        }).catch((err) => console.error(err))
    }
}
