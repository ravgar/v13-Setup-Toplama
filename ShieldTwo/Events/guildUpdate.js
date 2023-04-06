
const {
  MessageEmbed
} = require("discord.js");
const conf = require("../../settings")
const sunucuayar = require("../models/sunucuayar")
const moment = require("moment")
const güvenli = require("../../SafeGuard.json")
const TextChannels = require("../models/Guild.Text.Channels");
const VoiceChannels = require("../models/Guild.Voice.Channels");
module.exports = async (oldGuild, newGuild) => {
let data = await sunucuayar.findOne({guildID: client.ayarlar.sunucuId});
let entry = await newGuild.guild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first())
if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await güvenli1(entry.executor.id) || await güvenli2(entry.executor.id)) return
Punish(entry.executor.id, "kick");
if (newGuild.name !== oldGuild.name) await newGuild.setName(oldGuild.name);
if (newGuild.iconURL({dynamic: true, size: 2048}) !== oldGuild.iconURL({dynamic: true, size: 2048})) await newGuild.setIcon(oldGuild.iconURL({dynamic: true, size: 2048}));
if (oldGuild.banner !== newGuild.banner) await newGuild.setBanner(oldGuild.bannerURL({ size: 4096 }));
if (newGuild.vanityURLCode && (newGuild.vanityURLCode !== oldGuild.vanityURLCode)) {
    request({method: "PATCH", url: `https://discord.com/api/guilds/${newGuild.id}/vanity-url`,
        headers: { "Authorization": `Bot ${client.token}` },
        json: { "code": oldGuild.vanityURLCode }
    });
}
let messageLogEmbed = new MessageEmbed()
.setColor("RANDOM")
.setFooter(conf.footer)
.setTimestamp()
.setDescription(`${entry.executor} (**${entry.executor.id}**) üyesi __**${moment(Date.now()).format('LLL')}**__ tarihinde sunucu ayarlarını **güncelledi.**\`\`\`js
Üye sunucudan atıldı.\`\`\``)
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

function allPermissionClose() {
  let sunucu = client.guilds.cache.get(client.ayarlar.sunucuId);
  if(!sunucu) return;
  const perms = ["ADMINISTRATOR", "MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGE_GUILD", "BAN_MEMBERS", "KICK_MEMBERS", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "MANAGE_WEBHOOKS"];
  sunucu.roles.cache.filter(rol => rol.editable).filter(rol => perms.some(yetki => rol.permissions.has(yetki))).forEach(async (rol) => rol.setPermissions(0n));
}
