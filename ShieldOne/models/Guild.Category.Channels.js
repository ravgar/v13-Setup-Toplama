let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let backupschema = Schema({
    channelID: String,
    name: String,
    position: Number,
    overwrites: Array,
});

module.exports = mongoose.model("guildcategorychannels", backupschema)