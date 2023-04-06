const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID: String,
  Active: {type: Boolean, default: true},
  AllVoice: Number,
  Tagged: Number,
  Staff: Number,
  messagesTask: Number,
  Register: Number,
  Invite: Number, 
  Reward: Number,
  Date: {type: Number, default: Date.now()},
  Time: {type: Number },
  Completed: Object,
});

module.exports = model("tasksystem", schema);