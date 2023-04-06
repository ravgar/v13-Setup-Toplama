let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let muteInterval = Schema({
    AuthID: String,
    Reason: String,
    userID: String,
    endDate: Number,
    muted: Boolean

});

module.exports = mongoose.model("muteInterval", muteInterval)