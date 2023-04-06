const { MessageEmbed, Discord } = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
let ceza = require("../../models/ceza");
const moment = require("moment")
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.BANAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)
    let data = await sunucuayar.findOne({});
    let banLogKanal = data.BANChannel

        let target = await client.users.fetch(args[0]);
        if (!target) return message.reply(`${client.emojis.cache.find(x => x.name === "wex_carpi")} Geçerli bir **Üye Belirt** ve tekrar dene.`);
        if (target === message.author.id) return message.reply(`${client.emojis.cache.find(x => x.name === "wex_carpi")} Kendı banını açamazsın çünkü banlı değilsin.`);
        let cezaDATA = await ceza.findOne({userID: target, Ceza: "YARGI", Bitis: "null"})
        if(cezaDATA && !data.GKV.includes(message.author.id) && !client.ayarlar.sahip.includes(message.author.id)) return message.reply("Etiketlediğiniz kullanıcının banını sadece sunucu sahipleri açabilir.");
        
        await ceza.findOne({userID: target.id, Ceza: "YARGI", Bitis: "null"}, async (err, doc) => {
        const fetchBans =  message.guild.bans.fetch()
        fetchBans.then(async (bans) => {
          let ban = await bans.find(a => a.user.id === target.id)
          if (!ban) {
             message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_carpi")} Belirttiğin **${target.tag}** adlı üye sunucuda **yasaklı değil**.`)
             message.react(client.emojis.cache.find(x => x.name === "wex_carpi"))
            }
            else if(doc) {
                message.reply('**'+member.tag+'** üyesinin yasağı <@'+doc.Yetkili+'> yetkilisi tarafından açılmaz olarak işaretlendi.', message.author , message.channel)
                message.react(client.emojis.cache.find(x => x.name === "wex_carpi"))
              } else {
          
         message.guild.members.unban(target.id)
         message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_tik")}Belirttiğin **${target.tag}** adlı üyenin **yasağı kaldırıldı**.`)
         message.react(client.emojis.cache.find(x => x.name === "wex_tik"))
         let messageLogEmbed = new MessageEmbed()
         .setColor("RANDOM")
         .setAuthor(message.author.tag, message.author.avatarURL({
             dynamic: true
         }))
         .setDescription(`${target} (**${target.id}**) üyesinin banı __**${moment(Date.now()).format('LLL')}**__ tarihinde ${message.author} (**${message.author.id}**) tarafından kaldırıldı.`)     
         await client.channels.cache.get(banLogKanal).send({embeds: [messageLogEmbed]});
        }
        })
    })

}
exports.conf = {aliases: ["bankaldır", "Unban", "UNBAN"]}
exports.help = {name: 'unban'}
