let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let backupschema = Schema({
    channelID: String,
    name: String,
    nsfw: Boolean,
    parentID: String,
    position: Number,
    rateLimit: Number,
    overwrites: Array,

});

module.exports = mongoose.model("guildtextchannels", backupschema)