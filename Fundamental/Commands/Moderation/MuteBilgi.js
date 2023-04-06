const { MessageEmbed } = require("discord.js");
let moment = require("moment");
moment.locale("tr")
let ceza = require("../../models/ceza");
let vmuteInterval = require("../../models/vmuteInterval");
let muteInterval = require("../../models/muteInterval");

module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
  if(kanal) return;
  vmuteInterval.find({userID: message.member.id}, async (err,res) => {
    res = res.reverse();
    let sesveri = res.map((x, index) => `[ <@${x.AuthID}> ] Voice-Mute cezasının bitmesine \`${moment(x.endDate - Date.now()).format("m [dakika,] s [saniye.]")}\` kaldı. [\`${x.Reason}\`]`).slice(0,1) 
  
    muteInterval.find({userID: message.member.id}, async (err,res) => {
      res = res.reverse();
      let chatveri = res.map((x, index) => `[ <@${x.AuthID}> ] Chat-Mute cezasının bitmesine \`${moment(x.endDate - Date.now()).format("m [dakika,] s [saniye.]")}\` kaldı. [\`${x.Reason}\`]`).slice(0,1) 
    let embed = new MessageEmbed()
    embed.setColor("RANDOM")//`${client.emojis.cache.find(x => x.name == "wex_cancel")}`
    embed.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    embed.setDescription(`${message.author} (**${message.author.id}**) üyesinin aktif olan Chat ve Ses kanallarında olan susturulması hakkında bilgiler aşağıda belirtilmiştir.
    ${client.emojis.cache.find(x => x.name === "wex_vunmute") || "Emoji Bulunamadı"} **Voice-Mute Bilgisi**
    Kullanıcının aktif olan voice mute bilgileri aşağıda belirtilmiştir.\n${sesveri.join(", \n") || "Aktif bir Voice-Mute ceza-i işlemin bulunmuyor."}
    **────────────────────**
    ${client.emojis.cache.find(x => x.name === "wex_unmute") || "Emoji Bulunamadı"} **Chat-Mute Bilgisi**
    Kullanıcının aktif olan chat mute bilgileri aşağıda belirtilmiştir.\n${chatveri.join(", \n") || "Aktif bir Chat-Mute ceza-i işlemin bulunmuyor."}
    **────────────────────**
    __İşlemlerde herhangi bir sorun oldugunu düşünüyorsan kurucularımıza yazmaktan çekinme.__`)

    
    message.channel.send({embeds: [embed]})
  })

  })
  }
exports.conf = {aliases: ["mutebilgi", "mbilgi"]}
exports.help = {name: 'mutelimiyim'}
