const { MessageEmbed } = require("discord.js");
let mongoose = require("mongoose");
const Discord = require("discord.js")
const sunucuayar = require("../../models/sunucuayar")
let afk = require("../../models/afk")
const Canvas = require("canvas")
let moment = require("moment");
require("moment-duration-format");
moment.locale("tr")
module.exports.run = async (client, message, args, durum) => {
	if (!message.guild) return;
    let kanallar = ["ship-komut"]
	if (!kanallar.includes(message.channel.name)) return;
    let server = await sunucuayar.findOne({guildID: message.guild.id});  

    const sayı = Math.floor(Math.random() * 100);
        
    let mesaj;
    if(sayı > 75 && sayı < 100) mesaj = `❤️ 🔥 Siz çok yakıştınız sanki ? (**%${sayı}**)`
    if(sayı > 55 && sayı < 75) mesaj = `😉 Yani fazla şey demimde bi deneyin yani (**%${sayı}**)`
    if(sayı > 0 && sayı < 55) mesaj = `🤮 Sizden olmaz başkasını dene valla. (**%${sayı}**)`

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d")
    const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/731112308134248469/949078364445081620/hearts.png")
    ctx.drawImage(bg, 0, 0, 700, 250)
    ctx.font = "75px Sans-serif"
    ctx.fillStyle = "#f0f0f0"

    const messageAuthor = await Canvas.loadImage(message.author.displayAvatarURL({ format: "png" }))
    ctx.drawImage(messageAuthor, 50, 25, 200, 200)

    const heart = await Canvas.loadImage("https://cdn.discordapp.com/attachments/927571230134009856/975157787002826762/zadekalp.png")
    const broken = await Canvas.loadImage("https://cdn.discordapp.com/attachments/927571230134009856/975157787678093342/zadekirikkalp.png")
    const think = await Canvas.loadImage("https://cdn.discordapp.com/attachments/731112308134248469/949237394736037938/thnk.png")

    if(message.member.roles.cache.has(server.MAN[0])) {
       
    const member = message.guild.members.cache.filter(uye => uye.roles.cache.has(server.WOMAN[0])).random()

    const targetMention = await Canvas.loadImage(member.displayAvatarURL({ format: "png" }))
    ctx.drawImage(targetMention, 450, 25, 200, 200)



    if(sayı > 55 && sayı > 75) {
        ctx.drawImage(heart, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
        .setDescription(`${mesaj}`)
        .setImage(`attachment://hearts.png`)
        .setColor('RANDOM')
        message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
        return
    }

    if(sayı > 55 && sayı < 75) {
        ctx.drawImage(think, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
        .setDescription(`${mesaj}`)
        .setImage(`attachment://hearts.png`)
        .setColor('RANDOM')
        message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
        return
    }

    if(sayı > 0 && sayı < 55) {
        ctx.drawImage(broken, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
        .setDescription(`${mesaj}`)
        .setImage(`attachment://hearts.png`)
        .setColor('RANDOM')
        .addField(`☁ **${member.displayName}** seni **${message.member.displayName}** Çok Mu Seviyor?`,
        `💟 ${Math.floor(love)}%\n\n${loveLevel}`);
        message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
        return;

    message.channel.send({content: `${person}`,embeds: [embed.setImage("attachment://ship.png")], files: [img]});

    }
} else if(message.member.roles.cache.has(server.WOMAN[0])) {
    const member = message.guild.members.cache.filter(uye => uye.roles.cache.has(server.MAN[0])).random()

    const targetMention = await Canvas.loadImage(member.displayAvatarURL({ format: "png" }))
    ctx.drawImage(targetMention, 400, 25, 200, 200)

    if(sayı > 55 && sayı > 75) {
        ctx.drawImage(heart, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
        .setDescription(`${mesaj}`)
        .setImage(`attachment://hearts.png`)
        .setColor('RANDOM')
        message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
        return
    }

    if(sayı > 55 && sayı < 75) {
        ctx.drawImage(think, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
        .setDescription(`${mesaj}`)
        .setImage(`attachment://hearts.png`)
        .setColor('RANDOM')
        message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
        return
    }

    if(sayı > 0 && sayı < 55) {
        ctx.drawImage(broken, 275, 60, 150, 150)
        let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
        let embed = new Discord.MessageEmbed()
        .setDescription(`${mesaj}`)
        .setImage(`attachment://hearts.png`)
        .setColor('RANDOM')
        message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
        return;
    }
}


}
exports.conf = {aliases: ["sevgi"]};
exports.help = {name: 'ship'};
