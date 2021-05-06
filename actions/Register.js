const axios = require('axios');
const { isValidObjectId } = require('mongoose');

const User = require('../models/User');

class Register {

    constructor(msg){
        this.msg = msg;
        this.register()
    }

    async register(){
        let isValidId = await this.isValidSteamId();
        let isAlreadyRegistered = await this.isAlreadyRegisterdUser();
    
        if(isValidId && !isAlreadyRegistered){
            const newUser = new User({
                name: this.msg.author.username + this.msg.author.discriminator,
                discord_id: this.msg.author.id,
                username: this.msg.author.username,
                discriminator: this.msg.author.discriminator,
                steam_id: this.msg.content.split(" ")[1]
            })

            newUser.save().then(item => {
                this.msg.reply("You are registerd!");
            })
        }
        else{
            this.msg.reply("Invalid Steam ID or already registerd")
        }
    }
    
    async isValidSteamId(){
        let isValidId;
        await axios.get(`https://api.opendota.com/api/players/${this.msg.content.split(" ")[1]}/recentMatches`)
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

    async isAlreadyRegisterdUser(){
        let isRegistered;
        await User.findOne({discord_id: this.msg.author.id}, (err, foundUser) => {
            if(foundUser === null){
                isRegistered = false
            }
            else{
                isRegistered = true
            }
        })
        console.log(isRegistered)
        return isRegistered;
    }
}

module.exports = Register;