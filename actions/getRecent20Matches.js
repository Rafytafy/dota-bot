// import DotaApi from '../services/dota-api';
const DotaApi = require('../services/dota-api');
const dotaApi = new DotaApi();

async function getRecent20Matches(steamId){
    let matchData;
    console.log("asdfasd")
    try {
        matchData = await dotaApi.get(`/players/${steamId}/recentMatches`);
    }
    catch(error) {
        console.log(`Something went wrong fetching 20 matches, Error: ${error}`)
    }
    return matchData
}

module.exports = getRecent20Matches;