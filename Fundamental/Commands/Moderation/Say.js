const {
    MessageEmbed,
    Discord
    } = require("discord.js");
    const conf = client.ayarlar;
    let mongoose = require("mongoose");
    let sunucuayar = require("../../models/sunucuayar");
    module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;
    
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.BANAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "wex_cancel")}`)
    let data = await sunucuayar.findOne({});
    let sunucuTAG = data.TAG;
    let TaglıKullanıcı = await message.guild.members.cache.filter(member => member.user.username.includes(sunucuTAG)).size;
    let ses = message.guild.members.cache.filter(x => x.voice.channel).size
    let bot = message.guild.members.cache.filter(s => s.voice.channel && s.user.bot).size
    let AktifKullanıcı = message.guild.members.cache.filter(member => member.presence && (member.presence.status != "offline")).size
    let Boost = message.guild.premiumSubscriptionCount;
    let BoostLevel = message.guild.premiumTier;
    let Embed = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.tag, message.author.avatarURL({
dynamic: true}))
    message.reply({ embeds: [Embed.setDescription(`\`❯\` Şu anda toplam **${ses-bot || "0"}** (**+${bot || "0"} bot**) kişi seslide.
\`❯\` Sunucumuzda şuanda **${TaglıKullanıcı}** kişi tagımızı alarak bizi destekliyor. (\`${sunucuTAG}\`)
\`❯\` Sunucuda **${message.guild.memberCount}** adet üye var (**${AktifKullanıcı}** Aktif).
\`❯\` Toplamda **${Boost}** adet boost basılmış! ve Sunucu **${BoostLevel}** seviye.`)] });

    
    }
    exports.conf = {
    aliases: ["sunucusay", "serversay", "Say"]
    };
    exports.help = {
    name: 'say'
    };
    