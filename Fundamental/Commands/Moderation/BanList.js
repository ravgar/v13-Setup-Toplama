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

    const fetchBans = message.guild.bans.fetch()
    fetchBans.then(banned => {
        let list = banned.map(user => `${user.user.id} | ${user.user.tag}`).join('\n');
        message.channel.send(`\`\`\`js
${list}\n\nSunucumuzda toplam ${banned.size} yasaklı kullanıcı bulunmakta. Kişilerin ban nedenlerini öğrenmek icin !banbilgi ID komutunu uygulamalısın.\`\`\``)
    })
}
exports.conf = {
    aliases: ["banlist"]
}
exports.help = {
    name: 'ban-list'
}