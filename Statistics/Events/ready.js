const moment = require('moment');
let {MessageEmbed} = require('discord.js');
require("moment-duration-format");
const { joinVoiceChannel } = require("@discordjs/voice");
let sunucuayar = require("../models/sunucuayar");
const client = global.client;
let conf = client.ayarlar
module.exports = async client => {
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
  

setInterval(async() => {
  let alarmModel = require("../models/alarm.js");
  let alarmlar = await alarmModel.find({ bitis: { $lte: Date.now() } });
  for (let alarm of alarmlar) {
    let uye = client.guilds.cache.get(client.ayarlar.sunucuId).members.cache.get(alarm.uye);
    if (!uye) continue;
    let embed = new MessageEmbed().setColor("RANDOM").setDescription(alarm.aciklama).setTimestamp();
    uye.send(`**${uye} sana hatırlatmamı istediğin şeyin vakti geldi!**`, { embed: embed }).catch(err => {return undefined});
    let kanal = client.channels.cache.get(alarm.kanal);
    if (kanal) kanal.send(`**${uye} sana hatırlatmamı istediğin şeyin vakti geldi!**`, { embed: embed });
    await alarm.remove();
  };
}, 10000);

};