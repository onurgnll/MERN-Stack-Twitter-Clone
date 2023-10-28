const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PageSchema = new Schema({
    
    full: {
        type: Boolean,
        default: false
    },
    items: {
            type: [mongoose.Schema.Types.ObjectId],
            default: []
    },
    addeddate: {
            type: Date
    }

})


const Page = mongoose.model("Page", PageSchema);
module.exports = Page