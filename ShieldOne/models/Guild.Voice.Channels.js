let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let backupschema = Schema({
    channelID: String,
    name: String,
    bitrate: Number,
    parentID: String,
    position: Number,
    userLimit: Number,
    overwrites: Array,
});

module.exports = mongoose.model("guildvoicechannels", backupschema)