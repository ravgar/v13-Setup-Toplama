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
let profil = require("../../models/profil");
var limit = new Map();
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    let sec = args[0];
    let data = await sunucuayar.findOne({})
    let banSorumlusu = data.BANAuthorized
    let banLogKanal = data.BANChannel
    let banLimit = data.BANLimit
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
                        //`${client.emojis.cache.find(x => x.name == "wex_cancel")}`
                        if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_carpi"));
                        select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                    }
                    return data.BANAuthorized = select, data.save().then(y => message.react(client.emojis.cache.find(res => res.name === "wex_tik")))
                }
                if (args[1] == "kanal") {
                    let select = message.mentions.channels.first();
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_carpi"));
                    return data.BANChannel = select.id, data.save().then(y => message.react(client.emojis.cache.find(res => res.name === "wex_tik")))
                }
                if (args[1] == "limit") {
                    let select = Number(args[2])
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_carpi"));
                    return data.BANLimit = select, data.save().then(y => message.react(client.emojis.cache.find(res => res.name === "wex_tik")))
                }
            })
        } else return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Bu komutu yanlızca bot sahibi kullanabilir.`)
    }    
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.BANAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)
    if (banSorumlusu.length >= 1 && client.channels.cache.get(banLogKanal) && banLimit >= 1) {
            let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
            if (!target) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
            let reason = args.slice(1).join(" ");
            if (!reason) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir sebeb belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
            if (limit.get(message.author.id) >= banLimit) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli olan \`ban limitini\` aştığın için işlem iptal edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
            if (message.member.roles.highest.position <= target.roles.highest.position) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Belirttiğin üye ile \`Aynı/Alt\` bir yetkide oldugun için işlem iptal edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
            if (target.id === message.author.id) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Kendine ceza-i işlem uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))



limit.set(`${message.author.id}`, (Number(limit.get(`${message.author.id}`) || 0)) + 1)
message.react(`${client.emojis.cache.find(x => x.name === "wex_tik")}`);
setTimeout(() => {
    limit.set(`${message.author.id}`, (Number(limit.get(`${message.author.id}`) || 0)) - 1)
},1000*60*3)
        await banSistemi(message, client, banLogKanal, target, cezaID,reason);
        } else return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Kurulum tamamlanmamış Bot sahibine ulaşmalısın.`)
}
exports.conf = {
    aliases: ["Ban"]
}
exports.help = {
    name: 'ban'
}
async function banSistemi(message, client, banLogKanal, target, cezaID,reason) {

    let messageEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.tag, message.author.avatarURL({
        dynamic: true
    }))
    .setDescription(`${client.emojis.cache.find(x => x.name == "wex_banned")} ${target} (**${target.id}**) kullanıcısı ${message.author} tarafından **"${reason}"** sebebiyle kalıcı olarak Sunucudan yasaklandı. (Ceza Numarası: \`#${cezaID+1}\`)`)

let messageLogEmbed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.tag, message.author.avatarURL({
        dynamic: true
    }))
    .setFooter(`Ceza Numarası: #${cezaID+1}`)
    .setDescription(`${target} (**${target.id}**) üyesi __**${moment(Date.now()).format('LLL')}**__ tarihinde ${message.author} (**${message.author.id}**) tarafından **${reason}** sebebiyle sunucudan yasaklandı.`)
    await target.user.send(`${message.guild.name} adlı sunucumuzdan **${message.author}** tarafından **${reason}** sebebi ile yasaklandın.`)
    await message.guild.members.ban(target.id, { reason: `${reason} | Yetkili: ${message.author.tag}` , days:1})
    await message.channel.send({embeds: [messageEmbed]}).then(sentEmbed => {
        sentEmbed.react(client.emojis.cache.find(res => res.name === "wex_tik"))

    })
    await client.channels.cache.get(banLogKanal).send({embeds: [messageLogEmbed]});
    let newData = ceza({
        ID: cezaID + 1,
        userID: target.id,
        Yetkili: message.author.id,
        Ceza: "BAN",
        Sebep: reason,
        Puan: 30,
        Atilma: Date.now(),
        Bitis: "KALICI",
    });
    await profil.updateOne({userID: message.author.id, guildID: message.guild.id}, {$inc: {["BanAmount"]: 1}}, {upsert: true}).exec();
    await client.savePunishment();
    await newData.save();

}