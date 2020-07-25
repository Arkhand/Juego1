const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        requred: true
    },
    displayName: {
        type: String,
    },
    fistName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    iamge: {
        type: String,
    },
    createdAt: {
        type: Date,
        dafault: Date.now
    }
})

module.exports = mongoose.model('User', UserSchema);    