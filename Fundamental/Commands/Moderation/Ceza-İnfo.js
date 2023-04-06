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
if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.JAILAuthorized.some(rol => message.member.roles.cache.has(rol)) &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)

        
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let data = await ceza.find({userID: target.id}).then(x => x)
        if (!target) return client.Embed(message.channel.id, `Lütfen cezalarına bakmak istediğiniz kullanıcıyı etiketleyiniz!`)
let jailBilgi = data.filter(x => x.userID == target.id && x.Ceza == "JAIL").map(data => `
${data.Sebep == "AFFEDILDI" ? "Veri tabanında cezalı bilgisi bulunmamakta" : `Cezalandıran Yetkili: <@${data.Yetkili}> (\`${data.Yetkili}\`)
Cezalandırma Tarihi: \`${moment(Number(data.Atilma)).format("LLL")}\`
Bitiş Tarihi: \`${data.Bitis == "KALICI" ? "KALICI" : moment(Number(data.Bitis)).format("LLL")}\`
Ceza Sebebi: \`${data.Sebep}\``}
`).reverse()[0]


let chatMuteBilgi = data.filter(x => x.userID == target.id && Date.now()<Number(x.Bitis) && x.Ceza == "MUTE").map(data => `
Cezalandıran Yetkili: <@${data.Yetkili}> (\`${data.Yetkili}\`)
Cezalandırma Tarihi: \`${moment(Number(data.Atilma)).format("LLL")}\`
Bitiş Tarihi: \`${moment(Number(data.Bitis)).format("LLL")}\`
Ceza Sebebi: \`${data.Sebep}\`
`).reverse()[0]

let sesMuteBilgi = data.filter(x => x.userID == target.id && Date.now()<Number(x.Bitis) && x.Ceza == "SES MUTE").map(data => `
Cezalandıran Yetkili: <@${data.Yetkili}> (\`${data.Yetkili}\`)
Cezalandırma Tarihi: \`${moment(Number(data.Atilma)).format("LLL")}\`
Bitiş Tarihi: \`${moment(Number(data.Bitis)).format("LLL")}\`
Ceza Sebebi: \`${data.Sebep}\`
`).reverse()[0]

let embed = new MessageEmbed()
.setColor("RANDOM")
.setTimestamp()
.setFooter(conf.footer)
.setAuthor(target.user.tag, target.user.displayAvatarURL({dynamic: true}))
.addField(`Cezalı Bilgisi:`, `${jailBilgi ? jailBilgi : "Veri tabanında cezalı bilgisi bulunmamakta"}`)
.addField(`Chat Mute Bilgisi:`, `${chatMuteBilgi ? chatMuteBilgi : "Veri tabanında cezalı bilgisi bulunmamakta"}`)
.addField(`Ses Mute Bilgisi`, `${sesMuteBilgi ? sesMuteBilgi : "Veri tabanında cezalı bilgisi bulunmamakta"}`)

    await message.channel.send({embeds:[embed]});
}
exports.conf = {aliases: ["cezabilgi", "CezaBilgi", "Cezabilgi"]}
exports.help = {name: 'ceza-bilgi'}
