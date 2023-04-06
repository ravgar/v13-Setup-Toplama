const mongoose = require("mongoose");

const alarm = mongoose.Schema({
    _id: String,
    Name: String,
    Gender: String,
    Roles: { type: Array },
    Biography: String,
    Friends: { type: Object },
    Badges: { type: Object },
    Coin: { type: Number, default: 0, min: 0 },
    Gold: { type: Number, default: 0, min: 0 },
    Daily: { type: Number, default: 0 },
    Transfers: { type: Object },
    Inventory: { type: Object },
    CommandsLogs: { type: Object },
    Records: { type: Object },
    Tagged: { type: Boolean, default: false },
    Taggeds: { type: Object },
    Staff: { type: Boolean, default: false },
    Registrant: String,
    TaggedGiveAdmin: String,
    StaffGiveAdmin: String,
    Staffs: { type: Object },
    Uses: { type: Object },
    Names: { type: Object },
    Meetings: Object,
    Notes: { type: Object },
});

module.exports = mongoose.model("roleslog", alarm);