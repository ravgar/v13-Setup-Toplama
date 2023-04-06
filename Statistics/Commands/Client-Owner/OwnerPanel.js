const Discord = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
exports.run = async function(client, message, params) {
  if (!message.guild) return
  if(!client.ayarlar.sahip.some(x => x == message.author.id)) return
    client.api.channels(message.channel.id).messages.post({ data: { 
"content": `**Selamlar ${message.guild.name} Kurucuları;
Aşağıda bulunan buton panelleri sayesinde sunucu içerisindeki çoğu işlemleri bir buton ile kontrol edebilirsiniz kontrol edebildiğiniz bazı işlemler;**

**__Yetkileri kapat:__** Sunucu içerisinde yönetici veya herhangi bir işlevin açık olduğu rollerin yetkisini kapatır.
**__Yetkileri aç:__** Sunucu içerisinde kapattıgınız yetkilerin yetki işlevlerini geri açar.
**__Tüm banları kaldır:__** Sunucu içerisinde genel ban affı getirir ve tüm yasaklamaları kaldırır.
**__Tüm sicilleri temizle:__** Sunucu içerisindeki Tüm ceza-i sicil işlemlerini sıfırlar.
**__Tüm statları temizle:__** Sunucu içerisindeki Tüm Ses, Mesaj yani stat verilerini sıfırlar.

Hepinize İyi Günler..

> Unutmayın butonlar ile oynamayınız herhangi bir hata geri çevrilemez.`,
  "components": [
    {
"type": 1,
"components": [
    {
"type": 2,
"style": 2,
"custom_id": "bir",
"label": "Yetkileri Kapat!",
    },
    {
"type": 2,
"style": 2,
"custom_id": "iki",
"label": "Yetkileri Aç!",
    },
    {
"type": 2,
"style": 2,
"custom_id": "üç",
"label": "Sunucu Ban Affı!",
    },
    {
"type": 2,
"style": 2,
"custom_id": "dört",
"label": "Sunucu Ceza Affı!",
    },
    {
"type": 2,
"style": 2,
"custom_id": "beş",
"label": "Sunucu Stat Reset!",
    },
]
    }
  ],
  }
  })

};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['panel-owner'],
  permLevel: 4
};

exports.help = {
  name: 'owner-panel',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
