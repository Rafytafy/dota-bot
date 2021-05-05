const stats = require('./stats');
const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/.env'})

mongoose.connect('mongodb://mongo:27017', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("mongoDB Connected..."))
  .catch(err => console.log("error"))


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  switch(msg.content.split(" ")[0]){
    case 'stats':
      stats.handleRecentGameLossesMessageEvent(msg);
      break;
    case 'register':
      break
  }
});

client.login(process.env.TOKEN);