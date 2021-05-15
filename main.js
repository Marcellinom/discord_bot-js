const discord = require('discord.js')
const { MessageAttachment } = require('discord.js');
const Keyv = require('keyv');
const fetch = require('node-fetch');
const request = require('request');
const keyv = new Keyv(); // in-memory storage
const client = new discord.Client()
const prefix = "!"
keyv.on('error', err => console.error('Keyv connection error:', err));
require('dotenv').config()
//const { prefix, token } = require('./config.json');
client.once('ready', () => {
  console.log('logged in!')
})
var active = true;
    const notify = require('./commands/notify.js')
    const rem = require('./commands/removebg.js')
    const liveleak = require('./commands/liveleak.js')
  
    client.on('message', async (message) => {
      if(message.author.id === '804604322117189683'){ // me 269397446516408331 || laba2 804604322117189683
        if(active){
          notify.notify_func(message,client)
        }
      }
    })

    client.on('message', async (message) => {
      if (message.channel.id != '838057852030550037') return;
      if(message.content.startsWith(prefix) && message.author.id === '269397446516408331'){
        if(message.content.includes('start') && message.content.includes('count')){
          message.channel.send('1');
        }
      } else if(message.author.id === '270148059269300224') { // me 269397446516408331 || laba2 804604322117189683
        var num = Number(message.content);
        if (!isNaN(num)) {
          if (num + 1 <= 100) {
            message.channel.send((num + 1).toLocaleString());
          }
        }
      }
    })

    client.on('message', async (message)=> {
      if(message.content.startsWith(prefix) && !message.author.bot){
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        if(args[0].includes('leak')){
          liveleak.lleak(message,client)
        }
      }
    })

    client.on('message', async (message)=> {
      if(message.content.startsWith(prefix) && !message.author.bot){
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        if(args[0].includes('bg')){
          rem.remove_bg(message,client)
        }
      }
    })


    client.on('message', async(mes)=>{
      if(mes.content.startsWith(prefix) && mes.content.includes('bgstat')){
        request.get({
          url: 'https://api.remove.bg/v1.0/account',
          headers: {
            'X-Api-Key': process.env.tokenRemovebg
          },
        }, function(error, response, body) {
          if(error) return console.error(error)
          if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
          const info = JSON.parse(body).data.attributes.api.free_calls;
          console.log(info);
          if (info <= 10) {
            mes.channel.send(`kamu hanya bisa remove bg ${info} kali lagi!`);
          } else {
            mes.channel.send(`kamu masih bisa remove bg ${info} kali lagi!`);
          }
        })
      }
    })
  
const imgsr = require('./commands/imgsrc.js')
const trollge = require('./commands/sam.js')

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  console.log(args)
  let tagArg = ''; 
  if(args[4]){
    for(var i = 4; i<= args.length-1; i++){
      tagArg = tagArg + args[i] + ' '
    }
  }
  let comTemp = args
  const command = comTemp.shift().toLowerCase();
  if (command == 'ping') 
  {
    console.log(args[0]-'0');
    message.channel.send('pong');
  } 
  else if (command == 'activate') 
  {
    message.channel.send('info penting notification activated!');
    active = true
  } 
  else if (command == 'deactivate')
  {
    message.channel.send('info penting notification deactivated!');
    active = false
  } 
  else if(command == 'getstat')
  {
    message.channel.send(active)
  } 
  else if (command == 'beep') 
  {
    message.channel.send(`boob`);
  } 
  else if(command == 'trollge')
  {
      trollge.sam_speak(message,client);
  } 
    else if(command.includes('im')) 
  { // change
    if(typeof(args[0]) != 'undefined') imgsr.imgSearch(message, args);
  } 
  else if (command == 'nh') 
  {
    if (!message.channel.nsfw) 
    {
      message.channel.send('this isn\'t an NSFW channel dummy :3');
      return;
    }
if(args[0].includes('r')) {
//-------------------------------------------------------------------------------------------read
        console.log(`tags: ${tagArg}`)
        try {
          let mes_read = await message.channel.send('Loading... Please Wait.');
          var temp_read;
          if (args[1] == 'random') {
            temp_read = Math.floor(Math.random() * (340000 - 100000 + 1) + 100000);
          } else if (Number.isInteger(args[1] - '0')) {
            temp_read = args[1];
          } else if (args[1].includes('https://nhentai.net/g/')){
            temp_read = args[1].replace('https://nhentai.net/g/','')
          } else {
            message.channel.send('invalid input!');
            return;
          }
          var data_read;
          if(args[2] == 'english'){
            start_position: while(1){
              temp_read = Math.floor(Math.random() * (340000 - 100000 + 1) + 100000);
              const req_read = await fetch(
                'https://nhentai-pages-api.herokuapp.com/' + temp_read
                ); // nh get pict API
                data_read = await req_read.json();
                if(data_read['status']) continue start_position;
                console.log(data_read['details']['languages'])
                if(typeof data_read['details']['languages'] === 'undefined') continue start_position;
                if(!data_read['details']['languages'].toString().toLowerCase().includes('english')) continue start_position;
                break;
              }
              
          } else if(args[2] == 'tag') {
            if(args[3]){
            let i = 0;
            start_position: while(1){
              temp_read = Math.floor(Math.random() * (340000 - 100000 + 1) + 100000);
              const req_read = await fetch(
                'https://nhentai-pages-api.herokuapp.com/' + temp_read
                ); // nh get pict API
                data_read = await req_read.json();
                i++; if(i>100){  message.channel.send('not found!');return;  }
                console.log(temp_detail)
                if(data_read['status']) continue start_position;
                console.log(data_read['details']['tags'])
                if(typeof data_read['details']['tags'] === 'undefined') continue start_position;
                if(!data_read['details']['tags'].toString().toLowerCase().includes(tagArg)) continue start_position;
                break;
              }
            } else {
              message.channel.send('invalid input!');
              return;
            }
          } else {
            const req_read = await fetch(
              'https://nhentai-pages-api.herokuapp.com/' + temp_read
              ); // nh get pict API
              data_read = await req_read.json();
          }
          if (data_read['status']) {
            await message.channel.send('failed to get the doujin!');
            return;
          }
          const nhembed = new discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(data_read.title)
          .setURL(`https://nhentai.net/g/${temp_read}`)
          .setDescription(`showing 1/${data_read['details']['pages']} page`)
          .setImage(data_read['pages'][0]);
          mes_read.delete();
          //console.log(msg);
          const m = await message.channel.send(nhembed)
          await keyv.set(`${m.id}maxpage`, data_read['details']['pages']-'0');
          await keyv.set(`${m.id}url`, `https://nhentai.net/g/${temp_read}`);
          await keyv.set(`${m.id}title`, data_read.title);
          await keyv.set(m.id, data_read['pages']);
          await keyv.set(`${m.id}page`, 1);
          await m.react('⏪');
          await m.react('◀️');
          await m.react('🔢');
          await m.react('▶️');
          await m.react('⏩');
          // save code id and current page to change later
          // get page info
         // await keyv.set(`${msg.id}pages`, data_read['pages']);
        } catch (e) {
          message.channel.send('an error has occured');
          console.log(e)
        }
        //await nh.put(notif.id, data['details']['pages']);  
//------------------------------------------------------------------------------------------- detail
} else if (args[0].includes('det')){      
        try {
        let mes_detail = await message.channel.send('Loading... Please Wait.');
        var temp_detail;
        if (args[1] == 'random') {
          temp_detail = Math.floor(Math.random() * (340000 - 100000 + 1) + 100000);
          //console.log(temp_detail)
        } else if (Number.isInteger(args[1] - '0')) {
          temp_detail = args[1];
        } else if(args[1].includes('https://nhentai.net/g/')){
          temp_detail = args[1].replace('https://nhentai.net/g/', '')
        } else {
          message.channel.send('invalid input!');
          return;
        }
        var data_detail;
        if(args[2] == 'english'){
          start_position: while(1){
            temp_detail = Math.floor(Math.random() * (340000 - 100000 + 1) + 100000);
            const req_detail = await fetch(
              'https://nhentai-pages-api.herokuapp.com/' + temp_detail
              ); // nh get pict API
              data_detail = await req_detail.json();
              if(data_detail['status']) continue start_position;
              console.log(data_detail['details']['languages'])
              if(typeof data_detail['details']['languages'] === 'undefined') continue start_position;
              if(!data_detail['details']['languages'].toString().toLowerCase().includes('english')) continue start_position;
              break;
            }
        } else if(args[2] == 'tag') {
          if(args[3]){
          let i = 0;
          start_position: while(1){
            temp_detail = Math.floor(Math.random() * (340000 - 100000 + 1) + 100000);
            const req_detail = await fetch(
              'https://nhentai-pages-api.herokuapp.com/' + temp_detail
              ); // nh get pict API
              data_detail = await req_detail.json();
              i++; if(i>100){  message.channel.send('not found!');return;  }
              console.log(temp_detail)
              if(data_detail['status']) continue start_position;
              console.log(data_detail['details']['tags'])
              if (typeof data_detail['details']['tags'] === 'undefined') continue start_position;
              if(!data_detail['details']['tags'].toString().toLowerCase().includes(tagArg)) continue start_position;
              break;
            }
          } else {
            message.channel.send('invalid input!');
            return;
          }
        } else {
          const req_detail = await fetch(
            'https://nhentai-pages-api.herokuapp.com/' + temp_detail
            ); // nh get pict API
            data_detail = await req_detail.json();
        }
          var parodies = '',
            chara = '',
            tags = '',
            languages = '';
          if (data_detail['details']['parodies']) {
            for (var i in data_detail['details']['parodies']) {
              parodies = parodies + data_detail['details']['parodies'][i] + ', ';
            }
          } else {
            parodies = '-';
          }
          if (data_detail['details']['characters']) {
            for (var i in data_detail['details']['characters']) {
              chara = chara + data_detail['details']['characters'][i] + ', ';
            }
          } else {
            chara = '-';
          }
          if (data_detail['details']['tags']) {
            for (var i in data_detail['details']['tags']) {
              tags = tags + data_detail['details']['tags'][i] + ', ';
            }
          } else {
            tags = '-';
          }
          if (data_detail['details']['languages']) {
            for (var i in data_detail['details']['languages']) {
              languages = languages + data_detail['details']['languages'][i] + ', ';
            }
          } else {
            languages = '-';
          }
          if (data_detail['details']['artists'])
            var artist = data_detail['details']['artists'][0];
          else if (data_detail['details']['groups'])
            var artist = data_detail['details']['groups'][0];
          else var artist = '-';
          mes_detail.delete()
          const embed = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(data_detail['title'])
            .setURL('https://nhentai.net/g/' + temp_detail)
            .setDescription('Pages: ' + data_detail['details']['pages'][0])
            .setThumbnail('https://cdn.discordapp.com/attachments/807915611488911370/807926569472622612/PngItem_613187.png')
            .addFields(
              { name: 'parodies', value: parodies, inline: true },
              { name: 'characters', value: chara, inline: true },
              { name: 'tags', value: tags },
              { name: 'Artist', value: artist, inline: true },
              { name: 'Language', value: languages, inline: true }
            )
            .setImage(data_detail['thumbnails'][0])
          message.channel.send(embed);
        } catch (e) {
          message.channel.send('an error has occured');
          console.log(e)
        }
//------------------------------------------------------------------------------------------- popular
} else if(args[0].includes('popu')){      
        let mes_pop = await message.channel.send('Fetching data... Please Wait.');
        const req_pop = await fetch(
          'https://nhentai-pages-api.herokuapp.com/popular'
        );
        const data_pop = await req_pop.json();
        await mes_pop.delete();
        for (var i = 0; i < 5; i++) {
          await message.channel.send(
            'https://nhentai.net/g/' + data_pop['results'][i]['bookId']
          );
        }
} else if (args[0] === 'dl' || args[0].includes('downl')){
  try {
    let mes_dl= await message.channel.send('Loading... Please Wait.');
    var temp_detail;
    if (args[1] == 'random') {
      temp_dl = Math.floor(Math.random() * (340000 - 100000 + 1) + 100000);
      //console.log(temp_detail)
    } else if (Number.isInteger(args[1] - '0')) {
      temp_dl = args[1];
    } else if(args[1].includes('https://nhentai.net/g/')){
      temp_dl = args[1].replace('https://nhentai.net/g/', '')
    } else {
      message.channel.send('invalid input!');
      return;
    } 
    const req_url = await fetch(`https://nhentai-pages-api.herokuapp.com/${temp_dl}`);
    const data_url = await req_url.json()
    if(data_url['status']){ message.channel.send(`an error has occured`);return;  }
    const embed_dl = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`DOWNLOAD ${data_url['title']}`)
            .setURL(`https://nh-download.herokuapp.com/download/nhentai/${temp_dl}/zip`)
            .setDescription(`Pages: ${data_url['pages'].length} pages`)
            .setThumbnail(data_url['pages'][0])

      message.channel.send(embed_dl);mes_dl.delete();
  }catch (e) {
      message.channel.send(`an error has occured`)
      console.log(e)
  }
} else message.channel.send(`command didn't exist!`)
}
});

client.on('messageReactionAdd', async (data, user) => {
  // keyv.get(data.message.id).then(d => { if(typeof d != 'undefined') console.log(d) })
  // if not own id
  if (!user.bot) {
    if(data.emoji.name!='▶️' && data.emoji.name!='⏩' && data.emoji.name!='◀️' && data.emoji.name!='⏪' && data.emoji.name!='🔢') return;
    try {
      console.log(data.emoji.name)
      // get title
      var title = await keyv.get(`${data.message.id}title`);

      // get link
      var url = await keyv.get(`${data.message.id}url`);

      // get pages data 
      var pages = await keyv.get(data.message.id);
      //console.log(pages);
      
      // get curr page
      var current_page = await keyv.get(`${data.message.id}page`);

      // get max apge
      var max_page = await keyv.get(`${data.message.id}maxpage`);
      console.log(`max page: ${max_page}`);
      const nembed = new discord.MessageEmbed();
      switch (data.emoji.name) {
        case '▶️':
          if (current_page+1 <= max_page) current_page++;
          else                            current_page = max_page;
          data.message.reactions.resolve('▶️').users.remove(user.id);
          break;

        case '⏩':
          if (current_page+5 <= max_page) current_page += 5;
          else                            current_page = max_page;
          data.message.reactions.resolve('⏩').users.remove(user.id);
          break;

        case '◀️':
          if (current_page-1 > 0) current_page--;
          else                    current_page = 1;
          data.message.reactions.resolve('◀️').users.remove(user.id);
          break;

        case '⏪':
          if (current_page-5 > 0) current_page -= 5;
          else                    current_page = 0;
          data.message.reactions.resolve('⏪').users.remove(user.id);
          break;

        case '🔢':
          let filter = m => m.author.id === user.id;
          data.message.channel.send(`input the desired page!`).then(m => m.delete({timeout: 5*1000}))
          // awaiting input reply
          data.message.channel.awaitMessages(filter, {
            max: 1,
            time: 10000,
            errors: ['time']
          })
            .then(message => {
              message = message.first();
              if ((Number.isInteger(message.content-'0'))) {
                if (message.content-'0' <= max_page && message.content-'0' > 0) current_page = message.content - '0';
                else if (message.content - '0' < 0)                             current_page = 0; 
                else if (message.content - '0' > max_page)                      current_page = max_page; 
              } else data.message.channel.send(`invalid input!`) 
              message.delete();
              keyv.set(`${data.message.id}page`, current_page);
              keyv.set(`${data.message.id}maxpage`, max_page);
              nembed.setColor('#0099ff');
              nembed.setTitle(title);
              nembed.setURL(url);
              nembed.setDescription(`showing ${current_page}/${max_page} page`);
              nembed.setImage(pages[current_page-1]);
              data.message.edit(nembed);
            })
            .catch(collected => {
              data.message.channel.send('Timeout!')
              .then(mes => {
                mes.delete({ timeout: 5000 });
              }).catch(console.log)
            })
            data.message.reactions.resolve('🔢').users.remove(user.id);
          break;
      }
      if(data.emoji.name != '🔢'){
      await keyv.set(`${data.message.id}page`, current_page);
      await keyv.set(`${data.message.id}maxpage`, max_page);
      nembed.setColor('#0099ff');
      nembed.setTitle(title);
      nembed.setURL(url);
      nembed.setDescription(`showing ${current_page}/${max_page} page`);
      nembed.setImage(pages[current_page-1]);
      data.message.edit(nembed);
      }
      console.log(`current page: ${current_page}`)
    } catch(e) {
      data.message.reactions.resolve(data.emoji.name).users.remove(user.id);
    }
  }
    
})
client.login(process.env.tokenHeroku)

