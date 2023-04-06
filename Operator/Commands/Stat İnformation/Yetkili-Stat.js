const {
    MessageEmbed
} = require("discord.js");
require("moment-timezone")
let Stat = require("../../models/stats");
let sunucuayar = require("../../models/sunucuayar");
let xpData = require("../../models/stafxp");
const moment = require("moment")
let uyarıData = require("../../models/uyarı");
const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
let puansystem = require("../../models/puansystem");
let taglıData = require("../../models/taglıUye");
const yetkiliDB = require("../../models/yetkili");
let ozelKomut = require("../../models/özelkomut");
let missionSystem = require("../../models/randomMission");
const Seens = require("../../models/Seens")
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    let sunucuData = await sunucuayar.findOne({
        guildID: message.guild.id
    });
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.REGISTERAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return;
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

        let göster = await ozelKomut.find({
            guildID: message.guild.id,
            YetkiliROL: true
        });
        let arr = []
        let veri = göster.map(x => x.YetkiliData)
        veri.forEach(v => v.forEach(x => arr.push(x)));


        let statemoji = client.emojis.cache.find(x => x.name === "wex_circle");
        let data = await Stat.findOne({
            userID: target.id,
            guildID: message.guild.id
        }) || {
            yedi: {
                Chat: {},
                Voice: {},
                TagMember: 0,
                Invite: 0,
                Register: 0,
                Yetkili: 0
            }
        };
        let data2 = await taglıData.find({
            authorID: target.id,
            Durum: "puan"
        }) || [];
        let yetkiliData = await yetkiliDB.find({
            authorID: target.id,
            Durum: "puan"
        }) || [];
        let kanallar = await puansystem.findOne({
            guildID: message.guild.id
        });
        let puan = await xpData.findOne({
            userID: target.id
        }) || {
            currentXP: 0
        };

        let yetkiler = kanallar.PuanRolSystem;
        let ekPuan = puan.currentXP;



        let pubPuan = target.roles.cache.some(rol => [].includes(rol.id)) ? kanallar.PublicKanallar.Puan * 1.2 : kanallar.PublicKanallar.Puan;
        let oyunPuan = target.roles.cache.some(rol => kanallar.GameKanallar.Rol.includes(rol.id)) ? 8 : kanallar.GameKanallar.Puan;
        let kayitPuan = target.roles.cache.some(rol => kanallar.KayitKanallar.Rol.includes(rol.id)) ? 12 : kanallar.KayitKanallar.Puan;
        let streamPuan = target.roles.cache.some(rol => [].includes(rol.id)) ? kanallar.StreamKanallar.Puan * 1.2 : kanallar.StreamKanallar.Puan;
        let secretPuan = target.roles.cache.some(rol => kanallar.SecretKanallar.Rol.includes(rol.id)) ? 2 : kanallar.SecretKanallar.Puan;
        let mesajPuan = target.roles.cache.some(rol => [].includes(rol.id)) ? kanallar.MesajKanallar.Puan * 1.2 : kanallar.MesajKanallar.Puan;
        let sleepPuan = target.roles.cache.some(rol => kanallar.SleepingKanal.Rol.includes(rol.id)) ? 3 : kanallar.SleepingKanal.Puan;
        let alonePuan = target.roles.cache.some(rol => kanallar.AloneKanallar.Rol.includes(rol.id)) ? 2 : kanallar.AloneKanallar.Puan;
        let musicPuan = target.roles.cache.some(rol => kanallar.Müzik.Rol.includes(rol.id)) ? 2 : kanallar.Müzik.Puan;
        let taglıPuan = target.roles.cache.some(rol => kanallar.TagMember.Rol.includes(rol.id)) ? 30 : kanallar.TagMember.Puan;
        let invitePuan = target.roles.cache.some(rol => kanallar.Invite.Rol.includes(rol.id)) ? 12 : kanallar.Invite.Puan;
        let teyitPuan = target.roles.cache.some(rol => kanallar.Register.Rol.includes(rol.id)) ? 5 : kanallar.Register.Puan;
        let terapipuan = target.roles.cache.some(rol => kanallar.TerapiKanallar.Rol.includes(rol.id)) ? 10 : kanallar.TerapiKanallar.Puan;
        let sorunçözmepuan = target.roles.cache.some(rol => kanallar.SorunCozmeKanallar.Rol.includes(rol.id)) ? 10 : kanallar.SorunCozmeKanallar.Puan;
        let meetingPuan = target.roles.cache.some(rol => kanallar.Toplantı.Rol.includes(rol.id)) ? 10 : kanallar.Toplantı.Puan;
        let yetkiliPuan = target.roles.cache.some(rol => kanallar.Yetkili.Rol.includes(rol.id)) ? 25 : kanallar.Yetkili.Puan;


        let pubOda = yetkiliStat(data.yedi.Voice, kanallar.PublicKanallar.Id, kanallar.SleepingKanal.Id);
        let oyunodalar = yetkiliStat(data.yedi.Voice, kanallar.GameKanallar.Id, []);
        let kayıt = yetkiliStat(data.yedi.Voice, kanallar.KayitKanallar.Id, []);
        let stream = yetkiliStat(data.yedi.Voice, kanallar.StreamKanallar.Id, []);
        let secret = yetkiliStat(data.yedi.Voice, kanallar.SecretKanallar.Id, []);
        let mesaj = data.yedi.Chat ? yetkiliStat(data.yedi.Chat, kanallar.MesajKanallar.Id, []) : 0;
        let sleeping;
        if (!data.yedi.Voice) sleeping = 0;
        else sleeping = data.yedi.Voice[kanallar.SleepingKanal.Id] || 0;
        let alone = yetkiliStat(data.yedi.Voice, kanallar.AloneKanallar.Id, []);
        let music = yetkiliStat(data.yedi.Voice, kanallar.Müzik.Id, []);
        let terapi = yetkiliStat(data.yedi.Voice, kanallar.TerapiKanallar.Id, []);
        let sçözme = yetkiliStat(data.yedi.Voice, kanallar.SorunCozmeKanallar.Id, []);
        let meeting = yetkiliStat(data.yedi.Voice, kanallar.Toplantı.Id, []);
        let yetkili = yetkiliData.length;
        let taglı = data2.length;
        let invite = data.yedi.Invite;
        let teyit = data.yedi.Register;
        let ses = client.convertDuration(data.totalVoice);
        let eglencepuan = Number((stream / (1000 * 60 * 60 * 1) * streamPuan)) + Number((oyunodalar / (1000 * 60 * 60 * 1) * oyunPuan)) + Number((music / (1000 * 60 * 60 * 1) * musicPuan));

        let totalpoints = Number((pubOda / (1000 * 60 * 60 * 1) * pubPuan)) +
            Number((oyunodalar / (1000 * 60 * 60 * 1) * oyunPuan)) +
            Number((kayıt / (1000 * 60 * 60 * 1) * kayitPuan)) +
            Number((stream / (1000 * 60 * 60 * 1) * streamPuan)) +
            Number((secret / (1000 * 60 * 60 * 1) * secretPuan)) +
            Number((mesaj * mesajPuan)) +
            Number((sleeping / (1000 * 60 * 60 * 1) * sleepPuan)) +
            Number((alone / (1000 * 60 * 60 * 1) * alonePuan)) +
            Number((music / (1000 * 60 * 60 * 1) * musicPuan)) +
            Number((terapi / (1000 * 60 * 60 * 1) * terapipuan)) +
            Number((sçözme / (1000 * 60 * 60 * 1) * sorunçözmepuan)) +
            Number((meeting / (1000 * 60 * 60 * 1) * meetingPuan)) +
            Number((yetkili * yetkiliPuan)) +
            Number((teyit * teyitPuan)) +
            Number((taglı * taglıPuan)) +
            Number((invite * invitePuan)) + Number(data.EtkinlikPuan)

        let mission = await missionSystem.findOne({
            userID: target.id,
            Active: true
        })
        const row = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('geri').setEmoji("995761593122037892").setStyle('SECONDARY'),
            new MessageButton().setCustomId('ileri').setEmoji("995761597454753822").setStyle('SECONDARY'),
            new MessageButton().setCustomId('telefon').setEmoji(`📱`).setStyle('SECONDARY')

            ,) 
            const row2 = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('geri').setEmoji("995761593122037892").setStyle('SECONDARY'),
                new MessageButton().setCustomId('ileri').setEmoji("995761597454753822").setStyle('SECONDARY'),
                new MessageButton().setCustomId('pc').setEmoji(`🖥️`).setStyle('SECONDARY')
                ,)   

            let sorumluluklar = ["1003104144040669215", "1003104144040669216", "1003104144040669217", "1003104144053239854", "1003104144053239855"]
            let zortSorumlulu = sorumluluklar.filter(a => target.roles.cache.get(a)).map(a => `**${client.guilds.cache.get(message.guild.id).roles.cache.get(a).name}**`).join(" , ")            
            let seens = await Seens.findOne({userID: target.id});
        let embed = new MessageEmbed().setColor("RANDOM").setAuthor(target.displayName, target.user.avatarURL({
                dynamic: true
            })).setFooter(client.ayarlar.footer)
            .setThumbnail("https://media.discordapp.net/attachments/904664323769651211/1001138010869469276/unknown.png?width=50&height=46")
            .setDescription(`
            ${client.emojis.cache.find(x => x.name === "wex_aboo")} Genel Bilgiler;

\`• Yetki veren ve tarihi:    :\` ${data.Yetkibaslatan ? `${message.guild.members.cache.get(data.Yetkibaslatan)} / <t:${Math.floor(Math.floor(data.YetkibaslatanTarih) / 1000)}:R>` : "Bilinmiyor / Hesaplanamadı"}
\`• Son Ses / Mesaj Aktifliği :\` <t:${(seens.lastSeenVoice  ?  Math.floor(Math.floor(seens.lastSeenVoice ) / 1000) : Date.now())}:R> / <t:${(seens.lastSeenMessage ?  Math.floor(Math.floor(seens.lastSeenMessage) / 1000) : Date.now())}:R>
\`• İlerleme Durumu           :\` ${yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).length > 0 ? yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).map(y => `${progressBar(totalpoints+Number(ekPuan), y.PUAN, 6)} ${totalpoints+Number(ekPuan) >= y.PUAN ? `` : target.roles.cache.get(y.ROLE_1) ? `` : ""} ( %${yuzdelik(totalpoints+Number(ekPuan), y.PUAN, 6).toFixed(0)} )`) : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Son Yetkidesin`}
\`• Görev                     :\` ${mission ? mission.Mission.MISSION.toUpperCase(): "Görev Seçmelisin !"}
\`• Sorumluluk           :\`  ${zortSorumlulu ? zortSorumlulu : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Sorumluluk Almalısın.`}

*Yetkinin, yükseltim toplantısında yükselir duruma gelmesi için değerlendirme kısmın yeşil olmalı ve İlerleme durumu çubuğunda minimum %80 doldurmalısın.*

${client.emojis.cache.find(x => x.name === "wex_aboo")} Görevler ve Yetki Yükseltim Bilgileri;
   
\`• Yetki Yükseltim           :\` ${yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).length > 0 ? yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).map(y => `${progressBar(totalpoints+Number(ekPuan), y.PUAN, 6)}  ( %${yuzdelik(totalpoints+Number(ekPuan), y.PUAN, 6).toFixed(0)} ) ${totalpoints+Number(ekPuan) >= y.PUAN ? `` : target.roles.cache.get(y.ROLE_1) ? `` : ""}`) : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Son Yetkidesin`}
\`• Görev İlerleme            :\` ${mission ? `${progressBar(mission.Mission.MISSION == "ses" ? mission.Check/(1000*60) : mission.Check, mission.Mission.MISSION == "ses" ? mission.Mission.AMOUNT/(1000*60) : mission.Mission.AMOUNT, 6)} ${mission.Mission.MISSION == "ses" ? `( %${yuzdelik(mission.Check/(1000*60)), mission.Mission.AMOUNT/(1000*60).toFixed(0)} )` : `( %${yuzdelik(mission.Mission.AMOUNT, mission.Check).toFixed(0)}`} ) ` : `Görev Seçmelisin !`}
    
\`• Görev Durumu              :\` ${mission ? mission.Check >= mission.Mission.AMOUNT ? `Tamamlandı. ${client.emojis.cache.find(x => x.name === "wex_succes")}`: `Tamamlanmadı. ${client.emojis.cache.find(x => x.name === "wex_cancel")}` : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Görevin Bulunmamakta.`}
\`• Yetki Durumu              :\` ${yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).length > 0 ? yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).map(y => `${totalpoints+Number(ekPuan) >= y.PUAN ? "Yetki Atlayabilirsin." : totalpoints+Number(ekPuan) >=( y.PUAN /2) ? "Yetki atlamana az kaldı": "Yetki Atlamaya çok uzaksın."}\``) : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Son Yetkidesin`}
`)
            

let sayfalar = [`${target} adlı üyenin stat durumu;

${client.emojis.cache.find(x => x.name === "wex_aboo")} Genel Bilgiler;

\`• Yetki veren ve tarihi:    :\` ${data.Yetkibaslatan ? `${message.guild.members.cache.get(data.Yetkibaslatan)} / <t:${Math.floor(Math.floor(data.YetkibaslatanTarih) / 1000)}:R>` : "Bilinmiyor / Hesaplanamadı"}
\`• Son Ses / Mesaj Aktifliği :\` <t:${(seens.lastSeenVoice  ?  Math.floor(Math.floor(seens.lastSeenVoice ) / 1000) : Date.now())}:R> / <t:${(seens.lastSeenMessage ?  Math.floor(Math.floor(seens.lastSeenMessage) / 1000) : Date.now())}:R>
\`• İlerleme Durumu           :\` ${yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).length > 0 ? yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).map(y => `${progressBar(totalpoints+Number(ekPuan), y.PUAN, 6)} ${totalpoints+Number(ekPuan) >= y.PUAN ? `` : target.roles.cache.get(y.ROLE_1) ? `` : ""} ( %${yuzdelik(totalpoints+Number(ekPuan), y.PUAN, 6).toFixed(0)} )`) : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Son Yetkidesin`}
\`• Görev                     :\` ${mission ? mission.Mission.MISSION.toUpperCase(): "Görev Seçmelisin !"}
\`• Sorumluluk           :\`  ${zortSorumlulu ? zortSorumlulu : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Sorumluluk Almalısın.`}

*Yetkinin, yükselir duruma gelmesi için değerlendirme kısmın yeşil olmalı ve İlerleme durumu çubuğunu %100 doldurman geremektedir, sistem otomatik bir şekilde yetkini yükseltmektedir.*

${client.emojis.cache.find(x => x.name === "wex_aboo")} Görevler ve Yetki Yükseltim Bilgileri;
   
\`• Yetki Yükseltim           :\` ${yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).length > 0 ? yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).map(y => `${progressBar(totalpoints+Number(ekPuan), y.PUAN, 6)}  ( %${yuzdelik(totalpoints+Number(ekPuan), y.PUAN, 6).toFixed(0)} ) ${totalpoints+Number(ekPuan) >= y.PUAN ? `` : target.roles.cache.get(y.ROLE_1) ? `` : ""}`) : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Son Yetkidesin`}
\`• Görev İlerleme            :\` ${mission ? `${progressBar(mission.Mission.MISSION == "ses" ? mission.Check/(1000*60) : mission.Check, mission.Mission.MISSION == "ses" ? mission.Mission.AMOUNT/(1000*60) : mission.Mission.AMOUNT, 6)} ${mission.Mission.MISSION == "ses" ? `( %${yuzdelik(mission.Check/(1000*60)), mission.Mission.AMOUNT/(1000*60).toFixed(0)} )` : `( %${yuzdelik(mission.Check, mission.Mission.AMOUNT).toFixed(0)}`} ) ` : `Görev Seçmelisin !`}
\`• Görev Durumu              :\` ${mission ? mission.Check >= mission.Mission.AMOUNT ? `Tamamlandı. ${client.emojis.cache.find(x => x.name === "wex_succes")}`: `Tamamlanmadı. ${client.emojis.cache.find(x => x.name === "wex_cancel")}` : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Görevin Bulunmamakta.`}
\`• Yetki Durumu              :\` ${yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).length > 0 ? yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).map(y => `${totalpoints+Number(ekPuan) >= y.PUAN ? "Yetki Atlayabilirsin." : totalpoints+Number(ekPuan) >=( y.PUAN /2) ? "Yetki atlamana az kaldı": "Yetki Atlamaya çok uzaksın."}`) : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Son Yetkidesin`}
`,`
${target} adlı üyenin stat durumu;

${client.emojis.cache.find(x => x.name === "wex_aboo")} Puanlama Verileri;

\`• Sohbet Kanalları        :\` *${client.convertDuration(pubOda)}*    ( **${Number(pubOda/(1000 * 60 * 60 * 1) * pubPuan).toFixed(0)} +Puan** ) 
\`• Kayıt Kanalları         :\` *${client.convertDuration(kayıt)}*     ( **${Number(kayıt/(1000 * 60 * 60 * 1) * kayitPuan).toFixed(0)} +Puan** )
\`• Private Kanalları       :\` *${client.convertDuration(secret)}*    ( **${Number(secret/(1000 * 60 * 60 * 1) * secretPuan).toFixed(0)} +Puan** )
\`• Alone Kanalları         :\` *${client.convertDuration(alone)}*    ( **${Number(alone/(1000 * 60 * 60 * 1) * alonePuan).toFixed(0)} +Puan** )
\`• Terapi Kanalları        :\` *${client.convertDuration(terapi)}*    ( **${Number(terapi/(1000 * 60 * 60 * 1) * terapipuan).toFixed(0)} +Puan** )
\`• Sorun Çözme Kanalları   :\` *${client.convertDuration(sçözme)}*    ( **${Number(sçözme/(1000 * 60 * 60 * 1) * sorunçözmepuan).toFixed(0)} +Puan** )
\`• Streamer Kanalları      :\` *${client.convertDuration(stream)}*    ( **${eglencepuan} +Puan** )
\`• Sleep Kanalları         :\` *${client.convertDuration(sleeping)}*  ( **${Number(sleeping/(1000 * 60 * 60 * 1) * sleepPuan).toFixed(0)} +Puan** )

\`• Toplam Mesaj            :\` *${mesaj}*    ( **${(mesaj*mesajPuan).toFixed(0)} +Puan** ) 
\`• Toplam Kayıt            :\` *${teyit}*    ( **${teyit*teyitPuan} +Puan** )
\`• Toplam Davet            :\` *${invite}*   ( **${invite*invitePuan} +Puan** ) 
\`• Toplam Taglı            :\` *${taglı}*    ( **${taglı*taglıPuan} +Puan** ) 
\`• Toplam Yetkili          :\` *${yetkili}*  ( **${yetkili*yetkiliPuan} +Puan** ) 

*Yetkinin, yükselir duruma gelmesi için İlerleme durumu çubuğunu %100 doldurman geremektedir, sistem otomatik bir şekilde yetkini yükseltmektedir.*

${client.emojis.cache.find(x => x.name === "wex_aboo")} Yükseltim; 
${yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).length > 0 ? yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).map(y => `${target.roles.cache.get(y.ROLE_1) ? `<@&${y.ROLE_1}> Yetkisindesin. <@&${y.ROLE_2}> Yetkisine Atlamak için **${Number(y.PUAN-(totalpoints+parseInt(ekPuan)).toFixed(0))}** \`Puan\` kasman gerek0li.\n` : ""}`) : `Üzerinde bir rol olmadığı için yükselme tablosunu gösteremiyorum.`}
`]; 
let embed2 = new MessageEmbed().setColor("RANDOM").setThumbnail("https://media.discordapp.net/attachments/904664323769651211/1001138010869469276/unknown.png?width=50&height=46").setFooter(`Wex ve Ese sizi çok sevio`)
.setDescription(`${target} adlı üyenin stat durumu;

${client.emojis.cache.find(x => x.name === "wex_aboo")} Genel Bilgiler;

${client.emojis.cache.find(x => x.name === "wex_circle")} **Son Ses Aktifliği:** <t:${(seens.lastSeenVoice  ?  Math.floor(Math.floor(seens.lastSeenVoice ) / 1000) : Date.now())}:R>  
${client.emojis.cache.find(x => x.name === "wex_circle")} **Son Mesaj Aktifliği:** <t:${(seens.lastSeenMessage ?  Math.floor(Math.floor(seens.lastSeenMessage) / 1000) : Date.now())}:R>
${client.emojis.cache.find(x => x.name === "wex_circle")} **Yükseltim:** ${yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).length > 0 ? yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).map(y => `${progressBar(totalpoints+Number(ekPuan), y.PUAN, 6)}  ( %${yuzdelik(totalpoints+Number(ekPuan), y.PUAN, 6).toFixed(0)} ) ${totalpoints+Number(ekPuan) >= y.PUAN ? `` : target.roles.cache.get(y.ROLE_1) ? `` : ""}`) : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Son Yetkidesin`} 
${client.emojis.cache.find(x => x.name === "wex_circle")} **Görev:** ${mission ? mission.Mission.MISSION.toUpperCase(): "Görev Seçmelisin !"}
${client.emojis.cache.find(x => x.name === "wex_circle")} **Sorumluluk:** ${zortSorumlulu ? zortSorumlulu : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Sorumluluk Almalısın.`}

${client.emojis.cache.find(x => x.name === "wex_circle")} **Yetki İlerleme:** ${yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).length > 0 ? yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).map(y => `${progressBar(totalpoints+Number(ekPuan), y.PUAN, 6)}  ( %${yuzdelik(totalpoints+Number(ekPuan), y.PUAN, 6).toFixed(0)} ) ${totalpoints+Number(ekPuan) >= y.PUAN ? `` : target.roles.cache.get(y.ROLE_1) ? `` : ""}`) : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Son Yetkidesin`} 
${client.emojis.cache.find(x => x.name === "wex_circle")} **Görev İlerleme:** ${mission ? `${progressBar(mission.Mission.MISSION == "ses" ? mission.Check/(1000*60) : mission.Check, mission.Mission.MISSION == "ses" ? mission.Mission.AMOUNT/(1000*60) : mission.Mission.AMOUNT, 6)} ${mission.Mission.MISSION == "ses" ? `( %${yuzdelik(mission.Check/(1000*60)).toFixed(0), mission.Mission.AMOUNT/(1000*60).toFixed(0)} )` : `( %${yuzdelik(mission.Check.toFixed(0), mission.Mission.AMOUNT).toFixed(0)}`} ) ` : `Görev Seçmelisin !`}

${client.emojis.cache.find(x => x.name === "wex_circle")} **Görev Durumu:** ${mission ? mission.Check >= mission.Mission.AMOUNT ? `Tamamlandı. ${client.emojis.cache.find(x => x.name === "wex_succes")}`: `Tamamlanmadı. ${client.emojis.cache.find(x => x.name === "wex_cancel")}` : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Görevin Bulunmamakta.`}
${client.emojis.cache.find(x => x.name === "wex_circle")} **Görev Durumu:** ${yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).length > 0 ? yetkiler.filter(user => target.roles.cache.get(user.ROLE_1)).map(y => `${totalpoints+Number(ekPuan) >= y.PUAN ? "Yetki Atlayabilirsin." : totalpoints+Number(ekPuan) >=( y.PUAN /2) ? "Yetki atlamana az kaldı": "Yetki Atlamaya çok uzaksın."}`) : `${client.emojis.cache.find(x => x.name === "wex_cancel")} Son Yetkidesin`}

*Yetkinin, yükselir duruma gelmesi için İlerleme durumu çubuğunu %100 doldurman geremektedir, sistem otomatik bir şekilde yetkini yükseltmektedir.*

       `)
  let sayfa = 1;
  let msg = await message.channel.send({ components: [row], embeds: [embed] }); message.react(`${client.emojis.cache.find(x => x.name === "wex_tik")}`) 
  var filter = (button) => button.user.id === message.author.id;
  const collector = msg.createMessageComponentCollector({ filter, time: 30000 })

  collector.on('collect', async (button, user) => {      
    if(button.customId === "geri") {
        if (sayfa === 1) return;
        sayfa--;
        embed.setDescription(sayfalar[sayfa-1]);
        button.update({embeds: [embed]})
      
    };
    if (button.customId === "ileri") {
        if (sayfa === sayfalar.length) return;
        sayfa++;
        embed.setDescription(sayfalar[sayfa-1]);
        button.update({embeds: [embed]})
    };
    if (button.customId === "telefon") {
        button.update({embeds: [embed2], components: [row2]}, )
    };
    if (button.customId === "pc") {
        button.update({embeds: [embed], components: [row]}, )
    };


})

        if (kanallar.AutoRankUP.Type == true) {
            for (var i = 0; i < yetkiler.length; i++) {
                if (yetkiler[i].ROLE_1 === kanallar.AutoRankUP.sabitROL) break;
            };
            yetkiler.slice(0, i).filter(user => target.roles.cache.get(user.ROLE_1)).map(async user => {
                if (totalpoints+Number(ekPuan) >= user.PUAN) {
                    target.roles.remove(user.ROLE_1)
                    target.roles.add(user.ROLE_2)
                    client.channels.cache.get(kanallar.AutoRankUP.LogChannel).send(`:tada: ${target} tebrikler!Gerekli XP 'ye ulaşarak **${message.guild.roles.cache.get(user.ROLE_1).name}** rolünden **${message.guild.roles.cache.get(user.ROLE_2).name}** rolüne atladın!`)
                await Stat.updateOne({
                    userID: target.id,
                    guildID: message.guild.id
                }, {
                    $set: {
                        ["HanedanPuan"]: 0,
                        ["EtkinlikPuan"]: 0,
                        ["yedi.Id"]: target.id,
                        ["yedi.Voice"]: {},
                        ["yedi.Chat"]: {},
                        ["yedi.TagMember"]: 0,
                        ["yedi.Invite"]: 0,
                        ["yedi.Register"]: 0,
                        ["yedi.Yetkili"]: 0,
                    }
                }).exec(); await xpData.updateOne({
                    userID: target.id
                }, {
                    $set: {
                        currentXP: 0
                    }
                }, {
                    upsert: true
                }).exec(); await ozelKomut.updateMany({
                    guildID: message.guild.id,
                    komutAd: {
                        $exists: true
                    }
                }, {
                    $pull: {
                        YetkiliData: {
                            Author: target.id
                        }
                    }
                }).exec(); await taglıData.deleteMany({
                    Durum: "puan",
                    authorID: target.id
                }); await yetkiliDB.deleteMany({
                    Durum: "puan",
                    authorID: target.id
                });
            }
    });
}

function yetkiliStat(data, parentArray, yasaklıArray) {
    let obje = 0;
    if (data) {
        parentArray.forEach(parentID => {
            let ekle = 0;
            message.guild.channels.cache.filter(channel => channel.parentId == parentID).forEach(channel => {
                if (!yasaklıArray.includes(channel.id)) ekle += (data ? (data[channel.id] || 0) : {});
            })
            obje = ekle
        })
        return obje
    } else return obje
}





}
exports.conf = {
    aliases: ["yetkilistats", "ystat", "ystats", "Yetkilistats", "Yetkilistat"]
}
exports.help = {
    name: 'yetkilistat'
}

function progressBar(value, maxValue, size) {
    const percentage = value < 0 ? 0 : value >= maxValue ? 100 / 100 : value / maxValue;
    const progress = Math.round((size * percentage));
    const emptyProgress = size - progress;
    const progressText = `${client.emojis.cache.find(x => x.name == "wex_ortabar")}`.repeat(progress);
    const emptyProgressText = `${client.emojis.cache.find(x => x.name == "wex_griortabar")}`.repeat(emptyProgress);
    const bar = `${value ? client.emojis.cache.find(x => x.name == "wex_solbar") : client.emojis.cache.find(x => x.name == "wex_baslangicbar")}` + progressText + emptyProgressText + `${emptyProgress == 0 ? `${client.emojis.cache.find(x => x.name === "wex_abooisbar")}` : `${client.emojis.cache.find(x => x.name === "wex_gribitisbar")}`}`;
    return bar;
};

function yuzdelik(amount, value) {
    let miktar = amount;
    let istenen = value;
    return Number((miktar / istenen) * 100);
}