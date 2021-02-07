const discord = require('discord.js')
const fetch = require('node-fetch');
const Keyv = require('keyv');
const keyv = new Keyv(); // in-memory storage
const client = new discord.Client()
keyv.on('error', err => console.error('Keyv connection error:', err));
//const { prefix, token } = require('./config.json');
const prefix = "!" 
var notifDict = {'269397446516408331': '269397446516408331',};
client.once('ready', ()=>{
    console.log('logged in!')
})
client.on("message", async (message) => {
  if (message.author.id == '807462756113842176') return;
  if (message.author.id == '804604322117189683'){
  try{  
    for(var k in notifDict){
      var member = message.guild.members.fetch(notifDict[k])
      //DM users
      ;(await member).send(message.content)
    }
  } catch (e) {
    console.log(e)
  }
  }
  });
client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  console.log(args[1])
  let userToDM = args[1]
  let arg = args[1]
  let comTemp = args
  const command = comTemp.shift().toLowerCase();
  if(command == 'ping'){
      message.channel.send('Pong.');
  } else if(command =='beep'){
      message.channel.send(`boob`);
  } else if(command == 'notif'){
      if (userToDM.startsWith('<@') && userToDM.endsWith('>')) {
        userToDM = userToDM.slice(2, -1);
      
        if (userToDM.startsWith('!')) {
          userToDM = userToDM.slice(1);
        }
        console.log(userToDM)
          //message.channel.send(`${userToDM}`);
          let man = await message.guild.members.fetch(userToDM)
          console.log(man.user)
          if(man.user.bot){
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
  } else if(command == 'remove'){
      if (userToDM.startsWith('<@') && userToDM.endsWith('>')) {
        userToDM = userToDM.slice(2, -1);
        
        if (userToDM.startsWith('!')) {
          userToDM = userToDM.slice(1);
        }
        let man = await message.guild.members.fetch(userToDM)
          if (notifDict[userToDM]) {
            if(delete notifDict[userToDM]){
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
  } else if (command === 'show' || command === 'list'){
      if(arg.includes('notif')){
      try{
        var tagged = "";
        for(var k in notifDict){
          //message.channel.send(notifDict[k]);
          var member = await message.guild.members.fetch(notifDict[k])
          tagged = tagged+`${member.user.username}, `;
        }
      } catch (e) {
        message.channel.send(`something wrong has occured!`) 
        console.log(e)
        return;
      }
        if(tagged != ""){
          console.log(tagged)
          message.channel.send(`${tagged} are who will be notified`)
        } else {
          message.channel.send("empty")
        }
      }
  } else if (command == 'nh'){
    if(message.channel.nsfw) {
    switch(args[0]){
//-------------------------------------------------------------------------------- read
      case 'read':
        let mes_read = await message.channel.send('Loading... Please Wait.');
        try{
        var temp_read;
        if(args[1] === 'random'){
          temp_read = Math.floor(Math.random() * (340000 - 100000 + 1) + 100000);
        } else if(Number.isInteger(args[1]-'0')){
          temp_read = args[1];
        } else {
          message.channel.send('invalid input!');
          return;
        }
          const req_read = await fetch(
            'https://nhentai-pages-api.herokuapp.com/' + temp_read
            ); // nh get pict API
            const data_read = await req_read.json();
            if(data_read['status'] == 404) {
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
              //get max page
              await keyv.set(notif.id, data_read['details']['pages']);
        } catch(e) {
          message.channel.send('an error has occured');
          console.log(e)
        }
        //await nh.put(notif.id, data['details']['pages']);  
      break;
//-------------------------------------------------------------------------------- detail
      case 'detail':
        let mes_detail = await message.channel.send('Loading... Please Wait.');
        var temp_detail;
        if(args[1] === 'random'){
           temp_detail = Math.floor(Math.random() * (340000 - 100000 + 1) + 100000);
           console.log(temp_detail)
        } else if(Number.isInteger(args[1]-'0')){
           temp_detail = args[1];
        } else {
          message.channel.send('invalid input!');
          return;
        }
        try{
          const req_detail = await fetch(
            'https://nhentai-pages-api.herokuapp.com/' + temp_detail
            ); // nh get pict API
            const data_detail = await req_detail.json();
            if(data_detail['status'] == 404) {
              await message.channel.send('failed to get the doujin!');
              return;
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
            if (data_detail['details']['parodies']) {
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
      break;
//-------------------------------------------------------------------------------- popular
      case 'popular':
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
      break;
    }
  } else {
    message.channel.send('this isn\'t an NSFW channel dummy :3');
  } 
}
});

client.on('messageReactionAdd', async(data, user) =>{
  // if not own id
  if(user.id != '807462756113842176'){
    let konten = data.message.content
    let temp = konten.substring(0, konten.length-4) // remove ".jpg"
    const edited_arr = temp.split('/')
    let current_page = edited_arr[edited_arr.length-1] // get current page 
    const page_info_id = await keyv.get(data.message.id);
    const max_page = await keyv.get(page_info_id);
    const page_info = await data.message.channel.messages.fetch(page_info_id)
    switch(data.emoji.name){
      case '▶️':
        current_page = (current_page-'0')+1;
        if(current_page <= max_page){
          page_info.edit(`showing ${current_page}/${max_page} page`)
          const konten_edited = konten.replace(`/${current_page-1}.`, `/${current_page}.`)
          data.message.edit(konten_edited)
        } else page_info.edit(`maximum page reached! (${max_page}) page)`);
        data.message.reactions.resolve('▶️').users.remove(user.id);
      break;
      case '⏩':
        current_page=(current_page-'0')+5;
        if(current_page <= max_page){
          page_info.edit(`showing ${current_page}/${max_page} page`)
          const konten_edited = konten.replace(`/${current_page-5}.`, `/${current_page}.`)
          data.message.edit(konten_edited)
        } else {
          page_info.edit(`maximum page reached! (${max_page}) page)`);
          const konten_edited = konten.replace(`/${current_page-5}.`, `/${max_page}.`)
          data.message.edit(konten_edited)
        } 
        data.message.reactions.resolve('⏩').users.remove(user.id);
      break;
      case '◀️':
        current_page = (current_page-'0')-1;
        if(current_page > 0){
          page_info.edit(`showing ${current_page}/${max_page} page`)
          const konten_edited = konten.replace(`/${current_page+1}.`, `/${current_page}.`)
          data.message.edit(konten_edited)
        } else page_info.edit(`minimum page reached!`);
        data.message.reactions.resolve('◀️').users.remove(user.id);
      break;
      case '⏪':
        current_page=(current_page-'0')-5;
        if(current_page > 0){
          page_info.edit(`showing ${current_page}/${max_page} page`)
          const konten_edited = konten.replace(`/${current_page+5}.`, `/${current_page}.`)
          data.message.edit(konten_edited)
        } else {
          page_info.edit(`minimum page reached!`);
          const konten_edited = konten.replace(`/${current_page-5}.`, `/1.`)
          data.message.edit(konten_edited)
        }
        data.message.reactions.resolve('⏪').users.remove(user.id);
      break;
      case '🔢':
        let filter = m => m.author.id === user.id
    data.message.channel.send(`(waiting 10s): input the desired page!`).then(() => {
      // awaiting input reply
      data.message.channel.awaitMessages(filter, {
          max: 1,
          time: 10000,
          errors: ['time']
        })
        .then(message => {
          message = message.first()
          message.delete();
          if (Number.isInteger(message.content-'0')) {
            if(message.content <= max_page && message.content > 0){
              page_info.edit(`showing ${message.content}/${max_page} page`)
              const konten_edited = konten.replace(`/${current_page}.`, `/${message.content}.`)
              data.message.edit(konten_edited)
            } else if(message.content < 0){
              page_info.edit(`showing 1/${max_page} page`)
              const konten_edited = konten.replace(`/${current_page}.`, `/1.`)
              data.message.edit(konten_edited)
            } else if(message.content > max_page){
              page_info.edit(`showing ${max_page}/${max_page} page`)
              const konten_edited = konten.replace(`/${current_page}.`, `/${max_page}.`)
              data.message.edit(konten_edited)
            }
          } else {
            data.message.channel.send(`invalid input!`)
          }
          data.message.reactions.resolve('🔢').users.remove(user.id);
        })
        .catch(collected => {
          data.message.channel.send('Timeout!');
        });
    })  
      break;
    }
  }
})

client.login(process.env.tokenHeroku)
