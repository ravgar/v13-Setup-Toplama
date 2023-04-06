const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
let puansystem = require("../../models/puansystem");
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
    if (durum) {

        let sec = args[0]
        await sunucuayar.findOne({guildID: conf.sunucuId}, async (err, data) => {
            if (err) console.log(err)


            if (["TAG", "tag", "Tag"].some(y => y === sec)) {
                let select = args[1];
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.TAG = select, data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["TAG2", "tag2", "Tag2"].some(y => y === sec)) {
                let select = args[1];
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.TAG2 = select, data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["Link", "link", "lınk", "LINK", "LİNK"].some(y => y === sec)) {
                let select = args[1];
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.LINK = select, data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["GKV", "güvenlikişi", "güvenlikullanıcı", "guvenlikisi", "guvenliKisi", "gkv"].some(y => y === sec)) {
                let select = message.mentions.members.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                let arr = [];
                arr = data.GKV
                if (arr.some(x => x == select.id)) {
                    removeItemOnce(arr, select.id)
                    return data.GKV = arr, data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
                }
                return await data.GKV.push(`${select.id}`), await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));

            };
            if (["category", "Category", "kategori", "Kategori"].some(y => y === sec)) {
                let select = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                let arr = [];
                arr = data.PUBCategory
                if (arr.some(x => x == select.id)) {
                    removeItemOnce(arr, select.id)
                    return data.PUBCategory = arr, data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
                }
                return await data.PUBCategory.push(`${select.id}`), await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            
            if (["GRV", "guvenlirol", "güvenlirol", "grv"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                await data.GRV.push(`${select.id}`), await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["sohbet-kanal", "chat", "sohbetkanal", "genelchat"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.CHAT = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["register-kanal", "register", "registerchat", "register-chat"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.REGISTER = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            }
            if (["guard-log", "shieldlog", "guardianlog"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.GUARDChannel = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            }
            
            if (["rol-ver-log"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.ROLEChannel = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            }
            if (["taglog-kanal", "taglog", "tagbilgi", "Taglog"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.TAGLOG = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["kurallar-kanal", "kurallar", "kurallarkanal", "kurallarchat", "rules", "rule"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.RULES = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["sleep-kanal", "sleep", "sleeproom", "sleepingroom"].some(y => y === sec)) {
                let select = message.mentions.channels.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.SLEEP = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };

            if (["vkyonetici", "vkyönetici", "vk-yönetici", "vampirköylü"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.VKAuthor = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["erkek", "Erkek", "erkekROL", "man", "Man"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.MAN = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["kadın", "kız", "kızROL", "kadınROL", "woman"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.WOMAN = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["kayıtsız", "unregister", "kayıtsızüye", "uregister", "kayitsiz"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.UNREGISTER = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["yetki1", "yt1"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.ilkyetkiler = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["yetki2", "yt2"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.ikinciyetkiler = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["yetki3", "yt3"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.ucuncuyetkiler = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["ekip", "teamrol", "ekiprol", "taglırol", "taglı", "team", "takım"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.TEAM = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["boost", "booster", "boostrol", "boosterrol"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.BOOST = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["jail", "jailed", "cezalı", "Jail", "Jailed", "Cezalı"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.JAIL = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["reklam", "Reklam", "reklamrol", "Reklamrol", "ReklamRol", "REKLAM"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.REKLAM = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["mute", "muted", "Mute", "Muted"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.MUTED = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["vmute", "vmuted", "VMute", "VMuted", "VoiceMute", "sesmute", "SesMute", "Sesmute"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.VMUTED = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["yasaklıtag", "yasaklıtagrol", "bantag", "ban-tag", "yasaklı-tag", "ytag"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.BANTAG = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["şüpheli", "supheli", "şüphelihesap", "suphelihesap", "Şüpheli", "Supheli"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.SUPHELI = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["enaltyetkilirol", "en-alt-yetkili-rol", "enaltrol"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.EnAltYetkiliRol = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["genelrol", "genel-rol", "ozelrol", "globalrol"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.COMMANDAuthorized = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["kayıtsorumlusu", "kayit-sorumlusu", "kayıt-sorumlusu", "registerauthorized", "Kayıtçı", "kayitci"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.REGISTERAuthorized = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };

            if (["ustytler"].some(y => y === sec)) {
                let select;
                if (message.mentions.roles.size >= 1) {
                    select = message.mentions.roles.map(r => r.id);
                } else {
                    if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                    select = args.splice(0, 1).map(id => message.guild.roles.cache.get(id)).filter(r => r != undefined);
                }
                data.UstYetkiliRol = select, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["ust1"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.Ust1YetkiliRol = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["ust2"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.Ust2YetkiliRol = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["ust3"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.Ust3YetkiliRol = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["vkcezalı"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.VKCEZALI = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["dccezalı"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.DCCEZALI = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };
            if (["stcezalı"].some(y => y === sec)) {
                let select = message.mentions.roles.first();
                if (!select) return message.react(client.emojis.cache.find(res => res.name === "wex_iptal"));
                data.STCEZALI = select.id, await data.save(), message.react(client.emojis.cache.find(res => res.name === "wex_tik"));
            };

            let Server = sunucuayar.findOne({guildID: conf.sunucuId})

            let arr = [];
            if (["panel", "ayar", "settings"].some(y => y === sec)) {
                arr.push(data)
                let dataStat = await puansystem.findOneAndUpdate({guildID: message.guild.id}, {guildID: message.guild.id}, {upsert: true, setDefaultsOnInsert: true}).exec()

                let embed = new MessageEmbed()
                    .setAuthor(message.guild.name, message.guild.iconURL({
                        dynamic: true
                    }))
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(conf.footer)
                    .setDescription(`
                    ${arr.map(y => `
**${message.guild.name}** Sunucusunun Yetki,Kanal,Register,Stat sistemlerinin kurulumlarının detayı aşağıdaki listede belirtilmiştir.

\`\`\`BOT SETTINGS\`\`\`**Bot's Owners:** (${client.ayarlar.sahip.length > 0 ? `${client.ayarlar.sahip.map(x => `<@${x}>`).join(",")}` : "\`YOK\`"})
\`\`\`SERVER SETTINGS\`\`\`**SunucuID:** (${y.guildID})
**Sunucu-Tag:** (${y.TAG ? y.TAG : "\`Kapalı\`"}) / (${y.TAG2 ? y.TAG2 : "\`Kapalı\`"})
**Link:** (${y.LINK ? y.LINK : "\`Kapalı\`"})
\`\`\`PERMISSIONS SETTINGS\`\`\`**RegisterAuth:** ${y.REGISTERAuthorized.map(x => `<@&${x}>`)}
**ÜstYetkili:** (${y.UstYetkiliRol.map(x => `<@&${x}>`)})
**BotCommandRole:** (${y.COMMANDAuthorized.map(x => `<@&${x}>`)})
**BanAuth:** ${y.BANAuthorized.map(x => `<@&${x}>`)})
**JailAuth:** (${y.JAILAuthorized.map(x => `<@&${x}>`)})
**ChatMuteAuth:** (${y.MUTEAuthorized.map(x => `<@&${x}>`)})
**VoiceMuteAuth:** (${y.VMUTEAuthorized.map(x => `<@&${x}>`)})
**WarnAuth:** (${y.WARNAuthorized.map(x => `<@&${x}>`)})
**Bot-Command's:** (${y.EnAltYetkiliRol != "1" ? `<@&${y.EnAltYetkiliRol}>` : "\`YOK\`"})\`\`\`ROLE SETTINGS\`\`\`
**Man-Role:** (${y.MAN.map(x => `<@&${x}>`)})
**Woman-Role:** (${y.WOMAN.map(x => `<@&${x}>`)})
**Unregistered-Role:** ${y.UNREGISTER != "1" ? `<@&${y.UNREGISTER}>` : "\`YOK\`"}
**Family-Role:** ($${y.TEAM != "1" ? `<@&${y.TEAM}>` : "\`YOK\`"})
**Suspected-Role:** (${y.SUPHELI != "1" ? `<@&${y.SUPHELI}>` : "\`YOK\`"})
**BoosterRole:** (${y.BOOST != "1" ? `<@&${y.BOOST}>` : "\`YOK\`"})
**KarantinaRole:** (${y.JAIL != "1" ? `<@&${y.JAIL}>` : "\`YOK\`"})
**ChatMuteRole:** (${y.MUTED != "1" ? `<@&${y.MUTED}>` : "\`YOK\`"})
**VoiceMuteRole:** (${y.VMUTED != "1" ? `<@&${y.VMUTED}>` : "\`YOK\`"})
**BannedTagRole:** (${y.BANTAG != "1" ? `<@&${y.BANTAG}>` : "\`YOK\`"})
**Vk-Cezalı:** (${y.VKCEZALI != "1" ? `<@&${y.VKCEZALI}>` : "\`YOK\`"})
**Dc-Cezalı:** (${y.DCCEZALI != "1" ? `<@&${y.DCCEZALI}>` : "\`YOK\`"})
**St-Cezalı:** (${y.STCEZALI != "1" ? `<@&${y.STCEZALI}>` : "\`YOK\`"})\`\`\`CHANNEL SETTINGS\`\`\`
**GeneralChat:** (${y.CHAT != "1" ? `<#${y.CHAT}>` : "\`Kapalı\`"})
**RegisterChat:** (${y.REGISTER != "1" ? `<#${y.REGISTER}>` : "\`Kapalı\`"})
**RulesChannel:** (${y.RULES != "1" ? `<#${y.RULES}>` : "\`Kapalı\`"})
**VoiceMute-Channel:** (<#${data.VMUTEChannel}>)
**ChatMute-Channel:** (<#${data.MUTEChannel}>)
**Jail-Channel:** (<#${data.JAILChannel}>)
**Ban-Channel:** (<#${data.BANChannel}>)
**BotVoiceChannel:** (${client.ayarlar.botSesID ? `<#${client.ayarlar.botSesID}>` : "\`YOK\`"})
**AFKRoom:** (${y.SLEEP != "1" ? `<#${y.SLEEP}>` : "\`Kapalı\`"})
\`\`\`PARENT SETTINGS\`\`\`**Public Parent:** (${dataStat.PublicKanallar.Id.length > 0 ? dataStat.PublicKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "Kapalı"})
**Game Parent:** (${dataStat.GameKanallar.Id.length > 0 ? dataStat.GameKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "Kapalı"})
**Register Parent:** (${dataStat.KayitKanallar.Id.length > 0 ? dataStat.KayitKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "Kapalı"})
**Stream Parent:** (${dataStat.StreamKanallar.Id.length > 0 ? dataStat.StreamKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "Kapalı"})
**Secret Parent:** (${dataStat.SecretKanallar.Id.length > 0 ? dataStat.SecretKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "Kapalı"})
**Alone Parent:** (${dataStat.AloneKanallar.Id.length > 0 ? dataStat.AloneKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "Kapalı"})
**Terapi Parent:**  (${dataStat.TerapiKanallar.Id.length > 0 ? dataStat.TerapiKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "Kapalı"})
**Sorun Çözme Parent:**  (${dataStat.SorunCozmeKanallar.Id.length > 0 ? dataStat.SorunCozmeKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "Kapalı"})
**Müzik Odaları:**  (${dataStat.Müzik.Id.length > 0 ? dataStat.Müzik.Id.map(x => message.guild.channels.cache.get(x)) : "Kapalı"})
**Toplantı Odası:** (${dataStat.Toplantı.Id.length > 0 ? dataStat.Toplantı.Id.map(x => message.guild.channels.cache.get(x)) : "Kapalı"})
**Genel-Chat:** (${dataStat.MesajKanallar.Id.length > 0 ? dataStat.MesajKanallar.Id.map(x => message.guild.channels.cache.get(x)) : "Kapalı"})
**Sleep Room:** (${dataStat.SleepingKanal.Id > 0 ? message.guild.channels.cache.get(dataStat.SleepingKanal.Id) : "Kapalı"})\`\`\`OTHER SETTINGS\`\`\`
**Otomatik-Yetki-Atlama:** (${dataStat.AutoRankUP.Type == true ? "Aktif": "Kapalı"})
**Yetki-Atlama-Log:** (${dataStat.AutoRankUP.LogChannel ? `${dataStat.AutoRankUP.LogChannel}` : "Kapalı"})
**Stat-Bot-Command:** (${dataStat.AutoRankUP.sabitROL ? `<@&${dataStat.AutoRankUP.sabitROL}>` : "Kapalı"})
**Level-Sistemi:** (${dataStat.LevelSystem.Type == true ? "Aktif": "Kapalı"})
**Level-Log:** (${dataStat.LevelSystem.LogChannel ? `${dataStat.LevelSystem.LogChannel}` : "Kapalı"})

`)};


`);
                message.channel.send({embeds: [embed]});
            };

            if (["yardım", "Yardım", "help", "Help"].some(y => y === sec)) {
                return message.channel.send({embeds: [embed]});
            };
            if (!sec) {
                return message.channel.send({embeds: [embed]});
            };

        });

    } else return client.Embed(message.channel.id, `Bu komutu kullanabilmek için Sunucu Sahibi - Bot Sahibi olmalısın!`);
}
exports.conf = {aliases: ["kurulum", "kur", "Setup", "SETUP", "Setup"]}
exports.help = {name: 'setup'}
function removeItemOnce(arr, value) { var index = arr.indexOf(value); if (index > -1) { arr.splice(index, 1); } return arr; }