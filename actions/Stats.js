const axios = require('axios');

class Stats {

    constructor(msg){
        this.msg = msg;
        this.getKillDeathsFromPreviousMatches();
    }

    getKillDeathsFromPreviousMatches(){
        let commands = this.msg.content.split(" ");

        axios.get(`https://api.opendota.com/api/players/${commands[1]}/recentMatches`)
            .then((res) => {
                if(res.data.length === 0){ //Check if empty array
                    this.msg.reply("Invalid steam ID")
                }
                else{
                    let killDeathObject = this.countTotalKillsAndDeathsInRecentGames(res.data)
                    this.msg.reply(`\nKills: ${killDeathObject.kills} Deaths: ${killDeathObject.deaths}`)
                }
            })
            .catch((err) => {
                // console.log(err)
                this.msg.reply("Invalid steam ID")
            })
    }

    countTotalKillsAndDeathsInRecentGames(matches){
        let totalNumberOfKills = 0;
        let totalNumberOfDeaths = 0;
    
        for(let i = 0; i < matches.length; i++){
            totalNumberOfKills += matches[i].kills;
            totalNumberOfDeaths += matches[i].deaths;
        }
    
        let killDeathObject = {
            kills: totalNumberOfKills,
            deaths: totalNumberOfDeaths
        } 
    
        return killDeathObject;
    }
}

module.exports = Stats;