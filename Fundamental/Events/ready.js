const moment = require('moment');
require("moment-duration-format");
let sunucuayar = require("../models/sunucuayar");
const { joinVoiceChannel } = require("@discordjs/voice");
const client = global.client;
let conf = client.ayarlar
const MuteBase = require("../models/muteInterval")
const VmuteBase = require("../models/vmuteInterval")
let JailBase = require("../models/jailInterval");

module.exports = async client => {
  setInterval(() => {
    mute()
    }, 1000 * 2)
    setInterval(() => {
      vmute()
      }, 1000 * 2)
      setInterval(() => {
        mutes()
        }, 1000 * 2)
  
      
try {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);

 client.user.setStatus("idle");
 let kanal = client.channels.cache.get(client.ayarlar.botSesID);
  setInterval(() => {
      const oynuyor = client.ayarlar.readyFooter;
      const index = Math.floor(Math.random() * (oynuyor.length));
      if (!client.channels.cache.get(client.ayarlar.botSesID)) return;
      client.user.setActivity(`${oynuyor[index]}`, {type: "WATCHING"});
      joinVoiceChannel({
        channelId: kanal.id,
        guildId: kanal.guild.id,
        adapterCreator: kanal.guild.voiceAdapterCreator,
        selfDeaf: true
      });
    }, 10000);
  } catch (err) { }

    async function mute() {
      const sunucu = await sunucuayar.findOne({ guildID: conf.sunucuId })

       let guild = client.guilds.cache.get(conf.sunucuId)
       MuteBase.find({muted: true},async function(err, ChatMute) {    
           if ((!ChatMute) || (ChatMute.length < 1)) return null;
           for (var AnoraWex of ChatMute) {
               let user = guild.members.cache.get(AnoraWex.userID)
               if(!user)  return null
       if(Date.now() >= AnoraWex.endDate) {
       if(user.roles.cache.has(sunucu.MUTED)) {
           user.roles.remove(sunucu.MUTED)
           await MuteBase.deleteOne({
            userID: user.id
        }).exec()}
    
       } else {
           if(!user.roles.cache.has(sunucu.MUTED)) {
          user.roles.add(sunucu.MUTED)
          client.channels.cache.find(x => x.name == "ceza-kontrol").send({content: `${user} (**${user.id}**) adlı üyenin **Chat-Mute** cezası sağ-tık yöntemi ile kaldırılmaya çalışıldı buna engel oldum ve üyeyi yeniden susturdum.`});

           }
          }
        }
      })
    }
    async function vmute() {
      const sunucu = await sunucuayar.findOne({ guildID: conf.sunucuId })
  
       let guild = client.guilds.cache.get(conf.sunucuId)
       VmuteBase.find({muted: true},async function(err, ChatMute) {    
           if ((!ChatMute) || (ChatMute.length < 1)) return null;
           for (var AnoraWex of ChatMute) {
               let user = guild.members.cache.get(AnoraWex.userID)
               if(!user)  return null
       if(Date.now() >= AnoraWex.endDate) {
        if(user.voice.serverMute) {
          user.roles.remove(sunucu.VMUTED)
          await VmuteBase.deleteOne({
            userID: user.id
        }).exec()}
          if(user.voice.channel) user.voice.setMute(false)
      } else {
          if(user.voice.channel&&!user.voice.serverMute) {
            user.roles.add(sunucu.VMUTED)
             client.channels.cache.find(x => x.name == "ceza-kontrol").send({content: `${user} (**${user.id}**) adlı üyenin **Voice-Mute** cezası sağ-tık yöntemi ile kaldırılmaya çalışıldı buna engel oldum ve üyeyi yeniden susturdum.`});
    
         if(user.voice.channel) user.voice.setMute(true)
        }
          }
        }
      })
    }
    async function mutes() {
      const sunucu = await sunucuayar.findOne({ guildID: conf.sunucuId })
       let guild = client.guilds.cache.get(conf.sunucuId)
       JailBase.find( {jailed: true },async function(err, ChatMute) {    
           if ((!ChatMute) || (ChatMute.length < 1)) return null;
           for (var AnoraWex of ChatMute) {
               let user = guild.members.cache.get(AnoraWex.userID)
               if(!user)  return null
       if(Date.now() >= AnoraWex.endDate) {
       if(user.roles.cache.has(sunucu.JAIL)) {
           user.roles.remove(sunucu.JAIL)
           user.roles.set(sunucu.UNREGISTER)
           await JailBase.deleteOne({
            userID: user.id
        }).exec()}
    
       } else {
           if(!user.roles.cache.has(sunucu.JAIL)) {
          user.roles.set([sunucu.JAIL])
          client.channels.cache.find(x => x.name == "ceza-kontrol").send({content: `${user} (**${user.id}**) adlı üyenin **Voice-Mute** cezası sağ-tık yöntemi ile kaldırılmaya çalışıldı buna engel oldum ve üyeyi yeniden susturdum.`});

           }
          }
        }
      })
    }
};