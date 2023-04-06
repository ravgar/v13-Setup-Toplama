const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    
    if (message.member.permissions.has("ADMINISTRATOR") || durum) {
        let Embedcik = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
        message.guild.fetchVanityData().then(res => {
            message.reply({ embeds: [Embedcik.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`**${message.guild.name}** Sunucusunun Özel-Davet İstatistikleri\n\nSunucu özel daveti: **${res.code}** Kullanımı : **${res.uses}**`)] }) }) 
    } else return;
}
exports.conf = {
    aliases: ["url-kullanım", "url"]
}
exports.help = {
    name: 'urlkullanım'
}