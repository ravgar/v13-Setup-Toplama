let sunucuayar = require("../models/sunucuayar");
let conf = client.ayarlar
let stat = require("../models/stats");
let Database = require("../models/invite");
let TaglıData = require("../models/taglıUye");
let ozelKomut = require("../models/özelkomut");
let {
    MessageEmbed
} = require("discord.js");
let moment = require("moment");
module.exports = async client => {  
    setInterval(async () => {
        // TEYİT DATA
        let sunucu = client.guilds.cache.get(client.ayarlar.sunucuId)
        stat.find({guildID: client.ayarlar.sunucuId}, {messageXP: 0, voiceLevel: 0, messageLevel: 0, _id: 0, __v: 0,ondort: 0,total: 0, yirmibir: 0, yirmisekiz: 0, otuzbes: 0, messageCategory: 0, voiceChannel: 0}, async (err, data) => {
          
            let sesArr = []
              data.map(x => {
                for (let [key, value] of Object.entries(x.voiceCategory)) {
                  sesArr.push({
                    Channel: key,
                    Time: value
                  });
                };
              });
    
              let sesKanal = {};
              sesArr.forEach((value) => {
                if (sesKanal[value.Channel]) sesKanal[value.Channel] += value.Time;
                else sesKanal[value.Channel] = value.Time
              });
              let sirali = Object.keys(sesKanal).sort((a, b) => sesKanal[b] - sesKanal[a]).splice(0, 5).map(e => ({
                User: e,
                Value: sesKanal[e]
              }));
              sirali = sirali.map((user, index) => `${sunucu.channels.cache.get(user.User) ? `<#${user.User}>` : "#deleted-channel"} \`${client.convertDuration(Number(user.Value))}\``);
              let mesajArr = []
              data.map(x => {
                for (let [k, v] of Object.entries(x.messageChannel)) {
                  mesajArr.push({
                    Channel: k,
                    Time: v
                  })
                }
              })
              let mesajKanal = {};
              mesajArr.forEach((value) => {
                if (mesajKanal[value.Channel]) mesajKanal[value.Channel] += value.Time;
                else mesajKanal[value.Channel] = value.Time
              })
              let sirali2 = Object.keys(mesajKanal).sort((a, b) => mesajKanal[b] - mesajKanal[a]).splice(0, 5).map(e => ({
                User: e,
                Value: mesajKanal[e]
              }))
              sirali2 = sirali2.map((user, index) => `<#${user.User}> \`${user.Value} mesaj\``)
    
              let sesMiktar = 0;
              let toplamSesSiralama = "\n"
              data.sort((uye1, uye2) =>
                Number(uye2.totalVoice) - Number(uye1.totalVoice)
              ).map((data, index) => {
                sesMiktar+=data.totalVoice;
                toplamSesSiralama += `${index == 0 ? `👑` : `${index+1}.`} ${sunucu.members.cache.get(data.userID) ? sunucu.members.cache.get(data.userID).toString() : "@deleted-user"} \`${client.convertDuration(Number(data.totalVoice))}\`\n`
              })
              let CHATsira = 0;
              let benimMesajSira = "\n"
              let CHATMiktar = 0;
              let toplamCHATSiralama = "\n"
              data.sort((uye1, uye2) =>
                Number(uye2.totalMessage) - Number(uye1.totalMessage)
              ).map((data, index) => {
                CHATMiktar+=data.totalMessage
                CHATsira++
                toplamCHATSiralama += `${index == 0 ? `👑` : `${index+1}.`} ${sunucu.members.cache.get(data.userID) ? sunucu.members.cache.get(data.userID).toString() : "@deleted-user"} \`${Number(data.totalMessage)} mesaj\`\n`
              })
    
-    client.channels.cache.get("1066823339663958098").messages.fetch("1089952368264761375").then(m => m.edit({embeds: [new MessageEmbed()
  .setDescription(`
**${sunucu.name}** Adlı sunucunun en çok ses kasan kullanıcıları aşağıda listelenmiştir!
${toplamSesSiralama ? `${toplamSesSiralama}\n__*Sıralama*__ <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> __*yenilendi*__.` : "```Datacenter'da kaydedilen bir veri görüntülenemedi!```"}`)]}))

-    client.channels.cache.get("1066823339663958098").messages.fetch("1089952410811768832").then(m => m.edit({embeds: [new MessageEmbed()
  .setDescription(`
**${sunucu.name}** Adlı sunucunun en çok mesaj kasan kullanıcıları aşağıda listelenmiştir!
${toplamCHATSiralama ? `${toplamCHATSiralama}\n__*Sıralama*__ <t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> __*yenilendi*__.` : "```Datacenter'da kaydedilen bir veri görüntülenemedi!```"}`)]}))
})
            
            }, 1000 * 60 * 60)


}