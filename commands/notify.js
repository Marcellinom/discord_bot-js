const fetch = require('node-fetch');
const request = require('request');
const Keyv = require('keyv');
const keyv = new Keyv();
module.exports = {
    notify_func: async function(message,client){
        if (message.author.bot) return;
        var pusgib = await client.channels.fetch('744789471609749570')
        var filter = m => m.author.id === '804604322117189683';
        const collector = message.channel.createMessageCollector(filter, { time: 1000 * 30 });
            collector.on('collect', m => {
                keyv.set('active', true)
                .then(console.log)
            });
            collector.on('end', collected => {
                try{
                    keyv.get('active')
                    .then(f => {
                        console.log(f)
                        if(f){
                            console.log(`Collected ${collected.size} items`);
                            client.channels.fetch('810347347237273631')
                            .then(c => c.send(`@everyone! ada ${collected.size+1} info baru di ${pusgib.toString()} lho! ayo cek!`))
                            .then(keyv.set('active', false))
                        }
                    })
                } catch (e) {
                    console.log(e.message)
                }
            })
            message.guild.members.fetch('269397446516408331') // me
            .then(m => {
              if(message.attachments.array()[0]){
                m.send(message.attachments.array()[0]['attachment'])
              } else {
                m.send(message.content)
              }
            })
            .catch(console.log)
    }
};