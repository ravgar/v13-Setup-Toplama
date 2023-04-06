const { MessageEmbed             } = require("discord.js");
const {Discord, MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    if (kanal) return
    
    if (!message.member.voice.channel) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Herhangi bir ses kanalına bağlı olman gerekli.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
    let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!kullanici) return message.reply(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Geçerli bir üye belirt ve tekrar belirt.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
    if (!kullanici.voice.channel) return message.channel.send(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Belirttiğin üye herhangi bir ses kanalına **bağlı değil**.`);
    if (message.member.voice.channel.id === kullanici.voice.channel.id) return message.channel.send(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Belirttiğin üye ile zaten aynı ses kanalındasın.`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))

    if (message.member.permissions.has("8")) {
      kullanici.voice.setChannel(message.member.voice.channelID);
    } else {
        let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("BLUE");
        let embed2 = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RED");
        let embed3 = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("GREEN");
                const row = new MessageActionRow().addComponents(
                    new MessageButton().setCustomId('onayla').setLabel(`Onayla`).setEmoji("1003436509875142686").setStyle('SECONDARY'),
                    new MessageButton().setCustomId('reddet').setLabel(`Reddet`).setEmoji("1003436508155494470").setStyle('SECONDARY'),)
                            let msg = await message.channel.send({ components: [row], embeds: [embed.setDescription(`Hey ${message.author}, aşağıda bulunan butonlara tıklayarak odaya gelip gelmemesini belirtebilirsin.`)] });
            var filter = (button) => button.user.id === kullanici.id;
            const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
            collector.on('collect', async (button, user) => {      
            if(button.customId === "onayla") { msg.delete()
              kullanici.voice.setChannel(message.member.voice.channelID);
              button.update({embeds: [embed3.setDescription(`${client.emojis.cache.find(x => x.name === "wex_tik") || "Emoji Bulunamadı"} ${kullanici} adlı kullanıcının odasına ışınlandın..`)] }),  message.react(`${client.emojis.cache.find(x => x.name === "wex_tik")}`)}
            if(button.customId === "reddet") { 
            button.update({embeds: [embed2.setDescription(`${client.emojis.cache.find(x => x.name === "wex_carpi") || "Emoji Bulunamadı"} ${kullanici} adlı kullanıcı odaya bağlanma istediğini reddetti.`)] })}   
            })
            collector.on('end', async (button, reason) => {
        
                row.components[0].setDisabled(true) 
                row.components[1].setDisabled(true) 
                msg.edit({ components: [row] }); 
        })
        
       };
}
exports.conf = {aliases: ["cek", "Cek", "Çek"]}
exports.help = {name: 'çek'}
