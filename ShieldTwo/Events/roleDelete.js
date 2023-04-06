
const {
  MessageEmbed
} = require("discord.js");
const conf = require("../../settings")
const sunucuayar = require("../models/sunucuayar")
const moment = require("moment")
const roles = require('../models/roles');
const güvenli = require("../../SafeGuard.json")
module.exports = async role => {
let data = await sunucuayar.findOne({guildID: client.ayarlar.sunucuId});
let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first())
if(!entry || !entry.executor || entry.createdTimestamp <= Date.now() - 5000 || await güvenli1(entry.executor.id)) return
Punish(entry.executor.id, "kick");
let newRole = await role.guild.roles.create({
  name: role.name,
  color: role.hexColor,
  hoist: role.hoist,
  position: role.rawPosition,
  permissions: role.permissions,
  mentionable: role.mentionable,
})

roles.findOne({guildID: role.guild.id, roleID: role.id}, async(err, res) => {
    if(!res) return;
    setTimeout(() => {
        let kanalPermVeri = res.channelOverwrites;
        if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
            let kanal = role.guild.channels.cache.get(perm.channelid);
            if(!kanal) return
          setTimeout(() => {
            let yeniKanalPermVeri = {};
            perm.allow.forEach(p => {
              yeniKanalPermVeri[p] = true;
            });
            perm.deny.forEach(p => {
              yeniKanalPermVeri[p] = false;
            });
            kanal.permissionOverwrites.create(newRole, yeniKanalPermVeri).catch(error => console.log(error));
          }, index*300);
        });
    }, 500)

    let roleMembers = res.members;
   dagit(newRole.id, roleMembers);
})

let messageLogEmbed = new MessageEmbed()
.setColor("RANDOM")
.setFooter(`.rolkur ${role.id} komutu ile rolü tekrardan kur.`)
.setTimestamp()
.setDescription(`${entry.executor} (**${entry.executor.id}**) üyesi __**${moment(Date.now()).format('LLL')}**__ tarihinde  ${role.name} (__${role.id}__)  isimli rolü **sildi.**\n**NOT:** Rol otomatik olarak kurulmaya başlandı.\`\`\`js
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

async function dagit(role, rMembers) {
  
  for (let i = 0; i < rMembers.length; i++) {
    const cle = conf.SHIELDHELPERS[Math.floor(Math.random() * conf.SHIELDHELPERS.length)];
    cle.user.setPresence({acitivies: [{name: conf.readyFooter}], status: "idle"})
    const guild = cle.guilds.cache.get(conf.sunucuId);
    const rolee = guild.roles.cache.find((r) => r.id === role); if (!rolee) return;
    const member = guild.members.cache.find((x) => x.id === rMembers[i]); if (!member) return;
    member.roles.add(rolee).catch(() => {});
    await new Promise((r) => setTimeout(r, 250));
    if(i > rMembers.length && i == rMembers.length){
      cle.user.setPresence({ status: "idle"})
    }
  };
}        
