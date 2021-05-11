class Stats {
    matchData;
    totalWins = 0;
    totalLoses = 0;
    totalKills = 0;
    totalDeaths = 0;
    avgGPM = 0;
    avgXPM = 0;

    constructor(matchData){
        this.matchData = matchData;
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