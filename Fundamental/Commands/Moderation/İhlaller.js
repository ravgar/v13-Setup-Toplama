const { MessageEmbed, Discord } = require("discord.js");
const conf = client.ayarlar
let ceza = require("../../models/ceza");
let moment = require("moment");
require("moment-timezone");
const sunucuayar = require("../../models/sunucuayar")
moment.locale("tr")
const { table } = require('table');
const ms = require("ms")
require("moment-duration-format")
const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")

module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.BANAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
        await ceza.find({ userID: target.id }).sort({ ihlal: "descending" }).exec(async (err, res) => {
        let datax = [
            ["ID", "Tarih", "Ceza", "Sebep"]
        ];

        let dataxe = [
            ["ID", "Ceza", "Tarih", "Bitiş", "Yetkili", "Sebep"]
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

                bodyLeft: `│`,
                bodyRight: `│`,
                bodyJoin: `│`,

                joinBody: ``,
                joinLeft: ``,
                joinRight: ``,
                joinJoin: ``
            }
        };
        res.map(x => {
            datax.push([x.ID, moment(Number(x.Atilma)).locale("tr").format("LLL"), x.Ceza, x.Sebep])
        })
        let cezaSayi = datax.length - 1
        if(cezaSayi == 0) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} ${target} kullanıcısının ceza bilgisi bulunmuyor.`, message.author, message.channel)

        res.map(x => {
            dataxe.push([x.ID, x.Ceza, moment(Number(x.Atilma)).locale("tr").format("LLL"), moment(Number(x.Bitis)).locale("tr").format("LLL"), client.users.cache.get(x.Yetkili).tag, x.Sebep])
        })

        let out = table(dataxe, config)
        let outi = table(datax.slice(0, 15), config)
        const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('CezaDosya')
            .setLabel("Ceza Bilgi Dosyası")
            .setEmoji("🚫")
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('CANCEL')
            .setLabel("İptal")
            .setStyle('DANGER'),
        );
        let msg = await message.channel.send({ components: [row], content: "<@" + target.id + "> kullanıcısının toplam " + cezaSayi + " cezası bulunmakta son 15 ceza aşağıda belirtilmiştir. Tüm ceza bilgi dosyasını indirmek için 🚫 emojisine basabilirsin.Tekli bir cezaya bakmak için `.ceza ID` komutunu uygulayınız. ```js\n" + outi + "\n``` " })
        var filter = (button) => button.user.id === message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 })

        collector.on('collect', async (button) => {
            if (button.customId === "CezaDosya") {
            row.components[0].setDisabled(true) 
            msg.edit({ components: [row] }); 
            button.reply({content: `${target} kullanıcısının toplam ${datax.length - 1} cezası aşağıdaki belgede yazmaktadır.`, ephemeral: true,  files: [{ attachment: Buffer.from(out), name: `${target.user.username}_cezalar.txt` }] })
           
        } else if (button.customId === "CANCEL") {
            row.components[0].setDisabled(true) 
            row.components[1].setDisabled(true) 
            msg.edit({ components: [row] }); 
            
            button.reply({ content: "İşlem iptal edildi!", ephemeral: true })


        }
        })  
        collector.on('end', async (button, reason) => {
            row.components[0].setDisabled(true) 
            row.components[1].setDisabled(true) 
            row.components[2].setDisabled(true) 
            msg.edit({ components: [row] }); 
            
        })


        })

    

}
exports.conf = {aliases: ["sicil", "Cezalar", "Sicil"]}
exports.help = {name: 'cezalar'}

Date.prototype.toTurkishFormatDate = function () {
    return moment.tz(this, "Europe/Istanbul").format('LLL');
  };