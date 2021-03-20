const discord = require('discord.js');
require('dotenv').config();
var request = require('request');
module.exports = {
    imgSearch: async function(message, args) {
        let ms = message.channel.send('getting images, please wait ^_^');
        var search = (args.join(" "));
        const options = {
          method: 'GET',
          url: 'https://bing-image-search1.p.rapidapi.com/images/search',
          qs: {q: search, count: '30'},
          headers: {
            'x-rapidapi-key': process.env.rapidapiKey,
            'x-rapidapi-host': process.env.rapidapiHost,
            useQueryString: true
          }
        };
    
        request(options, async function (error, response, body) {
          if (error) throw new Error(error);
          const res = JSON.parse(body) 
          var query = res.value;
          console.log(res.value.length);
          var ind = 0;
          var embed = new discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`showing page 1/${res.value.length} images`)
          .setImage(query[ind]['thumbnailUrl'])
          .setFooter('type "n" for next query, "p" for previous query \ntype the number you desired to jump pages');
          (await ms).delete();
          var embedMessage = await message.channel.send(embed);
     
          let filter = m => m.channel.id === message.channel.id 
          // awaiting input reply
          var flag = true;
            while(flag){
                  await message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 100*1000,
                    errors: ['time']
                  })
                    .then(message => {
                      message = message.first() 
                      if (message.content === 'n') {
                        if(ind+1<=res.value.length){
                          ind++;
                          console.log(ind);
                          var newEmbed = new discord.MessageEmbed()
                          .setColor('#0099ff')
                          .setTitle(`showing page ${ind+1}/${res.value.length} images`)
                          .setImage(query[ind]['thumbnailUrl'])
                          .setFooter('type "n" for next query, "p" for previous query \ntype the number you desired to jump pages');
                        }
                      } else if(message.content === 'p'){
                        if(ind-1>=0){
                          ind--;
                          console.log(ind);
                          var newEmbed = new discord.MessageEmbed()
                          .setColor('#0099ff')
                          .setTitle(`showing page ${ind+1}/${res.value.length} images`)
                          .setImage(query[ind]['thumbnailUrl'])
                          .setFooter('type "n" for next query, "p" for previous query \ntype the number you desired to jump pages');
                        }
                      } else if(!isNaN(message.content-'0')) {
                        var jump = parseInt(message.content)
                        if(jump>res.value.length) {
                          ind = res.value.length-1;
                        var newEmbed = new discord.MessageEmbed()
                          .setColor('#0099ff')
                          .setTitle(`showing page ${ind}/${res.value.length} images`)
                          .setImage(query[res.value.length-1]['thumbnailUrl'])
                          .setFooter('type "n" for next query, "p" for previous query \ntype the number you desired to jump pages');
                        } else if (jump<1) {
                          ind = 0;
                        var newEmbed = new discord.MessageEmbed()
                          .setColor('#0099ff')
                          .setTitle(`showing page 1/${res.value.length} images`)
                          .setImage(query[0]['thumbnailUrl'])
                          .setFooter('type "n" for next query, "p" for previous query \ntype the number you desired to jump pages');
                        } else {
                          ind = jump-1;
                        var newEmbed = new discord.MessageEmbed()
                          .setColor('#0099ff')
                          .setTitle(`showing page ${jump}/${res.value.length} images`)
                          .setImage(query[jump-1]['thumbnailUrl'])
                          .setFooter('type "n" for next query, "p" for previous query \ntype the number you desired to jump pages');
                        }
                      } else if(message.content.includes('!im')) {
                        console.log('stopped')  
                        flag = false
                      }
                      embedMessage.edit(newEmbed)
                      .then(console.log(`Msg Updated to page ${ind+1}`))
                      .then(message.delete())
                      .catch(console.error);
                    }).catch(collection => {
                  flag = false
                  console.log('timeout')  
                  })
              }
        });    
    }
    
}
