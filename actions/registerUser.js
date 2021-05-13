const axios = require('axios'),
      User  = require('../models/User');

async function registerUser(msg){
    let steam_id = msg.content.split(" ")[1];
    let isValidId = await isValidSteamId(steam_id);
    let isAlreadyRegistered = await isAlreadyRegisterdUser(msg.author.id);

    if(isValidId && !isAlreadyRegistered){
        const newUser = new User({
            name: msg.author.username + msg.author.discriminator,
            discord_id: msg.author.id,
            username: msg.author.username,
            discriminator: msg.author.discriminator,
            steam_id: steam_id
        })

        newUser.save().then(item => {
            msg.reply("You are registerd!");
        })
    }
    else{
        msg.reply("Invalid Steam ID or already registerd")
    }    
}

async function isValidSteamId(steam_id){
    let isValidId;
    await axios.get(`https://api.opendota.com/api/players/${steam_id}/recentMatches`)
        .then((res) => {
            if(res.data.length === 0){ //Check if empty array
                isValidId = false;
            }
            else{
                isValidId = true;
            }
        })
        .catch((err) => {
            isValidId = false;
        })

    return isValidId;
}

async function isAlreadyRegisterdUser(id){
    let isRegistered;
    await User.findOne({discord_id: id}, (err, foundUser) => {
        if(foundUser === null){
            isRegistered = false
        }
        else{
            isRegistered = true
        }
    })
    return isRegistered;
}

module.exports = registerUser;