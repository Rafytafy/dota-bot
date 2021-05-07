const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const User = require('../models/User');
class Stats {
    user;
    matchData;
    totalWins = 0;
    totalLoses = 0;
    totalKills = 0;
    totalDeaths = 0;
    avgGPM = 0;
    avgXPM = 0;

    constructor(msg){
        this.msg = msg;
        this.constructResponse();
    }

    async constructResponse() {
        await this.getUser();
        if(this.user === null){
            this.msg.reply('You need to be registered first');
        }
        else{
            await this.getMatchData();
            this.constructTheFieldData();
            this.sendResponse(); 
        }
          
    }
    sendResponse(){
        const embed = new MessageEmbed()
      // Set the title of the field
      .setTitle(`20 Recent Matches Stats`)
      // Set the color of the embed
      .setColor(0xff0000)
      .setAuthor(this.msg.author.username, this.msg.author.displayAvatarURL())
      .setThumbnail(this.msg.author.displayAvatarURL())
      // Set the main content of the embed
      .addFields({
            name: 'Wins',
            value: this.totalWins,
            inline: true
        },
        {
            name: 'Loses',
            value: this.totalLoses,
            inline: true
        },
        {
            name: 'Kills',
            value: this.totalKills,
            inline: true 
        },
        {
            name: 'Deaths',
            value: this.totalDeaths,
            inline:true
        },
        {
            name: 'Avg GPM',
            value: this.avgGPM,
            inline:true
        },
        {
            name: 'Avg XPM',
            value: this.avgXPM,
            inline:true
        }
      )
    
    this.msg.channel.send(embed);
    }

    async getUser() {
        await User.findOne({discord_id: this.msg.author.id}, (err, foundUser) => {
            if(err){
                console.log(err);
            }
            else{
                this.user = foundUser;
            }
        })
    }
    async getMatchData(){
        await axios.get(`https://api.opendota.com/api/players/${this.user.steam_id}/recentMatches`)
            .then((res) => {
                this.matchData = res.data;
            })
            .catch((err) => {
                this.msg.reply("Couldn't fetch your 20 recent matches")
            })
    }

    constructTheFieldData(){
        this.countTotalNumberOfWinsAndLosesInRecentGames()
        this.countTotalKillsAndDeathsInRecentGames()
        this.getAverageGpmAndXpm()
    }

    countTotalNumberOfWinsAndLosesInRecentGames(){
        for(let i = 0; i < this.matchData.length; i++){
            if(this.matchData[i].player_slot <= 127){
                this.totalWins += 1;
            }
            else{
                this.totalLoses += 1;
            }
        }
    }

    countTotalKillsAndDeathsInRecentGames(){
        for(let i = 0; i < this.matchData.length; i++){
            this.totalKills += this.matchData[i].kills;
            this.totalDeaths += this.matchData[i].deaths;
        }
    }
    getAverageGpmAndXpm(){
        let totalGPM = 0;
        let totalXPM = 0;

        for(let i = 0; i < this.matchData.length; i++){
            totalGPM += this.matchData[i].gold_per_min;
            totalXPM += this.matchData[i].xp_per_min;
        }
        this.avgGPM = Math.round(totalGPM/this.matchData.length);
        this.avgXPM = Math.round(totalXPM/this.matchData.length);
    }
}

module.exports = Stats;