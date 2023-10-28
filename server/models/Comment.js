const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    ownerid:{
        type: String,
        required: true
    },

    commentdate: {
        type: Object,
        required: true
    },
    tweetid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
    }

    


})


const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment