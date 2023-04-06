let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let dataOzelData = Schema({
        guildID: String,
        channelID: String,
        name: String,
        bitrate: Number,
        parentID: String,
        position: Number,
        overwrites: Array,
})

module.exports = mongoose.model("VoiceChannels", dataOzelData);