const { MessageEmbed } = require("discord.js");
let moment = require("moment");
moment.locale("tr")
let ceza = require("../../models/ceza");

module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
  let server = await sunucuayar.findOne({guildID: message.guild.id});
  if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol)  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)
  
    let embed = new MessageEmbed()
    embed.setColor("RANDOM")//`${client.emojis.cache.find(x => x.name == "wex_cancel")}`
    embed.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    let id = args[0]
    if(!args[0] || isNaN(args[0])) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir kurulum belirt.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)
    ceza.findOne({guildID: message.guild.id, Type: "BAN",victimID: args[0]},async function(err, data) {

        if(data) {
    
          message.channel.send({ embeds: [embed.setDescription(`${client.emojis.cache.find(x => x.name === "wex_banned") || "Emoji Bulunamadı"} Kullanıcı: \`${client.users.cache.get(data.victimID) ? client.users.cache.get(data.victimID).tag : data.victimID }\` (\`${data.victimID}\`)\n─────────────────────────────\n\`${client.users.cache.get(data.execID) ? client.users.cache.get(data.execID).tag : data.execID }\` (\`${data.execID}\`) tarafından \`${moment(data.dateNow).locale("tr").format("LLL")}\` tarihinde \`${data.Reason}\` sebebiyle sunucudan yasaklandı.`)] }), message.react(`${client.emojis.cache.find(x => x.name === "wex_tik")}`)
        } else {
          await client.users.fetch(args[0]).then(res => {

              message.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD', limit: 100}).then(audit => {
                let user = audit.entries.find(a => a.target.id === res.id)
                if(user){
                  message.channel.send({ embeds: [embed.setDescription(`${client.emojis.cache.find(x => x.name === "wex_banned") || "Emoji Bulunamadı"} Kullanıcı:  \`${client.users.cache.get(id) ? client.users.cache.get(id).tag : id }\` (\`${id}\`)\n─────────────────────────────\n\`${user.executor.tag}\` (\`${user.executor.id}\`) tarafından \`${moment(user.createdAt).locale("tr").format("lll")}\` tarihinde \`${user.reason || "Belirtilmeyen Bir Sebeb"}\` sebebiyle sunucudan yasaklanmış.`)] }), message.react(`${client.emojis.cache.find(x => x.name === "wex_tik")}`)

                }else{
                    return message.channel.send("\n\nBu yasaklama, son 100 yasaklama içinde olmadığından dolayı ban bilgisini yazamıyorum."), message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)
                }
            })
        })
        }
    })
}
exports.conf = {aliases: ["banbilgi", "bansorgu"]}
exports.help = {name: 'ban-bilgi'}
