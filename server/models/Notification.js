const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    ownerusername: {
        type: String,
        required: true
    },
    ownerid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    notificationdate: {
        type: Object,
        required: true
    },
    seen:{
        type: Boolean,
        default: false
    }

    


})


const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification