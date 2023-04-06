
const {
  MessageEmbed
} = require("discord.js");
const conf = require("../../settings")
const sunucuayar = require("../models/sunucuayar")
const moment = require("moment")
const güvenli = require("../../SafeGuard.json")
module.exports = async (oldRole, newRole)  => {
let data = await sunucuayar.findOne({guildID: client.ayarlar.sunucuId});
let entry = await oldRole.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await güvenli1(entry.executor.id)) return
Punish(entry.executor.id, "kick");
let messageLogEmbed = new MessageEmbed()
.setColor("RANDOM")
.setFooter(conf.footer)
.setTimestamp()
.setDescription(`${entry.executor} (**${entry.executor.id}**) üyesi __**${moment(Date.now()).format('LLL')}**__ tarihinde \`${oldRole.name}\` isminli rolü **güncelledi.**\`\`\`js
Üye sunucudan atıldı.\`\`\``)
allPermissionClose()
client.channels.cache.get(data.GUARDChannel).send({embeds: [messageLogEmbed]})
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

function Punish(kisiID, tur) {
  let MEMBER = client.guilds.cache.get(client.ayarlar.sunucuId).members.cache.get(kisiID);
  if (!MEMBER) return;
  if (tur == "ban") return MEMBER.ban({
    reason: "Guard-Neptune"
  }).catch(console.error);;
  if (tur == "kick") return MEMBER.kick().catch(console.error);;
};

function allPermissionClose() {
  let sunucu = client.guilds.cache.get(client.ayarlar.sunucuId);
  if(!sunucu) return;
  const perms = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"];
  sunucu.roles.cache.filter(rol => rol.editable).filter(rol => perms.some(yetki => rol.permissions.has(yetki))).forEach(async (rol) => rol.setPermissions(0n));
}