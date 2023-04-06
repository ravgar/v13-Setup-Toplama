let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let backupschema = Schema({
    roleID: String,
    name: String,
    color: String,
    hoist: Boolean,
    position: Number,
    permissions: String,
    mentionable: Boolean,
    date: Number,
    members: Array,
    channelOverwrites: Array
});

module.exports = mongoose.model("guildcroles", backupschema)