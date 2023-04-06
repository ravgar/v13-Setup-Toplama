const Discord = require('discord.js');
const {
  MessageEmbed
} = require("discord.js");
const rolesm = require("../../models/roles")
const conf = require("../../../settings")
exports.run = async function(client, message, params) {
  if (!message.guild) return
  let roles = await rolesm.findOne({guildID: message.guild.id, roleID: args[0]})
  let newRole = message.guild.roles.cache.get(roles)
  if(!newRole || newRole == undefined){
      newRole = await message.guild.roles.create({
          permissions: roles.permissions,
          color: Number(roles.color) ? Number(roles.color): roles.color,
          hoist: roles.hoist,
          mentionable: roles.mentionable,
          name: roles.name
      }).then(x => x.setPosition(roles.position))
  }
  let membersCount = roles.members.length
  let clientsCount = global.tokens.length
  let countUser = membersCount % clientsCount
  let perUser = Math.floor(membersCount/clientsCount);
  let messages = `**${message.member.user.tag}** \`(${message.member.id})\` tarafından, <@&${newRole.id}> rol oluşturuldu! **${clientsCount}** adet bot **${membersCount}** adet üyeye rolleri geri dağıtılmaya başlandı! \n(Ortalama Gerçekleşecek Süre: **${(membersCount > 1000 ? parseInt((membersCount * (250 / 1000)) / 60) + " dakika" : parseInt(membersCount * (250 / 1000)) + " saniye")}**)`
  message.channel.send({embeds: [new MessageEmbed().setDescription(messages)]})
  setTimeout(() => {
      let kanalPermVeri = roles.channelOverwrites;
      if (kanalPermVeri) kanalPermVeri.forEach((perm, index) => {
          let kanal = message.guild.channels.cache.get(perm.channelid);
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
  let members = roles.members
  dagit(newRole.id, members)

};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kur'],
  permLevel: 4
};

exports.help = {
  name: 'rolkur',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};

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
