let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let dataOzelData = Schema({
        guildID: String,
        roles: Array,})

module.exports = mongoose.model("Catagory", dataOzelData);