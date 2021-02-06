const discord = require('discord.js')
const client = new discord.Client()

client.once('ready', ()=>{
    console.log('logged in!')
})
const member_to_DM = [
  '269397446516408331', '515940939257085966', '418177899712086016'
]
client.on("message", async (message) => {
  if (message.author.id == '807462756113842176') return;
  if (message.author.id == '804604322117189683'){
    for(var val of member_to_DM){
      var member = message.guild.members.fetch(val)
      console.log(val)
      console.log(member)
      //DM users
      ;(await member).send(message.content)
    }
  }
  });
client.login(process.env.token)
