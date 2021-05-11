const { MessageEmbed } = require('discord.js');

exports.recent20MatchesMessage = function(msg, stats){
    const embed = new MessageEmbed()
      // Set the title of the field
      .setTitle(`20 Recent Matches Stats`)
      // Set the color of the embed
      .setColor(0xff0000)
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setThumbnail(msg.author.displayAvatarURL())
      // Set the main content of the embed
      .addFields({
            name: 'Wins',
            value: stats.totalWins,
            inline: true
        },
        {
            name: 'Loses',
            value: stats.totalLoses,
            inline: true
        },
        {
            name: 'Kills',
            value: stats.totalKills,
            inline: true 
        },
        {
            name: 'Deaths',
            value: stats.totalDeaths,
            inline:true
        },
        {
            name: 'Avg GPM',
            value: stats.avgGPM,
            inline:true
        },
        {
            name: 'Avg XPM',
            value: stats.avgXPM,
            inline:true
        }
      )
    return embed;
}