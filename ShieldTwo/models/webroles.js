let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let afkSchema = Schema({
    _id: String,
    Roles: Array,
    Reason: String,
    Date: {type: Date, default: Date.now()}

})

module.exports = mongoose.model("webroles", afkSchema)