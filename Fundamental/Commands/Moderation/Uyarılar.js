const {
	MessageEmbed,
	Discord
} = require("discord.js");
let sunucuayar = require("../../models/sunucuayar");
let uyarı = require("../../models/uyarı");
let moment = require("moment");
module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    
    let server = await sunucuayar.findOne({guildID: message.guild.id});  
    if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.WARNAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return;
		

		if (args[0] === "bak") {
			let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			if (!target) return message.reply("Geçerli bir üye belirt");
			let miktar = await uyarı.find({userID: target.id})
			let embed = new MessageEmbed()
			.setColor("RANDOM")
			.setTimestamp()
			.setAuthor(target.user.tag, target.user.avatarURL({dynamic: true}))
			.setFooter(client.ayarlar.footer)
			.setDescription(`
${target} adlı kişinin son 10 uyarıları (Toplam: **${miktar.length}** uyarı almış!)

${miktar.reverse().map(veri => `[\`${moment(veri.Type.Tarih).locale("tr").format("LLL")}\`] <@!${veri.Type.Yetkili}> yetkili tarafından **${veri.Type.Sebep}** sebebiyle uyarı aldı!`).slice(0,10).join("\n")}
		 	`)
			 return message.channel.send({embeds: [embed]})
		}

		let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
		let reason = args.splice(1).join(" ");
		if (!target) return message.reply("Geçerli bir üye belirt");
		if (!reason) return message.reply("Lütfen bir uyarı sebebi belirtiniz.")
		let miktar = await uyarı.find({userID: target.id})
		miktar = miktar.length;
		let newData = uyarı({
			userID: target.id,
			Type: {Sebep: reason, Tarih: Date.now(), Yetkili: message.author.id}
		})
		newData.save().then(data => {
			if (!data) return;
			let messageEmbed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({
				dynamic: true
			})).setDescription(`:warning: ${target} (**${target.id}**) kullanıcısı ${message.author} tarafından **${reason}** sebebiyle uyarıldı.`)

			 message.channel.send({embeds: [messageEmbed]}).then(sentEmbed => {
				sentEmbed.react(client.emojis.cache.find(res => res.name === "wex_tik"))
		
				let messageLogEmbed = new MessageEmbed()
				.setColor("RANDOM")
				.setAuthor(message.author.tag, message.author.avatarURL({
					dynamic: true
				}))
				.setFooter(conf.footer)
				.setTimestamp()
				.setDescription(`${target} (**${target.id}**) üyesi __**${moment(Date.now()).format('LLL')}**__ tarihinde ${message.author} (**${message.author.id}**) tarafından **${reason}** sebebiyle uyarıldı.`)
				 client.channels.cache.find(x => x.name == "uyarı-log").send({embeds: [messageLogEmbed]});

			})	

		})
}
exports.conf = {
	aliases: ["uyar"]
}
exports.help = {
	name: 'uyarı'
}