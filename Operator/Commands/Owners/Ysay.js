const {
  MessageEmbed,
  Discord
} = require("discord.js");
let sunucuayar = require("../../models/sunucuayar");
let table = require("string-table");
module.exports.run = async (client, message, args, durum, kanal) => {
  
  if (!message.guild) return;
    
  let data = await sunucuayar.findOne({})
  if (message.member.permissions.has("ADMINISTRATOR") && message.member.roles.cache.some(rol => data[0].UstYetkiliRol.some(rol2 => rol.id == rol2)) || durum) {
    let roles = message.guild.roles.cache.get(data.EnAltYetkiliRol); 
    let üyeler = [...message.guild.members.cache.filter(uye => !uye.user.bot && uye.roles.highest.position >= roles.position && (uye.presence && uye.presence.status !== "offline") && !uye.voice.channel).values()]
     var filter = m => m.author.id === message.author.id && m.author.id !== client.user.id && !m.author.bot;
     if(üyeler.length == 0) return message.channel.send("çevrimiçi yetkili olup seste olmayan yetkili yok")

     message.channel.send(`Online olup seste olmayan \`${roles.name}\` rolündeki ve üzerinde ki yetkili sayısı: ${üyeler.length ?? 0} `)
        message.channel.send(`\`\`\``+ üyeler.map(x => "<@" + x.id + ">").join(",") + `\`\`\``) //\`

  } else return;
}
exports.conf = {
  aliases: ["ysay", "seslikontrol", "Yetkilisay", "yetkili-say"]
}
exports.help = {
  name: 'yetkilisay'
}
//data[0].EnAltYetkiliRol