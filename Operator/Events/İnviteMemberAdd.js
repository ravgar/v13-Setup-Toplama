const { GuildMember, Collection } = require('discord.js');
const guildInvıte = require("../models/inviterscık")
const sunucuayar = require("../models/sunucuayar")
const Database = require("../models/invite")
const moment = require("moment")
const randMiss = require("../models/randomMission")
const xpData = require("../models/stafxp")
const Stat = require("../models/stats")
const {
  MessageEmbed
} = require("discord.js");

let mongoose = require("mongoose");

module.exports = async member => {
  let inviteChannelID = await sunucuayar.findOne({}).then(x => x.INVITEChannel);
  const channel = client.channels.cache.get(inviteChannelID);
  if (!channel) return console.log("İnvite-Log ayarlanmamış.")
  let entry = await member.guild.fetchAuditLogs({ type: 'BOT_ADD' }).then(audit => audit.entries.first());
  if (member.user.bot && entry) return channel.send({ content: `${member} isimli bot, **${entry.executor.tag}** tarafından \`${member.guild.name}\` sunucusuna davet edildi.` })
  const guildInvites = client.invites.get(member.guild.id) || new Collection()
  const invites = await member.guild.invites.fetch();
  const invite = invites.find((inv) => guildInvites.has(inv.code) && inv.uses > guildInvites.get(inv.code).uses) || guildInvites.find((x) => !invites.has(x.code)) || member.guild.vanityURLCode;
  const cacheInvites = new Collection();
  invites.map((inv) => { cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter }); });
  client.invites.set(member.guild.id, cacheInvites);
  if (invite === null) {
    channel.send({ content: `${client.emojis.cache.find(x => x.name === "wex_succes")} ${member} İsimli üye <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> \`${member.guild.id}\` sunucusuna katıldı fakat kimin davet ettiği **Bulunamadı**.` })
  } else if (invite === undefined) {
    channel.send({ content: `${client.emojis.cache.find(x => x.name === "wex_succes")} ${member} İsimli üye <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> \`${member.guild.id}\` sunucusuna katıldı fakat kimin davet ettiği **Bulunamadı**.` })
  } else if (!invite) {
    channel.send({ content: `${client.emojis.cache.find(x => x.name === "wex_succes")} ${member} İsimli üye <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> \`${member.guild.id}\` sunucusuna katıldı fakat kimin davet ettiği **Bulunamadı**.` })
  } else if (invite === member.guild.vanityURLCode) {
    await guildInvıte.findOneAndUpdate({ userID: member.user.id }, { $set: { Inviter: member.guild.id } }, { upsert: true });
    return channel.send({ content: `${client.emojis.cache.find(x => x.name === "wex_succes")} ${member} İsimli üye <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> \`${member.guild.id}\` sunucusuna **Özel URL** davetiyle katıldı.` })

  } else {
    let inviteOwn = member.guild.members.cache.get(invite.inviter.id);
    if (Date.now()-member.user.createdTimestamp <= 1000*60*60*24*7) {

      await Database.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { fake: 1 } }, { upsert: true })


      channel.send({ content: `${client.emojis.cache.find(x => x.name === "wex_succes")} ${member} İsimli üye <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> \`${member.guild.id}\` sunucusuna **${invite.inviter.tag}** davetiyle katıldı.` });
      await guildInvıte.findOneAndUpdate({ userID: member.user.id }, { $set: { Inviter: invite.inviter.id } }, { upsert: true });
    } else {      
        await Database.findOneAndUpdate({ guildID: member.guild.id, userID: invite.inviter.id }, { $inc: { regular: 1 } }, { upsert: true })

        Stat.updateMany({
          userID: invite.inviter.id,
          guildID: client.ayarlar.sunucuId
        }, {
          $inc: {
            "yedi.Invite": 1
          }
          
        }).exec((err, res) => {
          if (err) console.error(err);
        });
        client.dailyMission(invite.inviter.id, "davet", 1)
        client.easyMission(invite.inviter.id, "davet", 1);

            channel.send({ content: `${client.emojis.cache.find(x => x.name === "wex_succes")} ${member} İsimli üye <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> \`${member.guild.id}\` sunucusuna **${invite.inviter.tag}** davetiyle katıldı.` });
            let gorev = await randMiss.findOne({userID: invite.inviter.id }) 
            if(!gorev) return;
            if(gorev.Mission.MISSION == "davet" && gorev.Active === true && gorev.Check >= gorev.Mission.AMOUNT){
            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${invite.inviter} adlı üye **${moment(Date.now()).locale('tr').format("LLL")}** tarihinde **TASK III (DAVET GÖREVİ)** görevini tamamladı, **${gorev.Mission.Reward}** puan ödülü üyeye eklendi.`)
            .setAuthor(invite.inviter.tag, invite.inviter.displayAvatarURL({
              dynamic: true
            }))
            client.channels.cache.find(x => x.name == "görev-log").send({embeds: [embed]})
            xpData.updateOne({userID: invite.inviter.id}, {$inc: {currentXP: gorev.Mission.Reward}}, {upsert: true}).exec();
            randMiss.updateOne({userID: invite.inviter.id}, {$set: { Active: false }}, {upsert: true}).exec()
            }
       
    }
  }
}
