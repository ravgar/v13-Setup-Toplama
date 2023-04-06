const { MessageEmbed, Discord } = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let otokayit = require("../../models/otokayit");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
	let data = await sunucuayar.findOne({})
    let tag = data.TAG;
    let tag2 = data.TAG2;
    let unRegisterRol = data.UNREGISTER;
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.REGISTERAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return;
let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!target) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir üye belirt ve tekrar dene.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
    if (message.member.roles.highest.position <= target.roles.highest.position) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Belirttiğin üye ile \`Aynı/Alt\` bir yetkide oldugun için işlem iptal edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
    if (target.id === message.author.id) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Kendine ceza-i işlem uygulayamazsın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
if (target.roles.cache.get(data.EnAltYetkiliRol) && !message.member.permissions.has("ADMINISTRATOR")) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Yetkililer birbilerini kayıtsıza atamaz.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
    otokayit.deleteOne({userID: target.id}).exec();
        target.setNickname(`${target.user.username.includes(tag) ? tag : tag2 ? tag2 : tag} İsim | Yaş`)
    target.roles.set(unRegisterRol).then(x => message.react(client.emojis.cache.find(x => x.name === "wex_tik"))).catch(y => message.react(client.emojis.cache.find(x => x.name === "wex_iptal")));
}
exports.conf = {aliases: ["unregister", "kayitsiz"]}
exports.help = {name: 'kayıtsız'}
