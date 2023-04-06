const {
    MessageEmbed,
    Discord
} = require("discord.js");
const conf = client.ayarlar
let mongoose = require("mongoose");
let sunucuayar = require("../../models/sunucuayar");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
    if (durum) {
        let Embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RANDOM");
        let bg = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
        let data = await sunucuayar.findOne({guildID: message.guild.id});

        if (args[0] == "add") {
            bg.forEach(r => {
                r.roles.add(data.UNREGISTER)
            });
            message.reply({ embeds: [Embed.setDescription(`${client.emojis.cache.find(x => x.name === "wex_bit")} Sunucuda Rolü Olmayan Kullanıcılara <@&${data.UNREGISTER}> rolü tanılandı. (\`${bg.size}\`)`)] }).catch((err) => console.log(err), message.react(`${client.emojis.cache.find(x => x.name === "wex_onay")}`)).then(e => setTimeout(() => e.delete().catch(() => { }), 20000))
        } else if (!args[0]) {
            message.reply({ embeds: [Embed.setDescription(`${client.emojis.cache.find(x => x.name === "wex_bit")} Sunucuda Rolsüzlere Verilmek için Tanımlanan Rol;
${client.emojis.cache.find(x => x.name === "wex_bit")} Unregister Rol: <@&${data.UNREGISTER}>
${client.emojis.cache.find(x => x.name === "wex_bit")} Sunucuda Rolü Bulunmayan Kullanıcı Sayısı \`${bg.size}\`
            
Kullanıcılara Rolü Vermek için \`.roles add\` komutunu uygula.`)] }).catch((err) => console.log(err), message.react(`${client.emojis.cache.find(x => x.name === "wex_carpi")}`)).then(e => setTimeout(() => e.delete().catch(() => { }), 25000))
        }  

    } else return client.Embed(message.channel.id, `Bu komutu kullanabilmek için Sunucu Sahibi - Bot Sahibi olmalısın!`);
}
exports.conf = {aliases: ["ROLES", "rolsüz"]}
exports.help = {name: 'rolsüz'}
function removeItemOnce(arr, value) { var index = arr.indexOf(value); if (index > -1) { arr.splice(index, 1); } return arr; }