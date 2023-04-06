const Discord = require('discord.js');
exports.run = async function(client, message, params) {
  if (!message.guild) return
  if(!client.ayarlar.sahip.some(x => x == message.author.id)) return
  let guild = message.guild;

      const everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
      message.reply("Log Kanalları Kuruluyor...")
      const Log = await message.guild.channels.create(`${message.guild.name} Log`, {
          type: 'GUILD_CATEGORY',});
        await Log.permissionOverwrites.edit(everyone.id, { VIEW_CHANNEL: false });
        const cmdLog = await message.guild.channels.create(`cmd-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
        const guardLog = await message.guild.channels.create(`nickname-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
        const roleLog = await message.guild.channels.create(`mesaj-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
        const sesLog = await message.guild.channels.create(`tag-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
        const nicknameLog = await message.guild.channels.create(`uyarı-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
        const usernameLog = await message.guild.channels.create(`şüpheli-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
        const streamerLog = await message.guild.channels.create(`görev-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
        const girisLog = await message.guild.channels.create(`giris-cikis-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
        const mesajLog = await message.guild.channels.create(`yetki-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
        const avatarLog = await message.guild.channels.create(`ses-mute-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
        const cmutyeLog = await message.guild.channels.create(`chat-mute-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
  
        const cezaİslem = await message.guild.channels.create(`ban-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
        const yetkiverLog = await message.guild.channels.create(`jail-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
        const shieldsLog = await message.guild.channels.create(`shields-log`, {
          type: 'GUILD_TEXT',
        }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
  

message.channel.send(new MessageEmbed().setColor("BLACK").setDescription(`• Log Kanalları Başarıyla Kuruldu`))

};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['channel'],
  permLevel: 4
};

exports.help = {
  name: 'log',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
