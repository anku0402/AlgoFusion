const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UsersSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    leetcode: {
        type: String,
        required: true
    },
    codeforces: {
        type: String,
        required: true
    },
    photo: {
        type: String
    }
})
module.exports = mongoose.model('Users',UsersSchema);