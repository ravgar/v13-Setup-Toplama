const { MessageEmbed, Discord } = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
const { MessageActionRow, MessageSelectMenu, MessageButton} = require('discord.js');
let Database = require("../../models/invite");
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    if (!client.ayarlar.sahip.includes(message.author.id)) return;
    var One = new MessageButton().setCustomId("one").setEmoji("1️⃣").setStyle("SECONDARY")
    var Two = new MessageButton().setCustomId("two").setEmoji("2️⃣").setStyle("SECONDARY")
    var Three = new MessageButton().setCustomId("three").setEmoji("3️⃣").setStyle("SECONDARY")
    var Four = new MessageButton().setCustomId("four").setEmoji("4️⃣").setStyle("SECONDARY")
    var Five = new MessageButton().setCustomId("five").setEmoji("5️⃣").setStyle("SECONDARY")
    const row = new MessageActionRow()
    .addComponents([One, Two, Three, Four, Five])


    let msg = await message.channel.send({ content:  `
    **${message.guild.name}** Sunucu Kısayolları;
    
\` 1. \` Ceza-i İşlem Bilgileri
\` 2. \` Level Bilgileri
\` 3. \` Sunucu Bilgileri
\` 3. \` Davet Bilgileri
\` 5. \` Bot Yardım Komutu
    
> 📍 **Puan Sistemi Tanıtım;**
Bu sistem sayesinde görevlerinizi hızlı ve kolay bir şekilde tamamlayarak otomatik yükselebilirsiniz.
`, components: [row] });

  }
exports.conf = {aliases: []};
exports.help = {name: 'buton-panel'};