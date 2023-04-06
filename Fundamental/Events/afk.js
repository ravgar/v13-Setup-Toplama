const { MessageEmbed, Discord } = require("discord.js");
let mongoose = require("mongoose");
let afk = require("../models/afk")
let moment = require("moment");
require("moment-duration-format");
moment.locale("tr")

module.exports = async message => {
    if(!message.guild) return;
    if (message.author.bot) return;

    let userData = await afk.findOne({userID: message.author.id, guildID: message.guild.id}) || {Reason: null, Time: null};

    let afkReason = userData.Reason;
    if (afkReason) {
      let ha = moment(userData.Time).fromNow()
      message.channel.send({embeds: [new MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})).setDescription(`${client.emojis.cache.find(x => x.name == "wex_succes")} Hey <@${userData.userID}> Başarılı bir şekilde afk modundan çıkış yaptın <t:${Math.floor(Math.floor(userData.Time) / 1000)}:R> afk olmuşsun.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
      let nicke = message.member.displayName.replace("[AFK]", "")
      await message.member.setNickname(nicke)
      afk.deleteOne({userID: message.author.id, guildID: message.guild.id}).exec();
    }
    message.mentions.members.forEach(async (u) => {
      let userData = await afk.findOne({userID: u.id, guildID: message.guild.id}) || {Reason: null, Time: null};
      let ha = moment(userData.Time).fromNow()
      if (userData.Reason) {
        message.channel.send({embeds: [new MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})).setDescription(`${client.emojis.cache.find(x => x.name == "wex_afk")} <@${userData.userID}> isimli üye <t:${Math.floor(Math.floor(userData.Time) / 1000)}:R>, \`${userData.Reason}\` sebebiyle afk modune geçiş yaptı.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
      }
    });
    
}
