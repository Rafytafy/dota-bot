const Stats = require('./actions/Stats');
const Register = require('./actions/Register');
const Discord = require('discord.js');
const client = new Discord.Client();
const { MessageEmbed } = require('discord.js');
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
      new Stats(msg);
      break;
    case '!register':
      new Register(msg)
      break;
    case '!test':
      const embed = new MessageEmbed()
      // Set the title of the field
      .setTitle('A slick little embed')
      // Set the color of the embed
      .setColor(0xff0000)
      .setAuthor('rafael', msg.author.displayAvatarURL(), 'http://google.com')
      .setImage(msg.author.displayAvatarURL())
      .setThumbnail(msg.author.displayAvatarURL())
      // Set the main content of the embed
      .setDescription('Hello, this is a slick embed!')
      .addFields({
          name: 'Field 1',
          value: 'Hello world',
          inline: false
        },
        {
          name: 'Field 2',
          value: 'Hello world',
          inline:true
        },
        {
          name: 'Field 2',
          value: 'Hello world',
          inline:true
        }
      )
    // Send the embed to the same channel as the message
    msg.channel.send(embed);
      break;
  }
});

client.login(process.env.TOKEN);