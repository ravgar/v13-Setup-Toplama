let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let authority_user_Schema = Schema({
    
    guildID: {type: String, default: ""}, 
    member: {type: String, default: ""}, 
    yetkili: {type: String, default: ""}, 
    tarih: {type: String, default: []}, 
})

module.exports = mongoose.model("yetkibaslat", authority_user_Schema)