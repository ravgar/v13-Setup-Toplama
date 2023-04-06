let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Seens = Schema({
        userID: String,
        guildID: String,
        lastSeen: Number, 
        lastSeenVoice: Number,    
        lastSeenMessage: Number,
    
        
    });

module.exports = mongoose.model("Seen", Seens);