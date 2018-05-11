const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    depaulID: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
});
const User = module.exports = mongoose.model('User', UserSchema);
