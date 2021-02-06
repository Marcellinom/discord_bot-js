const discord = require('discord.js')
const client = new discord.Client()
//const { prefix, token } = require('./config.json');
const prefix = "!" 
var notifDict = {};
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
          let man = await message.guild.members.fetch(userToDM)
          console.log(man)
          if(man.user.bot){
            message.channel.send(`you can assign a bot to be notified!`);
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
      break;
    case 'remove':
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
