const { MessageEmbed, Discord } = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
const { MessageActionRow, MessageSelectMenu, MessageButton} = require('discord.js');
let Database = require("../../models/invite");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    if (!client.ayarlar.sahip.includes(message.author.id)) return;
    var Görev1 = new MessageButton().setLabel("Task I (Ses Görevi)").setCustomId("taskOne").setEmoji("995761590357999667").setStyle("SECONDARY")
    var Görev2 = new MessageButton().setLabel("Task II (Mesaj Görevi)").setCustomId("taskTwo").setEmoji("995761590357999667").setStyle("SECONDARY")
    var Görev3 = new MessageButton().setLabel("Task III (Davet Görevi)").setCustomId("taskTheree").setEmoji("995761590357999667").setStyle("SECONDARY")
    var Görev4 = new MessageButton().setLabel("Task IV (Taglı Görevi)").setCustomId("taskFour").setEmoji("995761590357999667").setStyle("SECONDARY")
    var Görev5 = new MessageButton().setLabel("Task V (Teyit Görevi)").setCustomId("taskFive").setEmoji("995761590357999667").setStyle("SECONDARY")

    const row = new MessageActionRow()
    .addComponents([Görev1, Görev2, Görev3, Görev4, Görev5])
    let embed2 = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true})).setDescription(`
Merhaba Görev seçme kanalına hoş geldin.

Kendi ilgi alanına göre aşağıda ki butonlardan görev seçebilirsin. Seçtiğiniz görev o alana ağırlıklı olmak üzere diğer alanlardan da görevler içerir.
\`Örneğin; Ses Task I görevinde belirli bir süre ses kasman gerekli.\`

${client.emojis.cache.find(x => x.name === "wex_info")} __Seçebileceğiniz Görevler:__

${client.emojis.cache.find(x => x.name === "wex_circle")} \` Task I (Ses Görevi)             :\`Sunucu ses kanallarında saat kasma görevidir. Bu görevde ses kanallarında belirtilen saat ses kasmanız gerekli.

${client.emojis.cache.find(x => x.name === "wex_circle")} \` Task II (Mesaj Görevi)            :\`Mesaj görevi sadece Genel-Chat kanalında atılan mesajlar içindir. Spam,flood veya kurallara aykırı atılan mesajlar için yaptırım uygulanabilir.

${client.emojis.cache.find(x => x.name === "wex_circle")} \` Task III (Davet Görevi) :\`Sunucumuza üye davet etme görevidir. Davet ettiğiniz üyelerin yan hesap olmaması gerekmektedir.

${client.emojis.cache.find(x => x.name === "wex_circle")} \` Task VI (Taglı Çekme Görevi)    :\`Sunucumuza taglı çekme görevidir. Çektiğiniz taglıların yan hesap olmaması gerekmektedir. Çektiğiniz taglıları "**.taglı @etiket**" veya "**.taglı ID**" komutu ile takımınıza almanız gerekir. Yan hesap tespiti halinde yaptırım uygulanabilir.

${client.emojis.cache.find(x => x.name === "wex_circle")} \` Task V (Teyit Görevi)           :\`Sunucumuzda kayıt yapma görevidir.Sunucumuzdaki kayıtsız üyeleri ses teyit alarak sunucumuza kaydetmelisiniz.

`);
    let msg = await message.channel.send({ embeds: [embed2], components: [row] });

  }
exports.conf = {aliases: []};
exports.help = {name: 'buton-task'};