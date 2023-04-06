    const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
    const { MessageEmbed, Discord } = require("discord.js");
    module.exports.run = async (client, message, args, durum, kanal) => {
        if (!message.guild) return;
        if(kanal) return;
        let Embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RANDOM");
        let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
        const bannerHash = (await client.api.users[victim.id].get()).banner;
        if(!bannerHash) return message.channel.send(`${client.emojis.cache.find(x => x.name == "wex_cancel")} Belirtilen Üyenin Arkaplanı Bulunmadı!`).then(e => setTimeout(() => e.delete().catch(() => { }), 15000))
        const banner = !bannerHash ? `https://images-ext-2.discordapp.net/external/-OXbEcwb-h30h0TQmUM7xCOemMmn4lZeJtZMpSgWMtg/%3Fsize%3D4096/https/cdn.discordapp.com/banners/852681367853465610/a_364822477a2e994552905134288a64b2.gif` : `https://cdn.discordapp.com/banners/${
          victim.id
        }/${bannerHash}${bannerHash.startsWith("a_") ? ".gif" : ".png"}?size=4096`; 
        let avatar = victim.avatarURL({ dynamic: true, size: 2048 });
                const row = new MessageActionRow().addComponents(
            new MessageButton().setLabel(`LINK`).setStyle(5).setURL(banner)) 
            let msg = await message.channel.send({ components: [row], embeds: [Embed.setImage(banner)]})
            var filter = (button) => button.user.id === message.author.id;
            const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
            
        
    }
    exports.conf = {aliases: ["bannercık", "banners"]}
    exports.help = {name: 'banner'}
    