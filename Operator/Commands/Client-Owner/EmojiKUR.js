const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js');

exports.run = async (client, message, args, durum, kanal) => {
  if (!message.guild) return;
  let guild = message.guild;
  if (!client.ayarlar.sahip.some(x => x === message.author.id)) return
	if(args[0] === "kur" || args[0] === "kurulum") {
    
    let onay = "https://cdn.discordapp.com/emojis/992495462877761586.gif?v=1";
    let onay2 = "https://cdn.discordapp.com/emojis/995761582984400936.png?v=1";
    let iptal = "https://cdn.discordapp.com/emojis/992496834398404678.gif?v=1"; 
    let iptal2 = "https://cdn.discordapp.com/emojis/995761605210026094.png?v=1"; 
    let bosta = "https://cdn.discordapp.com/emojis/673576453140512788.png?v=1";
    let rahatsizetmeyin = "https://cdn.discordapp.com/emojis/673576231433797664.png?v=1";
    let gorunmez = "https://cdn.discordapp.com/emojis/673576417224556611.png?v=1";
    let cevrimici = "https://cdn.discordapp.com/emojis/673576292205068314.png?v=1";
    let yildiz = "https://cdn.discordapp.com/emojis/991357112083021964.gif?v=1";
    let wex_vmute = "https://cdn.discordapp.com/attachments/811975658963992647/812894209706950656/sesmuteat.png";
    let wex_mute = "https://cdn.discordapp.com/attachments/811975658963992647/812894244632788992/muteat.png";
    let wex_vunmute = "https://cdn.discordapp.com/attachments/811975658963992647/812894192530751518/sesmuteac.png";
    let wex_unmute = "https://cdn.discordapp.com/attachments/811975658963992647/812894234242973716/muteac.png";
    let wex_stat = "https://cdn.discordapp.com/emojis/813380585338699806.png?v=1";
    let wex_erkek = "https://cdn.discordapp.com/emojis/782554741896773633.gif?v=1";
    let wex_kadin = "https://cdn.discordapp.com/emojis/782554741669888000.gif?v=1";
    let wex_bitisbar = "https://cdn.discordapp.com/emojis/1001111608367521852.png?v=1";
    let wex_solbar =  "https://cdn.discordapp.com/emojis/1001111603757981777.png?v=1";
    let wex_ortabar = "https://cdn.discordapp.com/emojis/1001111605351825408.png?v=1";
    let wex_ban = "https://cdn.discordapp.com/emojis/946070076271001670.png?v=1";
    let wex_jail = "https://cdn.discordapp.com/emojis/939679320551616543.png?v=1";
    let wex_baslangicbar = "https://cdn.discordapp.com/emojis/1001111610221395988.png?v=1";
    let wex_gribitisbar = "https://cdn.discordapp.com/emojis/1001111614667378748.png?v=1";
    let wex_griortabar = "https://cdn.discordapp.com/emojis/1001111612905754674.png?v=1";
    let wex_deynek = "https://cdn.discordapp.com/emojis/1001111614667378748.gif?v=1"
    let wex_aboo = "https://cdn.discordapp.com/emojis/771485096741830686.png?v=1"
    let wex_afk = "https://cdn.discordapp.com/emojis/776764964009672704.png?v=1"
    let wex_reg = "https://cdn.discordapp.com/emojis/960484302678790174.png?v=1"

    guild.emojis.create(wex_vmute, "wex_vmute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_mute, "wex_mute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_vunmute, "wex_vunmute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_unmute, "wex_unmute").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_deynek, "wex_deynek").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(onay, "wex_tik").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(onay2, "wex_succes").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(iptal, "wex_carpi").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(iptal2, "wex_cancel").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(bosta, "wex_away").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(rahatsizetmeyin, "wex_dnd").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(gorunmez, "wex_offline").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(cevrimici, "wex_online").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_baslangicbar, "wex_baslangicbar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_bitisbar, "wex_bitisbar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_solbar, "wex_solbar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_ortabar, "wex_ortabar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_gribitisbar, "wex_gribitisbar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_griortabar, "wex_griortabar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(yildiz, "wex_imaj").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_ban, "wex_ban").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_jail, "wex_jail").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_aboo, "wex_aboo").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_afk, "wex_afk").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(wex_reg, "wex_reg_onay").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);

    
  
    return;
  };
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['emojis'],
    permLevel: 4
  };
  
  exports.help = {
    name: 'emoji',
    description: "Sunucuda komut denemeye yarar",
    usage: 'eval <kod>',
    kategori: "Bot Yapımcısı"
  };
  