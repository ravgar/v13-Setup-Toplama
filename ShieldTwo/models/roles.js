let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let dataOzelData = Schema({
        _id: mongoose.Schema.Types.ObjectId,
        guildID: String,
        roleID: String,
        name: String,
        color: String,
        hoist: Boolean,
        position: Number,
        permissions: String,
        mentionable: Boolean,
        time: Number,
        members: Array,
        channelOverwrites: Array
})

module.exports = mongoose.model("roles", dataOzelData);