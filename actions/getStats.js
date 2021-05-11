const axios = require('axios');

async function getStats(steamId){
    let matchData;
    await axios.get(`https://api.opendota.com/api/players/${steamId}/recentMatches`)
        .then((res) => {
            matchData = res.data;
        })
        .catch((err) => {
            this.msg.reply("Couldn't fetch your 20 recent matches")
        })
    return matchData
}

module.exports = getStats;