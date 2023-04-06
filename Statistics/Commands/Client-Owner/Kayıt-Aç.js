const Discord = require('discord.js');
const sunucuayar = require("../../models/sunucuayar")
const conf = require("../../../settings")
exports.run = async function(client, message, params) {
  if (!message.guild) return
  let data = await sunucuayar.findOne({
    guildID: message.guild.id
});
  if(!client.ayarlar.sahip.some(x => x == message.author.id)) return
       let channels = message.guild.channels.cache.filter(ch => ch.parentId == conf.RegisterParent)
       channels.forEach(ch => {
        ch.permissionOverwrites.edit(`${data.UNREGISTER}`, {
           // SEND_MESSAGES: false,
            CONNECT: true
        });
    });
    message.reply("Başarıyla register voice kanalları ve sistemi açıldı.")      

};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['reg-kilit-aç'],
  permLevel: 4
};

exports.help = {
  name: 'kayıt-aç',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
