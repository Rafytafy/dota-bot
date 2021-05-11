const   Stats    = require('../objects/Stats'),
        getUser  = require('../actions/getUser'),
        getStats = require('../actions/getStats');
        
const {recent20MatchesMessage} = require('../actions/embedMessageBuilder');


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