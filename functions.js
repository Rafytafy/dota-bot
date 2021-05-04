const axios = require('axios');


exports.handlePingMessageEvent = (msg) => {
  console.log(msg.author)
    msg.reply(msg.author.username);
}

exports.handleRecentGameLossesMessageEvent = (msg) => {
    axios.get('https://api.opendota.com/api/players/156265276/recentMatches')
        .then((res) => {
            let killDeathObject = countTotalLossesInRecentGames(res.data)
            msg.reply(`\nKills: ${killDeathObject.kills} Deaths: ${killDeathObject.deaths}`)
        })
}

function countTotalLossesInRecentGames(matches){
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

