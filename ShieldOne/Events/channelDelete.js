
const {
  MessageEmbed
} = require("discord.js");
const conf = require("../../settings")
const sunucuayar = require("../models/sunucuayar")
const moment = require("moment")
const güvenli = require("../../SafeGuard.json")
const catagory = require('../models/catagory');
const sesChannels = require('../models/sesChannels');
const yaziChannels = require('../models/yaziChannels');
module.exports = async channel => {
let data = await sunucuayar.findOne({guildID: client.ayarlar.sunucuId});
let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first())
if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await güvenli1(entry.executor.id)) return
Punish(entry.executor.id, "kick");
let messageLogEmbed = new MessageEmbed()
.setColor("RANDOM")
.setFooter(conf.footer)
.setTimestamp()
.setDescription(`${entry.executor} (**${entry.executor.id}**) üyesi __**${moment(Date.now()).format('LLL')}**__ tarihinde \`${channel.name}\` (**${channel.id}**) isminde bir kanal **sildi.**\`\`\`js
Üye sunucudan atıldı sildiği kanal oluşturulup izinleri ayarlandı.\`\`\``)
client.channels.cache.get(data.GUARDChannel).send({embeds: [messageLogEmbed]})
let yenikanal;
if ((channel.type === "GUILD_TEXT") || (channel.type === "GUILD_NEWS")) {
    yenikanal = await channel.guild.channels.create(channel.name, {
        type: channel.type,
        topic: channel.topic,
        nsfw: channel.nsfw,
        parent: channel.parent,
        position: channel.position + 1,
        rateLimitPerUser: channel.rateLimitPerUser
    })
}

if (channel.type === 'GUILD_VOICE') {
    yenikanal = await channel.guild.channels.create(channel.name, {
        type: channel.type,
        bitrate: channel.bitrate,
        userLimit: channel.userLimit,
        parent: channel.parent,
        position: channel.position + 1
    });
}

if (channel.type === 'GUILD_CATEGORY') {
    yenikanal = await channel.guild.channels.create(channel.name, {
        type: channel.type,
        position: channel.position + 1
    });

    const textChannels = await yaziChannels.find({ parentID: channel.id });
    await TextChannels.updateMany({ parentID: channel.id }, { parentID: yenikanal.id });
    textChannels.forEach(c => {
        const textChannel = channel.guild.channels.cache.get(c.channelID);
        if (textChannel) textChannel.setParent(yenikanal, { lockPermissions: false });
    });
    const voiceChannels = await sesChannels.find({ parentID: channel.id });
    await VoiceChannels.updateMany({ parentID: channel.id }, { parentID: yenikanal.id });
    voiceChannels.forEach(c => {
        const voiceChannel = channel.guild.channels.cache.get(c.channelID);
        if (voiceChannel) voiceChannel.setParent(yenikanal, { lockPermissions: false });
    });
};

channel.permissionOverwrites.cache.forEach(perm => {
    let thisPermOverwrites = {};
    perm.allow.toArray().forEach(p => {
        thisPermOverwrites[p] = true;
    });
    perm.deny.toArray().forEach(p => {
        thisPermOverwrites[p] = false;
    });
    yenikanal.permissionOverwrites.create(perm.id, thisPermOverwrites);
});
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

