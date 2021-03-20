const fetch = require('node-fetch');
const request = require('request');
const Keyv = require('keyv');
const keyv = new Keyv();
module.exports = {
    notify_func: async function(message,client){
        console.log('info going on')
        var infopen = await client.channels.fetch('754266895233974272') // tester 808409160471019531 || infopen 754266895233974272
        var filter = m => m.author.id === '804604322117189683'; // me 269397446516408331 || Laba2 804604322117189683
        active = false
        const collector = message.channel.createMessageCollector(filter, { time: 1000 * 45 });
            collector.on('collect', m => {
                console.log('collect on success')
            });
            collector.on('end', collected => {
                try{
                    // keyv.get('active')
                    // .then(f => {
                        console.log('collect on end')
                        console.log(active)
                        if(!active){
                            console.log(`Collected ${collected.size} items`);
                            client.channels.fetch('744789471609749570') // general 810347347237273631 || pusgib 744789471609749570
                            .then(c => c.send(`<@&744847472148349001>! ada ${collected.size+1} info baru di ${infopen.toString()} loh! ayo segera di cek!`))
                            .then(active = true)
                        }
                    // })
                } catch (e) {
                    console.log(e)
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
