const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrendSchema = new Schema({
    title: {
        type: String
    },
    tweets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tweet",
    },
    contribution: {
        type: Number
    }



})


const Trend = mongoose.model("Trend", TrendSchema);
module.exports = Trend