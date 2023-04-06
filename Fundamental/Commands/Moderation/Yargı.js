const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar;
let moment = require("moment")
moment.locale("tr");
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let ceza = require("../../models/ceza");
var limit = new Map();
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    
    let sec = args[0];
    let data = await sunucuayar.findOne({})
    let banSorumlusu = data.BANAuthorized
    let banLogKanal = data.BANChannel
    let banLimit = data.BANLimit
    let cezaID = data.WARNID;
    if(!message.member.permissions.has("8")) return;
    if (banSorumlusu.length >= 1 && client.channels.cache.get(banLogKanal) && banLimit >= 1) {


            await client.users.fetch(args[0]).then(async user => {
                if (!user) {
                    return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000)).then(x => x.delete({
                        timeout: 5000
                    }).catch()).catch();
                } else {
                    let reason = args.slice(1).join(" ");
                    if (!reason) return message.channel.send(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir sebeb belirt ve tekrar dene.`).then(x => x.delete({
                        timeout: 5000
                    }).catch()).catch();
                    message.guild.bans.fetch().then(async (bans) => {
                        let messageLogEmbed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(message.author.tag, message.author.avatarURL({
                            dynamic: true
                        }))
                        .setImage("https://cdn.discordapp.com/attachments/1003104144107786302/1004746337390170122/giphy.gif")
                        .setFooter(conf.footer)
                        .setDescription(`${client.emojis.cache.find(res => res.name === "wex_banned")} ${user} (**${user.id}**) kullanıcısı ${message.author} tarafından **${reason}** sebebiyle sunucudan **yargılandı.**`)



                        let mesajla = new MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor(message.author.tag, message.author.avatarURL({
                            dynamic: true
                        }))
                        .setFooter(conf.footer)
                        .setTimestamp()
                        .setDescription(`${user} (**${user.id}**) üyesi __**${moment(Date.now()).format('LLL')}**__ tarihinde ${message.author} (**${message.author.id}**) tarafından **${reason}** sebebiyle sunucudan yargılandı.`)
                        message.channel.send({embeds: [messageLogEmbed]})
                        client.channels.cache.get(banLogKanal).send({embeds: [mesajla]}).catch();
                        message.guild.members.ban(user.id, {
                            reason: `${reason} | Yetkili: ${message.author.tag}` , days:1
                        }).catch();
                        limit.set(message.author.id, (Number(limit.get(message.author.id) || 0)) + 1);
                        let yargıBAN = new ceza({
                            ID: cezaID + 1,
                            userID: user.id,
                            Yetkili: message.author.id,
                            Ceza: "YARGI",
                            Sebep: reason,
                            Puan: 0,
                            Atilma: Date.now(),
                            Bitis: "null",
                        });
                        await client.savePunishment();
                        await yargıBAN.save();
                        setTimeout(() => {
                            limit.set(message.author.id, (Number(limit.get(message.author.id) || 0)) - 1);
                        }, 1000 * 60 * 3);
                    })
                }
            })

        } else return;
}
exports.conf = {
    aliases: ["esekoydu", "wexuçur", "yargi"]
}
exports.help = {
    name: 'yargı'
}