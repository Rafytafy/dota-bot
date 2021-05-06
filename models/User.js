const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    discord_id: {
        type: Number,
        required: true
    },
    user_name:{
        type: String,
        required: true
    },
    discrimiator: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('user', UserSchema);