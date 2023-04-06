let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let dataOzelData = Schema({
        guildID: String,
        channelID: String,
        name: String,
        position: Number,
        overwrites: Array,})

module.exports = mongoose.model("catagory", dataOzelData);