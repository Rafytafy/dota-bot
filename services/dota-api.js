const axios = require('axios');

class DotaApi {
    url = 'https://api.opendota.com/api';
    
    async get(path){
        let response;
        try {
            response = await axios.get(`${this.url}${path}`)
        }
        catch(error) {
            console.log(`Something went wrong fetching from dota api, Error: ${error}`);
        }
        return response.data
    }
}

module.exports = DotaApi;