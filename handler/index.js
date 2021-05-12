const   Stats    = require('../objects/Stats'),
        getUser  = require('../actions/getUser'),
        getUsers = require('../actions/getUsers'),
        getStats = require('../actions/getStats');
        
const {recent20MatchesMessage} = require('../actions/embedMessageBuilder');

const {getWinner, getLoser, getKiller, getFeeder, getGoldCollector, getKnowledgeCollector} = require('../actions/leaderboard')


exports.handleStats = async function(msg){
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

exports.handleLeaderboard = async function(msg){
  let users = await getUsers();
  let usersWithStats = [];

  for(let i = 0; i < users.length; i++){
    let matchData = await getStats(users[i].steam_id);
    let stats = new Stats(matchData);
    usersWithStats.push({
      user: users[i],
      stats: stats
    })
  }

  let winner = getWinner(usersWithStats);
  let loser = getLoser(usersWithStats);
  let killer = getKiller(usersWithStats);
  let feeder = getFeeder(usersWithStats);
  let goldCollector = getGoldCollector(usersWithStats);
  let knowledgeCollector = getKnowledgeCollector(usersWithStats);

  

  msg.channel.send(`Our winner is ${winner.user.username} with ${winner.stats.totalWins} wins`)
  msg.channel.send(`Our loser is ${loser.user.username} with ${loser.stats.totalLoses} loses`)
  msg.channel.send(`Our killer is ${killer.user.username} with ${killer.stats.totalKills} kills`)
  msg.channel.send(`Our feeder is ${feeder.user.username} with ${feeder.stats.totalDeaths} deaths`)
  msg.channel.send(`Our greedy player is ${goldCollector.user.username} with ${goldCollector.stats.avgGPM} avgGPM`)
  msg.channel.send(`Our big brain player is ${knowledgeCollector.user.username} with ${knowledgeCollector.stats.avgXPM} avgXPM`)
}