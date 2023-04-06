let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let afkSchema = Schema({
    user: String, 
    roller: Array

})

module.exports = mongoose.model("AuditRole", afkSchema)