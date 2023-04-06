const { GuildMember, Collection } = require('discord.js');
const guildInvıte = require("../models/inviterscık")
const Stat = require("../models/stats")
const Database = require("../models/invite")
const sunucuayar = require("../models/sunucuayar")
module.exports = async member => {
  let inviteChannelID = await sunucuayar.findOne({}).then(x => x.INVITEChannel);
  const channel = client.channels.cache.get(inviteChannelID);
  if (!channel) return;
 if (member.user.bot) return channel.send({ content: `**${member.user.tag}** isimli bot, sunucumuzdan ayrıldı!` })
  const inviteMemberData = await guildInvıte.findOne({ userID: member.user.id }) || [];
  if (!inviteMemberData.Inviter) {
    return channel.send({ content: `${client.emojis.cache.find(x => x.name === "wex_cancel")} ${member} İsimli üye <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> \`${member.guild.id}\` sunucusundan ayrıldı **Bulunamadı** ile katılmıştı.` });
  } else if (inviteMemberData.Inviter === member.guild.id) {
    const inviterData = await guildInvıte.findOne({ guildID: member.guild.id, userID: member.guild.id })
    return channel.send({ content: `${client.emojis.cache.find(x => x.name === "wex_cancel")} ${member} İsimli üye <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> \`${member.guild.id}\` sunucusundan ayrıldı **Özel URL** ile katılmıştı.` });
  } else {
    if (Date.now()-member.user.createdTimestamp <= 1000*60*60*24*7) {
      const inviter = await client.users.fetch(inviteMemberData.Inviter);
      const inviterData = await guildInvıte.findOne({ guildID: member.guild.id, userID: inviter.id, });
      await Database.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { fake: -1 } }, { upsert: true })
      return channel.send({ content: `${client.emojis.cache.find(x => x.name === "wex_cancel")} ${member} İsimli üye <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> \`${member.guild.id}\` sunucusundan ayrıldı ****${inviter.tag}**** sayesinde katılmıştı.` })
    } else {
      let inviteOwn = member.guild.members.cache.get(inviteMemberData.Inviter);
      const inviter = await client.users.fetch(inviteMemberData.Inviter);
      const ivSync = await guildInvıte.findOne({ guildID: member.guild.id, userID: inviter.id, });
      if (ivSync) await guildInvıte.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id}, { upsert: true });
      const inviterData = await guildInvıte.findOne({ guildID: member.guild.id, userID: inviter.id, });
      Stat.updateMany({
        userID: inviter.id,
        guildID: client.ayarlar.sunucuId
      }, {
        $inc: {
          "yedi.Invite": -1
        }
      }).exec((err, res) => {
        if (err) console.error(err);
      })
      await Database.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { regular: -1 } }, { upsert: true })
      return channel.send({ content: `${client.emojis.cache.find(x => x.name === "wex_cancel")} ${member} İsimli üye <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> \`${member.guild.id}\` sunucusundan ayrıldı ****${inviter.tag}**** sayesinde katılmıştı.` });
    }
  }
}
