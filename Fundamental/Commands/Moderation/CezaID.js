const { MessageEmbed, Discord } = require("discord.js");
const conf = client.ayarlar

let mongoose = require("mongoose");
let stringTabe = require("string-table");
let sunucuayar = require("../../models/sunucuayar");
let ceza = require("../../models/ceza");
let moment = require("moment");
moment.locale("tr")
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol)   &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)

let target = Number(args[0])
if (!target) return client.Embed(message.channel.id, `Lütfen cezalarına bakmak istediğiniz ID'yi giriniz!`)
await ceza.findOne({ID: target}, async (err, res) => {
    let embed = new MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
.setColor("RANDOM")
.setFooter(conf.footer)
.setDescription(`
${client.emojis.cache.find(x => x.name === "wex_deynek") || "Emoji Bulunamadı"} **${args[0]}** ceza numarasına ait ceza-i işlem resleri; \`\`\`js
=> Kullanıcı:  ${client.users.cache.get(res.userID) ? message.guild.members.cache.get(res.userID).user.tag : "Kullanıcı yasaklı!" }
=> Yetkili: ${client.users.cache.get(res.Yetkili) ? client.users.cache.get(res.Yetkili).tag : res.Yetkili}
=> Tür: ${res.Ceza}
=> Sebep: ${res.Sebep}
=> Başlangıç Tarihi: ${moment(Number(res.Atilma)).format('LLL')}
=> Bitiş Tarihi: ${moment(Number(res.Bitis)).format('LLL')}
=> Ceza = ${res.Sebep == "AFFEDILDI" ? "🔴 (Bitti)" : res.Bitis == "null" ? "🟢 (Devam Ediyor)" : res.Bitis == "KALICI" ? "🟢 (Devam Ediyor)" : Date.now()>=res.Bitis ? "🔴 (Bitti)" : "🟢 (Devam Ediyor)"}\`\`\`
Haksız bir ceza-i işlem oldugunu düşünüyorsanız Üst yetkililerimize yazmaktan çekinmemelisin.`)
await message.channel.send({embeds: [embed]});
})
}
exports.conf = {aliases: ["cezaID"]}
exports.help = {name: 'ceza'}
