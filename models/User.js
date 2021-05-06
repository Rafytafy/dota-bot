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
    username:{
        type: String,
        required: true
    },
    discriminator: {
        type: Number,
        required: true
    },
    steam_id: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('user', UserSchema);