const mongoose = require("mongoose");

const custommodel = mongoose.Schema({
    Name: String,
    Roles: Array,
    Text: String,
    Secret: String,
    Date: Date,
    Author: String,
});

module.exports = mongoose.model("rolemodelcustom", custommodel);