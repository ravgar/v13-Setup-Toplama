const client = global.client;
let conf = client.ayarlar
const {
  MessageEmbed
} = require("discord.js");
let moment = require("moment");
moment.locale("tr");
let teyit = require("../models/teyit");
let sunucuayar = require("../models/sunucuayar");
const message = require("../../Fundamental/events/message");
module.exports = async member => {
  let data2 = await sunucuayar.findOne({})
  let unregister= data2.UNREGISTER;
  if (member.roles.cache.some(x => unregister.some(y => x == y))) return;
  await teyit.findOne({userID: member.id, guildID: member.guild.id}, async (err, data) => {
    if (!data) return;
  data.userName.push(`\`${member.displayName} \` (Sunucudan Ayrılma)`),data.save()
  })
  let embed = new MessageEmbed().setColor("RANDOM").setAuthor(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
  client.channels.cache.find(a => a.name === "giris-cikis-log").send({ embeds: [embed.setDescription(`${member} (\`${member.id}\` - \`${member.user.tag}\`) adlı üye sunucudan ayrıldı.
  **─────────────────────**
  Kullanıcının Hesap Oluşturma Tarihi: \`${moment(member.user.createdTimestamp).locale('tr').format("LLL")}\` **[** <t:${Math.floor(Math.floor(member.user.createdAt) / 1000)}:R>  **]**
  **─────────────────────**
  ${member.roles.cache.filter(rol => rol.name != "@everyone").map(x => x).join(",")}`)] })

};