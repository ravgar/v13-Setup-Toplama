
const {
  MessageEmbed
} = require("discord.js");
const conf = require("../../settings")
const sunucuayar = require("../models/sunucuayar")
const moment = require("moment")
const güvenli = require("../../SafeGuard.json")
const TextChannels = require("../models/Guild.Text.Channels");
const VoiceChannels = require("../models/Guild.Voice.Channels");
module.exports = async (oldChannel, newChannel) => {
let data = await sunucuayar.findOne({guildID: client.ayarlar.sunucuId});
let entry = await newChannel.guild.fetchAuditLogs({type: 'CHANNEL_UPDATE'}).then(audit => audit.entries.first())
if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await güvenli1(entry.executor.id) ||  await güvenli2(entry.executor.id)) return
Punish(entry.executor.id, "kick");
let messageLogEmbed = new MessageEmbed()
.setColor("RANDOM")
.setFooter(conf.footer)
.setTimestamp()
.setDescription(`${entry.executor} (**${entry.executor.id}**) üyesi __**${moment(Date.now()).format('LLL')}**__ tarihinde \`${newChannel.name}\` (**${newChannel.id}**) isimli kanalı **güncelledi.**\`\`\`js
Üye sunucudan atıldı güncellediği kanalın eski izinler yeniden izinleri ayarlandı.\`\`\``)
client.channels.cache.get(data.GUARDChannel).send({embeds: [messageLogEmbed]})
if (newChannel.type !== "GUILD_CATEGORY" && newChannel.parentId !== oldChannel.parentId) newChannel.setParent(oldChannel.parentId);
if (newChannel.type === "GUILD_CATEGORY") {
  await newChannel.edit({
    position: oldChannel.position,
    name: oldChannel.name,
  });
} else if (newChannel.type === "GUILD_TEXT" || (newChannel.type === 'GUILD_NEWS')) {
  await newChannel.edit({
    name: oldChannel.name,
    position: oldChannel.position,
    topic: oldChannel.topic,
    nsfw: oldChannel.nsfw,
    rateLimitPerUser: oldChannel.rateLimitPerUser,
  });
} else if (newChannel.type === "GUILD_VOICE") {
  await newChannel.edit({
    name: oldChannel.name,
    position: oldChannel.position,
    bitrate: oldChannel.bitrate,
    userLimit: oldChannel.userLimit,
  });
};
allPermissionClose()

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

