const discord = require('discord.js')
const { MessageAttachment } = require('discord.js');
const Keyv = require('keyv');
const fetch = require('node-fetch');
// import discord from 'discord.js'
// import Keyv from'keyv'
// import fetch from 'node-fetch'
const keyv = new Keyv(); // in-memory storage
const client = new discord.Client()
keyv.on('error', err => console.error('Keyv connection error:', err));
const prefix = "!"
var notifDict = { 
  '269397446516408331': '269397446516408331',
  '697842015840370730': '697842015840370730',
  '271999657024946176': '271999657024946176'}; // fixed object for me
//const { prefix, token } = require('./config.json');
client.once('ready', () => {
  console.log('logged in!')
})
client.on("message", async (message) => {
  //console.log(message)
  if (message.author.id == '807462756113842176') return;
  if (message.author.id == '804604322117189683') {
    try {
      //console.log(message.attachments.array()[0]['attachment'])
      for (var k in notifDict) {
        var member = message.guild.members.fetch(notifDict[k])
          //DM users
        if(message.attachments.array()[0]){
          ; (await member).send(message.attachments.array()[0]['attachment'])
        } else {
          ; (await member).send(message.content)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
});
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
  let userToDM = args[1]
  let arg = args[1]
  let comTemp = args
  const command = comTemp.shift().toLowerCase();
  if (command == 'ping') {
    message.channel.send('Pong.');
  } else if (command == 'beep') {
    message.channel.send(`boob`);
  } else if (command == 'notif') {
    if (userToDM.startsWith('<@') && userToDM.endsWith('>')) {
      userToDM = userToDM.slice(2, -1);

      if (userToDM.startsWith('!')) {
        userToDM = userToDM.slice(1);
      }
      console.log(userToDM)
      //message.channel.send(`${userToDM}`);
      let man = await message.guild.members.fetch(userToDM)
      console.log(man.user)
      if (man.user.bot) {
        message.channel.send(`you can't assign a bot to be notified!`);
      } else {
        if (notifDict[userToDM]) {
          message.channel.send(`${man.user.username} is already on the list!`);
        } else {
          notifDict[userToDM] = userToDM;
          message.channel.send(`${man.user.username} is assigned to be notified`);
        }
      }
    } else {
      message.channel.send(`invalid input!`);
    }
  } else if (command == 'remove') {
    if (userToDM.startsWith('<@') && userToDM.endsWith('>')) {
      userToDM = userToDM.slice(2, -1);

      if (userToDM.startsWith('!')) {
        userToDM = userToDM.slice(1);
      }
      let man = await message.guild.members.fetch(userToDM)
      if (notifDict[userToDM]) {
        if (delete notifDict[userToDM]) {
          message.channel.send(`${man.user.username} is removed from notification list!`);
        } else {
          message.channel.send(`failed to delete ${man.user.username} from notification list!`);
        }
      } else {
        message.channel.send(`User ${man.user.username} didn't exist on the list!`);
      }
    } else {
      message.channel.send(`invalid input!`);
    }
  } else if (command == 'show' || command == 'list') {
    if (arg.includes('notif')) {
      try {
        var tagged = "";
        let i = 1;
        for (var k in notifDict) {
          //message.channel.send(notifDict[k]);
          var member = await message.guild.members.fetch(notifDict[k])
          if(i == Object.keys(notifDict).length && Object.keys(notifDict).length != 1){
            tagged = tagged + `and ${member.user.username}, `;
          } else {
            tagged = tagged + `${member.user.username}, `;
          }
          i++;
          console.log(Object.keys(notifDict).length)
        }
      } catch (e) {
        message.channel.send(`something wrong has occured!`)
        console.log(e)
        return;
      }
      if (tagged != "") {
        console.log(tagged)
        message.channel.send(`${tagged}will be notified`)
      } else {
        message.channel.send("empty")
      }
    }
  } else if (command == 'nh') {
    if (!message.channel.nsfw) {
      message.channel.send('this isn\'t an NSFW channel dummy :3');
      return;
    }
if(args[0] === 'read') {
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
          let notif = await message.channel.send(
            `showing 1/${data_read['details']['pages']} page`
          );
          let msg = await message.channel.send(data_read['pages'][0]);
          mes_read.delete();
          //console.log(msg);
          await msg.react('⏪');
          await msg.react('◀️');
          await msg.react('🔢');
          await msg.react('▶️');
          await msg.react('⏩');
          await keyv.set(msg.id, notif.id);
          // save code id and current page to change later
          // get page info
          await keyv.set(`${msg.id}pages`, data_read['pages']);
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
  // if not own id
  if (user.id != '807462756113842176') {
    // lil bit of string manip to get the current page
    let konten = data.message.content
    let temp = konten.substring(0, konten.length - 4) // remove ".jpg"
    const edited_arr = temp.split('/')
    let current_page = edited_arr[edited_arr.length - 1]-'0' // get current page 
    // get page info alert
    const page_info_id = await keyv.get(data.message.id);
    const page_info = await data.message.channel.messages.fetch(page_info_id)
    // get current page 
    const pages = await keyv.get(`${data.message.id}pages`);
    const max_page = pages.length;
    // console.log(max_page)
    // console.log(pages)
    //
    switch (data.emoji.name) {
      case '▶️':
        current_page++;
        if (current_page <= max_page) {
          page_info.edit(`showing ${current_page}/${max_page} page`)
          data.message.edit(pages[current_page-1])
        } else page_info.edit(`maximum page reached! (${max_page}) page)`);
        data.message.reactions.resolve('▶️').users.remove(user.id);
        break;
      case '⏩':
        current_page = current_page+5;
        if (current_page <= max_page) {
          page_info.edit(`showing ${current_page}/${max_page} page`)
          data.message.edit(pages[current_page-1])
        } else {
          page_info.edit(`maximum page reached! (${max_page}) page)`);
          data.message.edit(pages[max_page-1])
        }
        data.message.reactions.resolve('⏩').users.remove(user.id);
        break;
      case '◀️':
        current_page--;
        if (current_page > 0) {
          page_info.edit(`showing ${current_page}/${max_page} page`)
          data.message.edit(pages[current_page-1])
        } else page_info.edit(`minimum page reached!`);
        data.message.reactions.resolve('◀️').users.remove(user.id);
        break;
      case '⏪':
        current_page = current_page-5;
        if (current_page > 0) {
          page_info.edit(`showing ${current_page}/${max_page} page`)
          data.message.edit(pages[current_page-1])
        } else {
          page_info.edit(`minimum page reached!`);
          data.message.edit(pages[0])
        }
        data.message.reactions.resolve('⏪').users.remove(user.id);
        break;
      case '🔢':
        let filter = m => m.author.id === user.id
        data.message.channel.send(`input the desired page!`)
          .then(mes => {
            mes.delete({ timeout: 4000 });
          }).catch(console.log)
        // awaiting input reply
        data.message.channel.awaitMessages(filter, {
          max: 1,
          time: 10000,
          errors: ['time']
        })
          .then(message => {
            message = message.first()
            if (Number.isInteger(message.content - '0')) {
              if (message.content <= max_page && message.content > 0) {
                page_info.edit(`showing ${message.content}/${max_page} page`)
                data.message.edit(pages[(message.content-'0')-1])
              } else if (message.content - '0' < 0) {
                page_info.edit(`showing 1/${max_page} page`)
                data.message.edit(pages[0])
              } else if (message.content - '0' > max_page) {
                page_info.edit(`showing ${max_page}/${max_page} page`)
                data.message.edit(pages[max_page-1])
              }
            } else {
              data.message.channel.send(`invalid input!`)
            }
            message.delete();
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
  }
})
client.login(process.env.tokenHeroku)
