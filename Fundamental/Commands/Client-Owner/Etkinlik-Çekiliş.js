const Discord = require('discord.js');
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
exports.run = async function(client, message, params) {
  if (!message.guild) return
  if(!client.ayarlar.sahip.some(x => x == message.author.id)) return
  const rowcuk = new MessageActionRow().addComponents(
    new MessageButton()
    .setCustomId('etkinnlikKatilimcisi')
    .setLabel(`Etkinlik Katılımcısı`)
    .setStyle('SECONDARY')
    .setEmoji("904403680449667122"),
    new MessageButton()
    .setCustomId('cekilisKatilimcisi')
    .setLabel(`Çekiliş Katılımcısı`)
    .setStyle('SECONDARY')
    .setEmoji("740684333370703923"),
    new MessageButton()
    .setCustomId('turnuvakatılım')
    .setLabel(`Çekiliş Katılımcısı`)
    .setStyle('SECONDARY')
    .setEmoji("1000091316937576509"),)
    message.channel.send({ components: [rowcuk], content: `Selamlar, **${message.guild.name}** Üyeleri\nÇekiliş katılımcısı alarak ${client.emojis.cache.find(x => x.name == "wex_netflix")}, ${client.emojis.cache.find(x => x.name == "wex_spotify")}, ${client.emojis.cache.find(x => x.name == "wex_nitro")}, ${client.emojis.cache.find(x => x.name == "wex_exxen")}, ${client.emojis.cache.find(x => x.name == "wex_blutv")} gibi çekilişlere katılıp ödüllerin sahibi olabilirsiniz.\nEtkinlik katılımcısı alarak çeşitli etkinliklerin yapıldığı anlarda herkesten önce haberdar olabilirsiniz ve çekilişlere önceden katılma hakkı kazanabilirsiniz.\nTurnuva Katılımcısı alarak ise sunucumuzda gerçekleşen turnuvalardan erken haberdar olabilirsin.\n\`NOT:\` Kayıtlı , kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Bu sunucumuzda everyone here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\n\n__Aşağıda ki butonlara basarak siz de bu ödülleri kazanmaya hemen başlayabilirsiniz!__`})
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ec-rol-alma', 'ecrolal'],
  permLevel: 4
};

exports.help = {
  name: 'etkinlikcekilis',
  description: "Botu yeniden başlatmaya yarar",
  usage: 'yenile',
  kategori: "Bot Yapımcısı"
};
