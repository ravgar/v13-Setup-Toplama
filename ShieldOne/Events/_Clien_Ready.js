const moment = require('moment');
let {MessageEmbed} = require('discord.js');
const { joinVoiceChannel } = require("@discordjs/voice");
require("moment-duration-format");
const GUILD_ROLES = require("../models/Guild.Roles");
const GUILD_CATEGORY = require("../models/Guild.Category.Channels");
const GUILD_TEXT = require("../models/Guild.Text.Channels");
const GUILD_VOICE = require("../models/Guild.Voice.Channels");
let sunucuayar = require("../models/sunucuayar");
const client = global.client;
let conf = client.ayarlar


module.exports = async client => {
    let data = await sunucuayar.findOne({guildID: client.ayarlar.sunucuId});

    setInterval(() => { WebTarayiciKontrol(); }, 1 * 5000);
  
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

   async function WebTarayiciKontrol() { //WEBDEN GİRENDEN ROL ÇEKME
    const guild = client.guilds.cache.get(conf.sunucuId)
    const member = guild.members.cache.forEach(member => {
      let Cihaz = {
        web: 'İnternet Tarayıcısı',
        desktop: 'Bilgisayar (App)',
        mobile: 'Mobil'
      }
      if (member.presence && member.presence.status !== 'offline') { clientStatus = `${Cihaz[Object.keys(member.presence.clientStatus)[0]]}` } else { clientStatus = 'Çevrimdışı/Görünmez' }
      if(clientStatus == 'İnternet Tarayıcısı') {
          member.roles.cache.map(f => {
            if(f.permissions.has("ADMINISTRATOR") || f.permissions.has("MANAGE_ROLES") || f.permissions.has("MANAGE_CHANNELS") || f.permissions.has("MANAGE_GUILD") || f.permissions.has("BAN_MEMBERS") || f.permissions.has("MANAGE_NICKNAMES") || f.permissions.has("MANAGE_EMOJIS_AND_STICKERS") || f.permissions.has("MANAGE_WEBHOOKS")) {
              if(member.user.bot || member.id === guild.ownerId || member.id === ayarlar.root) return;
              member.roles.remove(f, `Tarayıcıdan girdiği için rolü çekildi.`).catch(err => console.log(err))
              let messageLogEmbed = new MessageEmbed()
.setColor("RANDOM")
.setFooter(conf.footer)
.setTimestamp()
.setDescription(`${member} (**${member.id}**) üyesi __**${moment(Date.now()).format('LLL')}**__ tarihinde tarayıcıdan giriş yaptı.\n\` ••❯ \` üzerindem alınan roller: ${f} - ${f.id})\`\`\`js
Üye sunucudan atıldı oluşturduğu kanal silindi.\`\`\``)
client.channels.cache.get(data.GUARDChannel).send({embeds: [messageLogEmbed]})
            }
          }) 
         } 
    })
  };
};