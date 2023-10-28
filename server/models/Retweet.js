const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RetweetSchema = new Schema({
    tweetid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet"
    },
    tweet:{
        
        type: Object
    },
    retweetowneruserid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    retweetownername: {
        type: String,
        required: true
    },
    retweetownerusername: {
        type: String,
        required: true

    },

    retweetdate: {
        type: Object,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    likedUsers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    
    commentsArray: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Comment"
    },
    comments: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    public: {
        type: Boolean,
        default: true
    },
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
    },
    public: {
        type: Boolean,
        default: true
    },
    
    type: {
        type: String,
        default: "retweet"
    }

    


})


const Retweet = mongoose.model("Retweet", RetweetSchema);
module.exports = Retweet