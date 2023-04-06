const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let yetkiDATA = require("../../models/yetkili");
const hanedan = require("../../models/hanedanlik");
let Stat2 = require("../../models/stats");
const Users = require("../../models/yetkilial")
let limit = new Map();
const moment = require("moment");
module.exports.run = async (client, message, args, durum, kanal) => {
    let Server = await sunucuayar.findOne({ guildID: message.guild.id })
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(Server.EnAltYetkiliRol) && !Server.YetkiliAlım.some(rol => message.member.roles.cache.has(rol))  &&!Server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return;
    let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member 
    let ytVeri = await Users.find({ Auth: member.id })
    let listed = ytVeri.reverse();

    if(!ytVeri) return message.reply("Database'de kayıtlı veri bulunamadı.")
    let History2 = listed.map((x, index) => `\n \`${index + 1}.\` <@${(x.userID)}> (\`${x.userID}\` ${dateToUnixEpoch (x.Time)} ${x.Enabled == true ? "🟢 (Hala Yetkili)" : x.Enabled == "null" ? "🔴 (Yetkiden Ayrılmış)" : "🔴 (Yetkiden Ayrılmış)"}`).slice(0,20) 

        return message.reply({ embeds: [Embed.setDescription(`Yetki verdiğin son 20 üye aşağıda listelenmiştir.
        ─────────────────────────────
   ${History2}\n\nİşlemde herhangi bir hata oldugunu düşünüyorsan Ownerlara yazmaktan çekinme. `)] });
    }


exports.conf = {
    aliases: ["Yetkili-listem", "yetkililistem"]
}
exports.help = {
    name: 'yetkili-liste'
}
function dateToUnixEpoch(date) {
    return `<t:${Math.floor(Math.floor(date) / 1000)}:R>`
  }