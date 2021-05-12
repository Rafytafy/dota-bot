const User = require('../models/User');

async function getUsers(id) {
    let users;
    await User.find()
            .then((res) => users = res)
        
    return users;
}

module.exports = getUsers;