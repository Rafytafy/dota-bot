const User = require('../models/User');


async function getUser(id) {
    let user;
    await User.findOne({discord_id: id}, (err, foundUser) => {
        if(err){
            console.log(err);
        }
        else{
            user = foundUser;
        }
    })
    return user;
}

module.exports = getUser;