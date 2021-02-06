const discord = require('discord.js')
const client = new discord.Client()
const { prefix, token } = require('./config.json');
var notifDict = {};
client.once('ready', ()=>{
    console.log('logged in!')
})
client.on("message", async (message) => {
  if (message.author.id == '807462756113842176') return;
  if (message.author.id == '804604322117189683'){
    for(var k in notifDict){
      var member = message.guild.members.fetch(notifDict[k])
      console.log(val)
      console.log(member)
      //DM users
      ;(await member).send(message.content)
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
  switch(command){
    case 'ping':
      message.channel.send('Pong.');
      break;
      case 'beep':
      message.channel.send(`boob`);
      break;
    case 'notif':
      if (userToDM.startsWith('<@') && userToDM.endsWith('>')) {
        userToDM = userToDM.slice(2, -1);
      
        if (userToDM.startsWith('!')) {
          userToDM = userToDM.slice(1);
        }
        console.log(userToDM)
          //message.channel.send(`${userToDM}`);
      }
      notifDict[userToDM] = userToDM;
      let man = await message.guild.members.fetch(userToDM)
      message.channel.send(`${man.user.username} is assigned to be notified`);
      break;
    case 'unnotif':
      if (userToDM.startsWith('<@') && userToDM.endsWith('>')) {
        userToDM = userToDM.slice(2, -1);
        
        if (userToDM.startsWith('!')) {
          userToDM = userToDM.slice(1);
        }
      }
      const ind = notifDict.indexOf(userToDM);
        if (ind > -1) {
          notifDict.splice(ind, 1);
          let man = await message.guild.members.fetch(userToDM)
          message.channel.send(`${man.user.username} is removed from notification list!`);
        } else {
          message.channel.send(`User doesn't exist!`);
        }
      break;
    case 'list':
      console.log(arg)
      if(arg.includes('notif')){
        var tagged = "";
        for(var k in notifDict){
          //message.channel.send(notifDict[k]);
          var member = await message.guild.members.fetch(notifDict[k])
          tagged = tagged+`${member.user.username}, `;
        }
        if(tagged != ""){
          message.channel.send(`${tagged} are who will be notified`)
        } else {
          message.channel.send("empty")
        }
      }
    break;
  }    // other commands...
});
client.login(process.env.tokenHeroku)
