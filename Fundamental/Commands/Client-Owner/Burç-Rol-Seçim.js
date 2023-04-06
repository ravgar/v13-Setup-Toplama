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
      { "label": "Balık", "value": "Balık", "emoji": { "name": "♓" }, },
      { "label": "Kova", "value": "Kova", "emoji": { "name": "♒" }, },
      { "label": "Oğlak", "value": "Oğlak", "emoji": { "name": "♑" }, },
      { "label": "Yay", "value":"Yay", "emoji": { "name": "♐" }, },
      { "label": "İkizler", "value": "İkizler", "emoji": { "name": "♊" }, },
      { "label": "Boğa", "value": "Boğa", "emoji": { "name": "♉" }, },
      { "label": "Koç", "value": "Koç", "emoji": { "name": "♈" }, },
      { "label": "Yengeç", "value": "Yengeç", "emoji": { "name": "♋" }, },
      { "label": "Aslan", "value": "Aslan", "emoji": { "name": "♌" }, },
      { "label": "Başak", "value": "Başak", "emoji": { "name": "♍" }, },
      { "label": "Terazi", "value": "Terazi", "emoji": { "name": "♎" }, },
      { "label": "Akrep", "value": "Akrep", "emoji": { "name": "♏" }, },

    {
    "label": "Rol İstemiyorum", "value": "rolsilburc", "emoji": { "name": "🗑️" },
    }], "placeholder": "Burç Rolleri", "min_values": 1, "max_values": 1
    }],
  }]
}
})
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['burc-rol-alma', 'burcrolal', 'burç-rol-alma', 'burçrolal'],
  permLevel: 4
};

exports.help = {
  name: 'burçseçim',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};

