const Discord = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
exports.run = async function(client, message, params) {
  if (!message.guild) return
  if(!client.ayarlar.sahip.some(x => x == message.author.id)) return
  client.api.channels(message.channel.id).messages.post({
    data: {
    "content": `Aşağıda bulunan panelden dilediğiniz renk rolünü seçebilirsin. `,
    "components": [{
    "type": 1, "components": [{
    "type": 3, "custom_id": "renks", "options": [
      { "label": "Yesil", "value": "yesil", "emoji": { "name": "🍏" }, },
      { "label": "Kırmızı", "value": "kirmizi", "emoji": { "name": "🍓" }, },
      { "label": "Sarı", "value": "sari", "emoji": { "name": "🍋" }, },
      { "label": "Mor", "value": "mor", "emoji": { "name": "🍇" }, },
      { "label": "Turuncu", "value": "turuncu", "emoji": { "name": "🍑" }, },
      { "label": "Kahverengi", "value": "kahverengi", "emoji": { "name": "🥥" }, },

    {
    "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" },
    }], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1
    }],
  }]
}
})
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['renk-rol-alma', 'renkrolal', 'renk-rol-alma', 'renkrolal'],
  permLevel: 4
};

exports.help = {
  name: 'renkseçim',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};

