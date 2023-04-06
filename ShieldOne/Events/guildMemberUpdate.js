
const {
  MessageEmbed
} = require("discord.js");
const conf = require("../../settings")
const sunucuayar = require("../models/sunucuayar")
const moment = require("moment")
const güvenli = require("../../SafeGuard.json")
const TextChannels = require("../models/Guild.Text.Channels");
const VoiceChannels = require("../models/Guild.Voice.Channels");
module.exports = async (oldMember, newMember) => {
let data = await sunucuayar.findOne({guildID: client.ayarlar.sunucuId});
let entry = await newMember.guild.fetchAuditLogs({type: 'MEMBER_ROLE_UPDATE'}).then(audit => audit.entries.first())
if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await güvenli1(entry.executor.id) || await güvenli2(entry.executor.id) || await güvenli3(entry.executor.id)) return
const permissionStaff = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"];
if (permissionStaff.some(p => oldMember.permissions.has(p) && newMember.permissions.has(p))) {
  Punish(entry.executor.id, "kick");
  let messageLogEmbed = new MessageEmbed()
.setColor("RANDOM")
.setFooter(conf.footer)
.setTimestamp()
.setDescription(`${entry.executor} (**${entry.executor.id}**) üyesi __**${moment(Date.now()).format('LLL')}**__ tarihinde ${newMember} (__${newMember.id}__) üyesine yetki verme/alma işlemi **yaptı.**\`\`\`js
Üye jaile atıldı.\`\`\``)
client.channels.cache.get(data.GUARDChannel).send({embeds: [messageLogEmbed]})
allPermissionClose()
}


};
function güvenli1(kisiID) {
  let uye = client.guilds.cache.get(conf.sunucuId).members.cache.get(kisiID);
  let guvenliler = güvenli.SafeOne || [];
  if (!uye || conf.sahip.some(x => x === uye.id) || uye.id === client.user.id || guvenliler.some(g => uye.id === g.slice(1) || uye.roles.cache.has(g.slice(1)))) return true
  else return false;
};

function güvenli2(kisiID) {
  let uye = client.guilds.cache.get(conf.sunucuId).members.cache.get(kisiID);
  let guvenliler = güvenli.SafeTwo || [];
  if (!uye || conf.sahip.some(x => x === uye.id) || uye.id === client.user.id || guvenliler.some(g => uye.id === g.slice(1) || uye.roles.cache.has(g.slice(1)))) return true
  else return false;
};
function güvenli3(kisiID) {
  let uye = client.guilds.cache.get(conf.sunucuId).members.cache.get(kisiID);
  let guvenliler = güvenli.SafeThree || [];
  if (!uye || conf.sahip.some(x => x === uye.id) || uye.id === client.user.id || guvenliler.some(g => uye.id === g.slice(1) || uye.roles.cache.has(g.slice(1)))) return true
  else return false;
};

function Punish(kisiID, tur) {
  let MEMBER = client.guilds.cache.get(client.ayarlar.sunucuId).members.cache.get(kisiID);
  if (!MEMBER) return;
  if (tur == "ban") return MEMBER.ban({
    reason: "Guard-Neptune"
  }).catch(console.error);;
  if (tur == "kick") return MEMBER.kick().catch(console.error);;
};

