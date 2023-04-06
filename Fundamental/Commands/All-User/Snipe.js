

const { MessageEmbed, Discord } = require("discord.js");
let moment = require("moment");
moment.locale("tr")
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
    if (durum) {
        let mesaj = client.snipe.get(message.channel.id)
        if (!mesaj) return message.react(client.emojis.cache.find(x => x.name == "wex_carpi"))
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setAuthor(mesaj.author.tag, mesaj.author.displayAvatarURL({ dynamic: true }))
            .setDescription(mesaj.content)
            .setFooter("Silinen Tarih: " + moment(mesaj.createdTimestamp).add(3, 'hour').format("ll") + ", " + moment(mesaj.createdTimestamp).add(3, 'hour').format("LTS"))
        message.channel.send({embeds: [embed]}).then(msg => { msg.delete({ timeout: 3500 }) })
        client.snipe.delete(message.channel.id)
    } else return
}
exports.conf = {aliases: ["snipe"]}
exports.help = {name: 'Snipe'}
