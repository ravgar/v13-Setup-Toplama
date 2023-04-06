const {Collection} = require('discord.js');
const sunucuayar = require("../models/sunucuayar")
/**
 * @param { Client } ready
 */
const { joinVoiceChannel } = require("@discordjs/voice");
module.exports = async client => {
  let data = await sunucuayar.findOne({guildID: client.ayarlar.sunucuId});
  if (!data) console.log("Sunucu ayarları başarıyla yüklendi! artık kurulum yapabilirsiniz!"),await sunucuayar.updateOne({}, {guildID: client.ayarlar.sunucuId}, {upsert: true, setDefaultsOnInsert: true}).exec();


     const guild = client.guilds.cache.get(client.ayarlar.sunucuId)
  guild.invites.fetch().then((guildInvites) => {
    const cacheInvites = new Collection();
    guildInvites.map((inv) => {
      cacheInvites.set(inv.code, { code: inv.code, uses: inv.uses, inviter: inv.inviter });
    });
    client.invites.set(guild.id, cacheInvites);
  });
  

};