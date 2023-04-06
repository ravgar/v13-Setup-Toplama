let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let randomMissionData = new Schema({
    Active: Boolean,
    userID: String,
    Mission: {type: Object, default: []},
    Check: {type: Number, default: 0}

});

module.exports = mongoose.model("randomMission", randomMissionData)