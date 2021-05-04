const stats = require('./stats');
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config({path: __dirname + '/.env'})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  switch(msg.content.split(" ")[0]){
    case 'stats':
        stats.handleRecentGameLossesMessageEvent(msg);
        break;
  }
});

client.login(process.env.TOKEN);