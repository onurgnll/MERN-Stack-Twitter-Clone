const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FollowPageSchema = new Schema({
    
    full: {
        type: Boolean,
        default: false
    },
    items: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Tweet",
            default: []
    },
    addeddate: {
            type: Date
    }

})


const FollowPage = mongoose.model("FollowPage", FollowPageSchema);
module.exports = FollowPage