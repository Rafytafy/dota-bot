const Discord  = require('discord.js'),
      client   = new Discord.Client();

const registerUser = require('./actions/registerUser')

const { handleStats } = require('./handler/')

require('./db');
require('dotenv').config({path: __dirname + '/.env'});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  switch(msg.content.split(" ")[0]){
    case '!stats':
      handleStats(msg);
      break;
    case '!register':
      registerUser(msg)
      break;
    case '!test':
      break;
  }
});

client.login(process.env.TOKEN);