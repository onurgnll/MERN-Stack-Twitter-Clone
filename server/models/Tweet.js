const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TweetSchema = new Schema({
    tweetcontent: {
        type: String,
        required: true
    },
    tweetowner: {
        type: String,
        required: true
    },
    tweetownerid:{
        type: String,
        required: true
    },

    tweetdate: {
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
    retweets: {
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
    tweetowneruserid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    type: {
        type: String,
        default: "tweet"
    }

    


})


const Tweet = mongoose.model("Tweet", TweetSchema);
module.exports = Tweet