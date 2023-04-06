const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let yetkiDATA = require("../../models/yetkili");
const hanedan = require("../../models/hanedanlik");
let Stat = require("../../models/stats");
const Users = require("../../models/yetkilial")
let limit = new Map();
const moment = require("moment");
module.exports.run = async (client, message, args, durum, kanal) => {
    let Server = await sunucuayar.findOne({ guildID: message.guild.id })
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(Server.EnAltYetkiliRol) && !Server.YetkiliAlım.some(rol => message.member.roles.cache.has(rol))  &&!Server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return;
    let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])    
    let baslangıcYt = Server.ilkyetkiler ? `${Server.ilkyetkiler.length > 1 ? Server.ilkyetkiler.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.ilkyetkiler.map(x => `<@&${x}>`).slice(-1) : Server.ilkyetkiler.map(x => `<@&${x}>`).join("")}` : ``
    let ikinciYt = Server.ikinciyetkiler ? `${Server.ikinciyetkiler.length > 1 ? Server.ikinciyetkiler.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.ikinciyetkiler.map(x => `<@&${x}>`).slice(-1) : Server.ikinciyetkiler.map(x => `<@&${x}>`).join("")}` : ``
    let ücüncüYe = Server.ucuncuyetkiler ? `${Server.ucuncuyetkiler.length > 1 ? Server.ucuncuyetkiler.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.ucuncuyetkiler.map(x => `<@&${x}>`).slice(-1) : Server.ucuncuyetkiler.map(x => `<@&${x}>`).join("")}` : ``    
    let ucuncuYT = Server.ucuncuyetkiler ? `${Server.ucuncuyetkiler.length > 1 ? Server.ucuncuyetkiler.slice(0, -1).map(x => `${x}`).join(" ") + Server.ucuncuyetkiler.map(x => `${x}`).slice(-1) : Server.ucuncuyetkiler.map(x => `${x}`).join(" ")}` : ``    
    if(!member) return message.reply({ embeds: [Embed.setDescription(`
    Merhaba, belirttiğiniz kullanıcıya verebileceğiniz yetkiler aşağıda belirtilmiştir aşağıdaki örneklere göre yetkilerini verebilirsiniz.
    
    \`.yetkiver 728161454288535604 1\` - ${baslangıcYt}
    \`.yetkiver 728161454288535604 2\` - ${ikinciYt}
    \`.yetkiver 728161454288535604 3\` - ${ücüncüYe}
    
        `)] });
        if (!member.user.username.includes(Server.TAG)) return message.channel.send("TAGIZ").then(e => setTimeout(() => e.delete().catch(() => { }), 10000))

    if(!args[0]) return message.reply({ embeds: [Embed.setDescription(`
Merhaba, belirttiğiniz kullanıcıya verebileceğiniz yetkiler aşağıda belirtilmiştir aşağıdaki örneklere göre yetkilerini verebilirsiniz.

\`.yetkiver 728161454288535604 1\` - ${baslangıcYt}
\`.yetkiver 728161454288535604 2\` - ${ikinciYt}
\`.yetkiver 728161454288535604 3\` - ${ücüncüYe}

    `)] });
    if(!args[1]) return message.reply({ embeds: [Embed.setDescription(`
    Merhaba, belirttiğiniz kullanıcıya verebileceğiniz yetkiler aşağıda belirtilmiştir aşağıdaki örneklere göre yetkilerini verebilirsiniz.
    
    \`.yetkiver 728161454288535604 1\` - ${baslangıcYt}
    \`.yetkiver 728161454288535604 2\` - ${ikinciYt}
    \`.yetkiver 728161454288535604 3\` - ${ücüncüYe}
    
        `)] });
    

    if(args[1] === "1") {
    member.roles.add(Server.ilkyetkiler)
    await Users.findOneAndUpdate({ guildID: message.guild.id, userID: member.id }, { $set: { Enabled: true, Auth: message.author.id, Time: Date.now() } }, { upsert: true })
    client.aacddAudit(message.author.id, 1, 1)
    message.reply({ embeds: [Embed.setDescription(`${member} - (\`${member.id}\`) adlı kullanıcıya ${baslangıcYt} yetkileri verildi.`)] });
    client.channels.cache.find(a => a.name === "yetki-log").send(`:small_orange_diamond: ${member} (\`${member.id}\`) adlı üyeye başlangıç yetkileri verildi. [\`${moment(Date.now()).locale("tr").format("LLL")}\`]\`\`\`fix\n${message.guild.roles.cache.get(ucuncuYT) ? message.guild.roles.cache.get(ucuncuYT).name : ucuncuYT }\`\`\``).catch(() => { });
 
} 
  if(args[1] === "2") {
    member.roles.add(Server.ikinciyetkiler)
      await Users.findOneAndUpdate({ guildID: message.guild.id, userID: member.id }, { $set: { Enabled: true, Auth: message.author.id, Time: Date.now() } }, { upsert: true })
      client.aacddAudit(message.author.id, 1, 1)
      message.reply({ embeds: [Embed.setDescription(`${member} - (\`${member.id}\`) adlı kullanıcıya ${ikinciYt} yetkileri verildi.`)] });
      client.channels.cache.find(a => a.name === "yetki-log").send(`:small_orange_diamond: ${member} (\`${member.id}\`) adlı üyeye 2. yetki permleri verildi. [\`${moment(Date.now()).locale("tr").format("LLL")}\`]\`\`\`fix\n${message.guild.roles.cache.get(ucuncuYT) ? message.guild.roles.cache.get(ucuncuYT).name : ucuncuYT }\`\`\``).catch(() => { });

    } 
    if(args[1] === "3") {
      member.roles.add(Server.ucuncuyetkiler)
      await Users.findOneAndUpdate({ guildID: message.guild.id, userID: member.id }, { $set: { Enabled: true, Auth: message.author.id, Time: Date.now() } }, { upsert: true })
      client.aacddAudit(message.author.id, 1, 1)
      message.reply({ embeds: [Embed.setDescription(`${member} - (\`${member.id}\`) adlı kullanıcıya ${ücüncüYe} yetkileri verildi.`)] });
      client.channels.cache.find(a => a.name === "yetki-log").send(`:small_orange_diamond: ${member} (\`${member.id}\`) adlı üyeye 3. yetki permleri verildi. [\`${moment(Date.now()).locale("tr").format("LLL")}\`]\`\`\`fix\n${message.guild.roles.cache.get(ucuncuYT) ? message.guild.roles.cache.get(ucuncuYT).name : ucuncuYT }\`\`\``).catch(() => { });

  
    } 
}
exports.conf = {
    aliases: ["Yetkili"]
}
exports.help = {
    name: 'yetkili'
}
