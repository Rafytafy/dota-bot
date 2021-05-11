const Stats = require('./objects/Stats');
const Register = require('./objects/Register');
const Discord = require('discord.js');
const client = new Discord.Client();
const getStats = require('./actions/getStats')
const getUser = require('./actions/getUser')
const {recent20MatchesMessage} = require('./actions/buildAndSendEmbedMessage')
const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/.env'})

mongoose.connect('mongodb://root:example@mongo:27017', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("mongoDB Connected..."))
  .catch(err => console.log("error"))


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  // console.log(msg.author)
  switch(msg.content.split(" ")[0]){
    case '!stats':
      handleStats(msg);
      break;
    case '!register':
      new Register(msg)
      break;
    case '!test':
      break;
  }
});

async function handleStats(msg){
  let user = await getUser(msg.author.id)
    if(user === null){
      msg.reply('You need to be registered first');
    }
    else{
      let matchData = await getStats(user.steam_id);
      let stats = new Stats(matchData);
      let embedMessage = recent20MatchesMessage(msg, stats);
      msg.channel.send(embedMessage);
    }
}

client.login(process.env.TOKEN);