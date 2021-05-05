const axios = require('axios');

exports.handleRecentGameLossesMessageEvent = (msg) => {
    let commands = msg.content.split(" ");

    axios.get(`https://api.opendota.com/api/players/${commands[1]}/recentMatches`)
        .then((res) => {
            if(res.data.length === 0){ //Check if empty array
                msg.reply("Invalid steam ID")
            }
            else{
                let killDeathObject = countTotalKillsAndDeathsInRecentGames(res.data)
                console.log(msg.author.id)
                msg.reply(`\nKills: ${killDeathObject.kills} Deaths: ${killDeathObject.deaths}`)
            }
        })
        .catch((err) => {
            console.log(err)
            msg.reply("Invalid steam ID")
        })
}

function countTotalKillsAndDeathsInRecentGames(matches){
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

