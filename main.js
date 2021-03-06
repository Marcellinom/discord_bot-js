const discord = require('discord.js')
const { MessageAttachment } = require('discord.js');
const Keyv = require('keyv');
const fetch = require('node-fetch');
const request = require('request');

const keyv = new Keyv(); // in-memory storage
const client = new discord.Client()
keyv.on('error', err => console.error('Keyv connection error:', err));
const prefix = "!"
//const { prefix, token } = require('./config.json');
client.once('ready', () => {
  console.log('logged in!')
})
client.on("message", async (message) => {
  if(message.content === '!res'){
    if(message.author.id === '269397446516408331'){
      let rep = await message.channel.send("Resetting...");
      client.destroy();
      client.login(process.env.tokenHeroku);
      rep.delete()
    }
  }
})
client.on("message", async (message) => {
  if (message.author.id == '807462756113842176') return;
  if (message.author.id == '804604322117189683') { //804604322117189683 Laba-Laba ganteng ;)
      message.guild.members.fetch()
      .then(m => {
        m.forEach(function(prop){
          if(!prop.user.bot){
            if(message.attachments.array()[0]){
              prop.send(message.attachments.array()[0]['attachment'])
            } else {
              prop.send(message.content)
            }
          }
        })
      }).catch(console.error);
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
  } else if(command.includes('im')) {
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
      var pageinfo = await message.channel.send(`showing 1/${res.value.length} images`); 
      var msg = await message.channel.send(query[ind]['thumbnailUrl']);
 
      let filter = m => m.channel.id === message.channel.id 
              // awaiting input reply
      var flag = true;
        while(flag){
              await message.channel.awaitMessages(filter, {
                max: 1,
                time: 100000,
                errors: ['time']
              })
                .then(message => {
                  message = message.first() 
                  if (message.content === 'n') {
                    if(ind+1<=res.value.length){
                      ind++;
                      console.log(ind);
                      pageinfo.edit(`showing ${ind+1}/${res.value.length} images`);
                      msg.edit(query[ind]['thumbnailUrl'])
                      .then(msg => console.log(`Updated the content of a message to ${msg.content}`))
                      .catch(console.error);
                    }
                    message.delete();
                  } else if(message.content === 'p'){
                    if(ind-1>=0){
                      ind--;
                      console.log(ind);
                      pageinfo.edit(`showing ${ind+1}/${res.value.length} images`);
                      msg.edit(query[ind]['thumbnailUrl'])
                      .then(msg => console.log(`Updated the content of a message to ${msg.content}`))
                      .catch(console.error);
                    }
                    message.delete();
                  } else if(message.content.includes('!im')) {
                    console.log('stopped')  
                    flag = false
                  }
                }).catch(collection => {
              flag = false
              console.log('timeout')  
              })
              }
    });

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
