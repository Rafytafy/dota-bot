const User = require('../models/User');

class Register {

    constructor(msg){
        this.msg = msg;
        this.register()
    }

    register(){
        const newUser = new User({
            name: this.msg.author.username + this.msg.author.discriminator,
            discord_id: this.msg.author.id,
            username: this.msg.author.username,
            discriminator: this.msg.author.discriminator,
            steam_id: msg.content.split(" ")[1]
        })
        
        console.log(newUser)

        newUser.save().then(item => {
            console.log(item);
            this.msg.reply("Added User");
        })

        User.find()
            .then(items => {
                console.log(items);
                this.msg.reply("Added User");
            })
    }
    

}

module.exports = Register;