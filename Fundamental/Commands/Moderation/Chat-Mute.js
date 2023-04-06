const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar;
let moment = require("moment")
moment.locale("tr");
let ms = require("ms");
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let ceza = require("../../models/ceza");
let profil = require("../../models/profil");
let muteInterval = require("../../models/muteInterval");
let jailInterval = require("../../models/jailInterval");
let vmuteInterval = require("../../models/vmuteInterval");
var limit = new Map();
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    
    let sec = args[0];
    let data = await sunucuayar.findOne({})
    let cezaID = data.WARNID;

    

    if (sec == "setup") {
        if (!args[1]) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir kurulum belirt.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
        if (message.guild.members.cache.some(member => conf.sahip.some(sahip => member === sahip)) || message.member.permissions.has("ADMINISTRATOR") || message.author.id === message.guild.owner.id) {
            await sunucuayar.findOne({
                guildID: message.guild.id
            }, async (err, data) => {
                if (args[1] == "yetki") {
                    let select;
                    if (message.mentions.roles.size >= 1) {
                        select = message.mentions.roles.map(r => r.id);
                    } else {
                        if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_carpi"));
                        select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                    }
                    return data.MUTEAuthorized = select, data.save().then(y => message.react(client.emojis.cache.find(res => res.name === "wex_tik")))
                }
                if (args[1] == "kanal") {
                    let select = message.mentions.channels.first();
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_carpi"));
                    return data.MUTEChannel = select.id, data.save().then(y => message.react(client.emojis.cache.find(res => res.name === "wex_tik")))
                }
                if (args[1] == "limit") {
                    let select = Number(args[2])
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_carpi"));
                    return data.MUTELimit = select, data.save().then(y => message.react(client.emojis.cache.find(res => res.name === "wex_tik")))
                }
            })
        } else return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Bu komutu yanlızca bot sahibi kullanabilir.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
        } else {
            let server = await sunucuayar.findOne({guildID: message.guild.id});  
            if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.MUTEAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)    
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let reason = args.splice(2).join(" ") || "Sebep Yok";
        let time = args[1];
        if (!target) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
        if (!time) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir süre belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
        let cezalar = await ceza.find({
            userID: target.id
        });
        if (cezalar.length == 0) {
            cezalar = [{
                Puan: 0
            }, {
                Puan: 0
            }];
        };


        let muteSorumlusu = data.MUTEAuthorized;
                    let muteLogKanal = data.MUTEChannel;
                    let muteLimit = data.MUTELimit;
                    let muteROL = data.MUTED;
                    if (muteSorumlusu.length >= 1 && client.channels.cache.get(muteLogKanal) && muteLimit >= 1) {
                        if (target.roles.cache.get(muteROL)) return message.react(client.emojis.cache.find(res => res.name === "wex_carpi"))
                        if (limit.get(`${message.author.id}`) >= muteLimit) return message.reply(`${client.emojis.cache.find(res => res.name === "wex_carpi")} Geçerli olan \`Mute limitini\` aştığın için işlem iptal edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
                        if (message.member.roles.highest.position <= target.roles.highest.position) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Belirttiğin üye ile \`Aynı/Alt\` bir yetkide oldugun için işlem iptal edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
                        if (target.id === message.author.id) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Kendine ceza-i işlem uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
            
                        if (client.ayarlar.CEZA_PUAN_SYSTEM == true) {

                            if (cezalar.map(x => x.Puan).reduce((a, b) => a + b) >= 500) {
                                await jailInterval.findOne({
                                    userID: target.id
                                }, (err, data) => {
                                    if (!data) {
                                        newData = new jailInterval({
                                            userID: target.id,
                                            jailed: true,
                                        })
                                        newData.save()
                                    } else {
                                        data.jailed = true, data.save();
                                    }
                                })
                                await target.roles.set(target.roles.cache.get(data.BOOST) ? [data.JAIL, data.BOOST] : [data.JAIL]);
                                return message.channel.send(`${target.id} adlı üye **500 Ceza Puan'ı** yaptığı için cezalı üyelerin arasına gönderildi!`)
                            }
                        }
                        let messageEmbed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({
                            dynamic: true
                        })).setDescription(`${client.emojis.cache.find(res => res.name === "wex_mute")} ${target} (**${target.id}**) kullanıcısı ${message.author} tarafından **${reason}** sebebiyle geçiçi olarak susturuldu. (Ceza Numarası: \`#${cezaID+1}\`)`)
                

                        let messageLogEmbed = new MessageEmbed()
                            .setColor("RANDOM")
                            .setAuthor(message.author.tag, message.author.avatarURL({
                                dynamic: true
                            }))
                            .setFooter(conf.footer)
                            .setTimestamp()
                            .setDescription(`${target} (**${target.id}**) üyesi __**${moment(Date.now()).format('LLL')}**__ tarihinde ${message.author} (**${message.author.id}**) tarafından **${reason}** sebebiyle sunucu metin kanallarında geçiçi olarak susturuldu.`)
                            message.react(`${client.emojis.cache.find(x => x.name === "wex_tik")}`);
                            await muteInterval.findOne({
                            userID: target.id,
                        }, async (err, data) => {
                            if (!data) {
                                let newData = new muteInterval({
                                    userID: target.id,
                                    muted: true,
                                    AuthID: message.author.id,
                                    Reason: reason,
                                    endDate: Date.now() + ms(time)
                                })
                                limit.set(`${message.author.id}`, (Number(limit.get(`${message.author.id}`) || 0)) + 1)
                                setTimeout(() => {
                                    limit.set(`${message.author.id}`, (Number(limit.get(`${message.author.id}`) || 0)) - 1)
                                }, 1000 * 60 * 3)
                                await newData.save()
                                await banSistemi(message, messageEmbed, client, muteLogKanal, messageLogEmbed, target, cezaID, reason, args, ms, muteROL, cezalar);

                            } else {
                                limit.set(`${message.author.id}`, (Number(limit.get(`${message.author.id}`) || 0)) + 1)
                                setTimeout(() => {
                                    limit.set(`${message.author.id}`, (Number(limit.get(`${message.author.id}`) || 0)) - 1)
                                }, 1000 * 60 * 3)
                                data.muted = true, data.endDate = Date.now() + ms(time), data.save();
                                await banSistemi(message, messageEmbed, client, muteLogKanal, messageLogEmbed, target, cezaID, reason, args, ms, muteROL, cezalar);
                            }
                        })
                    } else return client.Embed(message.channel.id, "Lütfen mute komudunun kurulumunu tamamlayınız `" + conf.prefix[0] + "vmute setup` yazarak kurunuz!")
                  
    }
}
exports.conf = {
    aliases: ["mute", "mutec"]
}
exports.help = {
    name: 'cmute'
}
async function banSistemi(message, messageEmbed, client, muteLogKanal, messageLogEmbed, target, cezaID, reason, args, ms, muteROL, cezalar) {
    await target.roles.add(muteROL).then(async x => {
        await message.channel.send({embeds: [messageEmbed]}).then(sentEmbed => {
            sentEmbed.react(client.emojis.cache.find(res => res.name === "wex_tik"))
    
        })
        await client.channels.cache.get(muteLogKanal).send({embeds: [messageLogEmbed]});
        let newData = ceza({
            ID: cezaID + 1,
            userID: x.id,
            Yetkili: message.author.id,
            Ceza: "MUTE",
            Sebep: reason,
            Puan: 8,
            Atilma: Date.now(),
            Bitis: Date.now() + ms(args[1]),
        })
        profil.updateOne({
            userID: message.author.id,
            guildID: message.guild.id
        }, {
            $inc: {
                MuteAmount: 1
            }
        }, {
            upsert: true
        }).exec();
        await client.savePunishment();
        await newData.save();
        await client.toplama(cezalar, client.ayarlar.CEZA_PUAN_KANAL, x.id, cezaID, 10);
    })
}
async function voiceMuteSistemi(message, messageEmbed, client, muteLogKanal, messageLogEmbed, target, cezaID, reason, args, ms, muteROL, cezalar) {
    await target.roles.add(muteROL).then(async x => {
        await message.channel.send(messageEmbed);
        await client.channels.cache.get(muteLogKanal).send(messageLogEmbed);
        let newData = new ceza({
            ID: cezaID + 1,
            userID: x.id,
            Yetkili: message.author.id,
            Ceza: "SES MUTE",
            Sebep: reason,
            Puan: 10,
            Atilma: Date.now(),
            Bitis: Date.now() + ms(args[1]),
        });
        await profil.updateOne({
            userID: message.author.id,
            guildID: message.guild.id
        }, {
            $inc: {
                MuteAmount: 1
            }
        }, {
            upsert: true
        }).exec();
        await client.savePunishment();
        await newData.save();
        await x.voice.setMute(true).catch(() => {});
        await client.toplama(cezalar, client.ayarlar.CEZA_PUAN_KANAL, x.id, cezaID, 10);
    })
}