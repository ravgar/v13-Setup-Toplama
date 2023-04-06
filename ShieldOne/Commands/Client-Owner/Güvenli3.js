const Discord = require('discord.js');
const {
  MessageEmbed,
  
} = require("discord.js");
const fs = require('fs')

const ayarlar = require("../../../SafeGuard.json")
exports.run = async function(client, message, params) {
  if (!message.guild) return
  if(!client.ayarlar.sahip.some(x => x == message.author.id)) return
  let embed = new MessageEmbed().setColor("2F3136").setAuthor(message.member.displayName, message.author.avatarURL({
    dynamic: true,
  })).setTimestamp();
  let args = message.content.split(' ').slice(1);
  let hedef;
  let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name === args.join(" "));
  let uye = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  if (rol) hedef = rol;
  if (uye) hedef = uye;
  let guvenliler = ayarlar.SafeThree || [];
  if (!hedef) return message.channel.send({embeds: [new MessageEmbed().setFooter("Url Hariç Herşey Serbest :)").setDescription(`\`\`\`Güvenli listeye eklemek/kaldırmak için bir hedef (rol/üye) belirtmelisin!\`\`\``).addField("Güvenli Liste", guvenliler.length > 0 ? guvenliler.map(g => (message.guild.roles.cache.has(g.slice(1)) || message.guild.members.cache.has(g.slice(1))) ? (message.guild.roles.cache.get(g.slice(1)) || message.guild.members.cache.get(g.slice(1))) : g).join('\n') : "Bulunamadı!")]});
  if (guvenliler.some(g => g.includes(hedef.id))) {
    guvenliler = guvenliler.filter(g => !g.includes(hedef.id));
    ayarlar.SafeThree = guvenliler;
    fs.writeFile("././SafeGuard.json", JSON.stringify(ayarlar), (err) => {
      if (err) console.log(err);
    }); 
    message.channel.send({embeds: [embed.setDescription(`${hedef}, ${message.author} tarafından güvenli listesinden kaldırıldı!`)]});
  } else {
    ayarlar.SafeThree.push(`y${hedef.id}`);
    fs.writeFile("././SafeGuard.json", JSON.stringify(ayarlar), (err) => {
      if (err) console.log(err);
    });
    message.channel.send({embeds: [embed.setDescription(`${hedef}, ${message.author} tarafından güvenli listesine eklendi!`)]});
  };
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['safe3', 'safethree', 'güvenli3'],
  permLevel: 4
};

exports.help = {
  name: 'güvenlithree',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
