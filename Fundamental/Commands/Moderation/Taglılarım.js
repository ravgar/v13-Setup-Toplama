const { MessageEmbed, Discord } = require("discord.js");
const conf = client.ayarlar
let ceza = require("../../models/ceza");
let moment = require("moment");
require("moment-timezone");
let sunucuayar = require("../../models/sunucuayar");
moment.locale("tr")
const { table } = require('table');
const ms = require("ms")
require("moment-duration-format")
const Users = require("../../models/UsersTaglı")
const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")

module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.BANAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        Users.find({ execID: target.id }).exec(async (err, res) => {
            
            let datax = [
            ["•", "Kullanıcı Tag", "Tarih"]
        ];


        let config = {
            border: {
                topBody: ``,
                topJoin: ``,
                topLeft: ``,
                topRight: ``,

                bottomBody: ``,
                bottomJoin: ``,
                bottomLeft: ``,
                bottomRight: ``,

                bodyLeft: ``,
                bodyRight: ``,
                bodyJoin: `│`,

                joinBody: ``,
                joinLeft: ``,
                joinRight: ``,
                joinJoin: ``
            }
        };
        let veri = await Users.findOne({ Taggeds: { $elemMatch: { execID: target.id } } })
        let toplam = datax.length
        if(!veri) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} ${target} üyesine ait taglı verisine rastlamadım.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))

        veri.Taggeds.filter(e => e.execID === target.id).map(x => {
            datax.push(["•", message.guild.members.cache.get(x.userID) ? message.guild.members.cache.get(x.userID).user.tag : x.userID,  moment(Number(x.date)).locale("tr").format("LLL")])
        })

        let outi = table(datax.slice(0, 15), config)
        let zortEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.tag, message.author.avatarURL({
        dynamic: true
    }))
    .setDescription(`${target} Üyesinin Taglı olarak kaydettiği kullanıcılar aşşağıda listelenmiştir.\`\`\`js\n${outi}\`\`\`Listede hatalı bir yer oldugunu oldugunu düşünüyorsanız Üst yetkililerimize yazmaktan çekinmemelisin.
    `)

        let msg = await message.channel.send({ embeds: [zortEmbed]})

        })

    

}
exports.conf = {aliases: ["taglılarım"]}
exports.help = {name: 'taglist'}

Date.prototype.toTurkishFormatDate = function () {
    return moment.tz(this, "Europe/Istanbul").format('LLL');
  };