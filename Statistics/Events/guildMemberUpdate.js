const roller = require("../models/rollog")
let StaffXP = require("../models/stafxp");
let randMiss = require("../models/randomMission");
let sunucuayar = require("../models/sunucuayar");
let muteInterval = require("../models/muteInterval");
const {MessageEmbed, Collection,MessageAttachment} = require("discord.js");
const hanedan = require("../models/hanedanlik");
const Seens = require("../models/seens")

const {
    Canvas
} = require('canvas-constructor');
const {
    loadImage
} = require('canvas');
const {
    join
} = require("path");
module.exports = async (oldMember, newMember) => {

  await newMember.guild.fetchAuditLogs({
	type: "MEMBER_ROLE_UPDATE"
}).then(async (audit) => {
	let ayar = audit.entries.first()
	let hedef = ayar.target
	let yapan = ayar.executor
	if (yapan.bot) return
	newMember.roles.cache.forEach(async role => {
		if (!oldMember.roles.cache.has(role.id)) {
			roller.findOne({
				user: hedef.id
			}, async (err, res) => {
				if (!res) {
					let arr = []
					arr.push({
						rol: role.id,
						mod: yapan.id,
						tarih: Date.parse(new Date()),
						state: "Ekleme"
					})
					let newData = new roller({
						user: hedef.id,
						roller: arr
					})
					newData.save().catch(e => console.log(e))
				} else {
					res.roller.push({
						rol: role.id,
						mod: yapan.id,
						tarih: Date.parse(new Date()),
						state: "Ekleme"
					})
					res.save().catch(e => console.log(e))
				}
			})
		}
	});
	oldMember.roles.cache.forEach(async role => {
		if (!newMember.roles.cache.has(role.id)) {
			roller.findOne({
				user: hedef.id
			}, async (err, res) => {
				if (!res) {
					let arr = []
					arr.push({
						rol: role.id,
						mod: yapan.id,
						tarih: Date.parse(new Date()),
						state: "Kaldırma"
					})
					let newData = new roller({
						user: hedef.id,
						roller: arr
					})
					newData.save().catch(e => console.log(e))
				} else {
					res.roller.push({
						rol: role.id,
						mod: yapan.id,
						tarih: Date.parse(new Date()),
						state: "Kaldırma"
					})
					res.save().catch(e => console.log(e))
				}
			})
		}
	});
})

};
