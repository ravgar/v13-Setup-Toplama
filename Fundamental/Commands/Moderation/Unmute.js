let sunucuayar = require("../../models/sunucuayar");
const {
    MessageEmbed,
    Discord
} = require("discord.js");
let vmuteInterval = require("../../models/vmuteInterval");
let muteInterval = require("../../models/muteInterval");
const ceza = require("../../models/ceza");
const { MessageActionRow, MessageSelectMenu, MessageButton} = require('discord.js');


module.exports.run = async (client, message, args, durum, kanal) => {
	if (!message.guild) return;
    let data = await sunucuayar.findOne({});
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!target) return message.reply("Geçerli bir üye belirt");
    let cezalar = await ceza.find({userID: target.id});
    if (cezalar.length == 0) {cezalar = [{Puan: 0}, {Puan: 0}];};
    const button = new MessageButton()
    .setCustomId('uncmute')
    .setLabel('Un Chat Mute')
    .setStyle('SECONDARY').setDisabled(true)
    const button2 = new MessageButton()
    .setCustomId('unvmute')
    .setLabel('Un Voice Mute')
    .setStyle('SECONDARY').setDisabled(true)
    const rowButton = new MessageActionRow().addComponents(button, button2)
    let kontrolcmute = await muteInterval.find({userID: target.id});
    let kontrolvmute = await vmuteInterval.find({userID: target.id}); 
  
    kontrolcmute.forEach(async memberData => {
        let mission = memberData.muted;
            if (mission == true) {
                button.setDisabled(false)
            }})                
            kontrolvmute.forEach(async memberData => {
                let mission = memberData.muted;
                    if (mission == true) {
                        button2.setDisabled(false)
                    }})                
        
              
              
const embed2 = new MessageEmbed().setFooter("60 Saniye içerisinde karar vermelisin 60 saniye sonunda butonlar de-aktif olmaktadır.").setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}))
.setDescription(`${target} (**${target.id}**) adlı üyenin kaldırmak istediğin ceza-i işlemini butonları kullanarak belirt.`)
let msg = await message.channel.send({ components: [rowButton], embeds: [embed2] })
var filter = (button) => button.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
collector.on("collect", async (button) => {
        if (button.customId === "uncmute") {
            const cmuteembed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setDescription(`${target} (**${target.id}**) adlı üyenin Chat-Mute cezasını başarılı bir şekilde kaldırdın.`)
            let muteRol = data.MUTED;
            let server = await sunucuayar.findOne({guildID: message.guild.id});  
            if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server.EnAltYetkiliRol) && !server.MUTEAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return; 
                        if (!target.roles.cache.get(muteRol)) return message.reply("Etiketlediğiniz kullanıcı zaten mutesiz ?");
                await muteInterval.deleteOne({userID: target.id}).exec();
                rowButton.components[0].setDisabled(true) 
                rowButton.components[1].setDisabled(true) 
                await target.roles.remove(muteRol).then(async (user) => { await button.update({components: [rowButton], embeds: [cmuteembed]});
            });
        };
        if (button.customId === "unvmute") {
            let muteRol = data.VMUTED;
            let server2 = await sunucuayar.findOne({guildID: message.guild.id});  
            if(!message.member.permissions.has("8") && !message.member.roles.cache.has(server2.EnAltYetkiliRol) && !server2.VMUTEAuthorized.some(rol => message.member.roles.cache.has(rol))  &&!server2.UstYetkiliRol.some(rol => message.member.roles.cache.has(rol))) return;
                const vmuteembed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setDescription(`${target} (**${target.id}**) adlı üyenin Voice-Mute cezasını başarılı bir şekilde kaldırdın.`)
                rowButton.components[0].setDisabled(true) 
                rowButton.components[1].setDisabled(true) 
                button.update({components: [rowButton], embeds: [vmuteembed]})
                await target.roles.remove(muteRol).catch(() => {});
                await vmuteInterval.deleteOne({userID: target.id}).exec();
                await target.voice.setMute(false).catch(() => {});

        };

    })
}
exports.conf = {aliases: ["unmute","unsesmute", "sesmute-kaldır", "unvoicemute", "voicemutekaldır", "unsmute"]}
exports.help = {name: 'unvmute'}
