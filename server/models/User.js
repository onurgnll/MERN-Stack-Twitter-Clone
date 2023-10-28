const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    joinedDate: {
        type: Date
    },
    tweets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tweet"
    },
    retweets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Retweet"
    },
    notifications: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    followed: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    }



})


const User = mongoose.model("User", UserSchema);
module.exports = User