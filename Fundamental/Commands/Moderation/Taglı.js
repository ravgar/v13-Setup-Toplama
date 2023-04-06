const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let taglıData = require("../../models/taglıUye");
let Stat = require("../../models/stats");
const xpData = require("../../models/stafxp")
const moment = require("moment")
const randMiss = require("../../models/randomMission")
const hanedan = require("../../models/hanedanlik");
const Users = require("../../models/UsersTaglı")
let limit = new Map();
const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    

    let data = await sunucuayar.findOne({})
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.BANAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return  message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
        if (target.id === message.author.id) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Kendini taglı olarak kayıt edemezsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
		if (!target.user.username.includes(data.TAG)) return  message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Belirttiğin üye sunucu tagımızı kullanıcı adına eklememiş. (\`${data.TAG}\`)`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
        let Zort = new MessageEmbed().setFooter(conf.footer).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("BLUE");
        let veri = await Users.findOne({ Taggeds: { $elemMatch: { userID: target.id } } })
        if (veri && veri.Taggeds.filter(e => e.userID === target.id)) {
            let Yetkili = `${(veri.Taggeds.filter(e => e.userID === target.id).map(e => (e.execID)))}`
            return message.reply({ embeds: [Zort.setDescription(`Belirttiğin kullanıcı başka bir yetkili tarafından taglı olarak kayıt edilmiş detaylı bilgilendirme aşağıda yazmaktadır.
            \`\`\`js\nYetkili => ${(veri.Taggeds.filter(e => e.userID === target.id).map(e => (message.guild.members.cache.get(e.execID) ? message.guild.members.cache.get(e.execID).user.tag : e.execID)))} (${(veri.Taggeds.filter(e => e.userID === target.id).map(e => (e.execID)))})\nTarih => ${(veri.Taggeds.filter(e => e.userID === target.id).map(e => moment(e.date).locale("tr").format("LLL")))}\`\`\`İşlemde herhangi bir hata oldugunu düşünüyorsan Ownerlara yazmaktan çekinme. `)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
        } else {
            let embed = new MessageEmbed().setFooter(conf.footer).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("BLUE");
        let embed2 = new MessageEmbed().setFooter(conf.footer).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RED");
        let embed3 = new MessageEmbed().setFooter(conf.footer).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("GREEN");
        const row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId('onaylatagli').setLabel(`Onayla`).setStyle('SUCCESS'),
        new MessageButton().setCustomId('reddettagli').setLabel(`Reddet`).setStyle('DANGER'),)
        let msg = await message.channel.send({ components: [row], content: `${target}`, embeds: [embed.setDescription(`Hey ${target}, ${message.author} adlı yetkili seni taglı olarak kaydetmek istiyor onaylamak veya reddetmek için butonları kullanman yeterli.`)] })
        var filter = (button) => button.user.id === target.id;
        const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
        collector.on('collect', async (button, user) => {      
        if(button.customId === "onaylatagli") {
            client.channels.cache.find(a => a.name === "tag-log").send(`${client.emojis.cache.find(x => x.name === "wex_tik") || "Emoji Bulunamadı"} ${message.author} adlı yetkili ${target} adlı üyeyi taglı olarak kaydetti.`)
            await Users.findOneAndUpdate({ execID: message.author.id }, { $push: { Taggeds: { execID: message.author.id, userID: target.id, date: Date.now() } } }, { upsert: true });
                           hanedan.findOne({userID: message.author.id, guildID:client.ayarlar.sunucuId}, (err, hanedanData) => {
                        if (!hanedanData) return;
                        hanedan.updateOne({userID: message.author.id, guildID: client.ayarlar.sunucuId}, {
                          $inc: {
                            [`Taglı`]: 1,
                          }
                        }, {upsert: true}).exec()
                    });
                    await taglıData.updateOne({
                        userID: target.id,
                        Durum: "puan"
                    }, {
                        authorID: message.author.id
                    }, {
                        upsert: true
                    }).exec();
                    Stat.updateOne({userID: message.author.id, guildID: message.guild.id},  { $inc: { "yedi.TagMember": 1 } }, {upsert: true})
					Stat.updateOne({userID: message.author.id, guildID: message.guild.id}, {$inc: {["coin"]: 30}}, {upsert: true}).exec();
                    await client.easyMission(message.author.id, "taglı", 1);
                    await client.dailyMission(message.author.id, "taglı", 1)
await baddAudit(message.author.id, 1)
            msg.delete()
            button.channel.send({embeds: [embed3.setDescription(`${client.emojis.cache.find(x => x.name === "wex_tik") || "Emoji Bulunamadı"} ${target} adlı üye onu taglı olarak kaydetmeni onayladı.`)] }), message.react(`${client.emojis.cache.find(x => x.name === "wex_tik")}`)
            let gorev = await randMiss.findOne({ userID: message.author.id }) 
            if(gorev.Mission.MISSION == "taglı" && gorev.Active === true && gorev.Check >= gorev.Mission.AMOUNT){
            let embed = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`${message.author} adlı üye **${moment(Date.now()).locale('tr').format("LLL")}** tarihinde **TASK IV (TAGLI GÖREVİ)** görevini tamamladı, **${gorev.Mission.Reward}** puan ödülü üyeye eklendi.`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL({
              dynamic: true
            }))
            client.channels.cache.find(x => x.name == "görev-log").send({embeds: [embed]})
            xpData.findOneAndUpdate({userID: message.author.id}, {$inc: {currentXP: gorev.Mission.Reward}}, {upsert: true}).exec();
            randMiss.findOneAndUpdate({userID: message.author.id}, {$set: { Active: false }}, {upsert: true}).exec()
            }
        }
        if(button.customId === "reddettagli") { 
        msg.delete()
        button.channel.send({embeds: [embed2.setDescription(`${client.emojis.cache.find(x => x.name === "wex_carpi") || "Emoji Bulunamadı"} ${target} adlı üye onu taglı olarak kaydetmeni reddetti.`)] }), message.react(`${client.emojis.cache.find(x => x.name === "wex_tik")}`)}})}}
exports.conf = {
    aliases: ["Taglı"]
}
exports.help = {
    name: 'taglı'
}
function baddAudit(id, value) {
    Stat.findOneAndUpdate({
        userID: id,
        guildID: client.ayarlar.sunucuId
    }, {
        $inc: {
            "yedi.TagMember": value
        }
    }).exec((err, res) => {
        if (err) console.error(err);
    });
};
