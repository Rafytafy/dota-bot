
exports.getWinner = function(users){
    let winner = users[0]
    for(let i = 0; i < users.length; i++){
        if(winner.stats.totalWins < users[i].stats.totalWins){
            winner = users[i]
        }
    }
    return winner;
}

exports.getLoser = function(users){
    let loser = users[0]
    for(let i = 0; i < users.length; i++){
        if(loser.stats.totalLoses < users[i].stats.totalLoses){
            loser = users[i]
        }
    }
    return loser;
}

exports.getKiller = function(users){
    let killer = users[0]
    for(let i = 0; i < users.length; i++){
        if(killer.stats.totalKills < users[i].stats.totalKills){
            killer = users[i]
        }
    }
    return killer;
}

exports.getFeeder = function(users){
    let feeder = users[0]
    for(let i = 0; i < users.length; i++){
        if(feeder.stats.totalDeaths < users[i].stats.totalDeaths){
        feeder = users[i]
        }
    }
    return feeder;
}

exports.getGoldCollector = function(users){
    let goldCollector = users[0]
    for(let i = 0; i < users.length; i++){
        if(goldCollector.stats.avgGPM < users[i].stats.avgGPM){
            goldCollector = users[i]
        }
    }
    return goldCollector;
}

exports.getKnowledgeCollector = function(users){
    let knowledgeCollector = users[0]
    for(let i = 0; i < users.length; i++){
        if(knowledgeCollector.stats.avgXPM < users[i].stats.avgXPM){
            knowledgeCollector = users[i]
        }
    }
    return knowledgeCollector;
}