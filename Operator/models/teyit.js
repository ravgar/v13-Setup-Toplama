let mongoose = require("mongoose");
const { schema } = require("./sunucuayar");
let Schema = mongoose.Schema;

let teyitSchema = Schema({

    userID: {type: String, default: ""},
    guildID: {type: String, default: ""},
    nicknames: Array,
})

module.exports = mongoose.model("teyit", teyitSchema)