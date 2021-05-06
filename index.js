const Stats = require('./actions/Stats');
const Register = require('./actions/Register');
const Discord = require('discord.js');
const client = new Discord.Client();
const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/.env'})

mongoose.connect('mongodb://root:example@mongo:27017', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("mongoDB Connected..."))
  .catch(err => console.log("error"))


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  
  switch(msg.content.split(" ")[0]){
    case '/stats':
      new Stats(msg);
      break;
    case '/register':
      new Register(msg)
      break;
  }
});

client.login(process.env.TOKEN);