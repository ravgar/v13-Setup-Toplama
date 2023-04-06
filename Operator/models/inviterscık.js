let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let afkSchema = Schema({
    guildID: { type: String },
    userID: { type: String },
    Inviter: String,
})

module.exports = mongoose.model("inviterbul", afkSchema)