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

    let person = message.mentions.users.first() || client.guilds.cache.get(client.ayarlar.sunucuId).members.cache.get(args[0]) 
    if (!person || message.author.id === person.id) {
        person = message.guild.members.cache
       .filter(m => m.id !== message.author.id && !m.roles.cache.get(server.UNREGISTER))
       .random();
       if(server.MAN.some(x => message.member.roles.cache.has(x))) person = message.guild.members.cache
       .filter(m => m.id !== message.author.id && !m.roles.cache.get(server.UNREGISTER))
       .random();
       if(server.WOMAN.some(x => message.member.roles.cache.has(x))) person = message.guild.members.cache
       .filter(m => m.id !== message.author.id && !m.roles.cache.get(server.UNREGISTER))
       .random();
       
    }
    person = message.guild.members.cache.get(person.id)
    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);
    let emoticon;
    if (love > 60) {
        emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_2.png?v=1593651528429'); 
    } else if (love >= 40) {
        emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_3-1.png?v=1593652255529'); 
    } else {
        emoticon = ('https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_1.png?v=1593651511900'); 
    }
    const canvas = Canvas.createCanvas(384, 128);
    const ctx = canvas.getContext('2d');
    const emotes = await Canvas.loadImage(emoticon);
    const avatar1 = await Canvas.loadImage(message.member.displayAvatarURL({ format: "png" }));
    const avatar2 = await Canvas.loadImage(person.displayAvatarURL({ format: "png" }));
    ctx.beginPath();
    ctx.moveTo(0 + Number(10), 0);
    ctx.lineTo(0 + 384 - Number(10), 0);
    ctx.quadraticCurveTo(0 + 384, 0, 0 + 384, 0 + Number(10));
    ctx.lineTo(0 + 384, 0 + 128 - Number(10));
    ctx.quadraticCurveTo(
    0 + 384,
    0 + 128,
    0 + 384 - Number(10),
    0 + 128
    );
    ctx.lineTo(0 + Number(10), 0 + 128);
    ctx.quadraticCurveTo(0, 0 + 128, 0, 0 + 128 - Number(10));
    ctx.lineTo(0, 0 + Number(10));
    ctx.quadraticCurveTo(0, 0, 0 + Number(10), 0);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 384, 128);
    let background = await Canvas.loadImage(client.guilds.cache.get(client.ayarlar.sunucuId).bannerURL({dynamic: true, format: "png"}) + `?size=4096`);
    ctx.drawImage(background, 0, 0, 384, 129);
    ctx.drawImage(emotes, 160, 30, 64, 64);
    ctx.drawImage(avatar1, 20, 20, 96, 96);
    ctx.drawImage(avatar2, 270, 20, 96, 96);
    const img = new MessageAttachment(canvas.toBuffer(), 'ship.png')
    const embed = new MessageEmbed()
        .setColor("RED")
        .addField(`☁ **${person.displayName}** seni **${message.member.displayName}** Çok Mu Seviyor?`,
        `💟 ${Math.floor(love)}%\n\n${loveLevel}`);

    message.channel.send({content: `${person}`,embeds: [embed.setImage("attachment://ship.png")], files: [img]});


}
exports.conf = {aliases: ["sevgi"]};
exports.help = {name: 'asko'};
