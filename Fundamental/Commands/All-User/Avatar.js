    const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
    const { MessageEmbed, Discord } = require("discord.js");
    module.exports.run = async (client, message, args, durum, kanal) => {
        if (!message.guild) return;
        if(kanal) return;
        let Embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RANDOM");
        let victim = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
        let avatar = victim.avatarURL({ dynamic: true, size: 2048 });
            const row = new MessageActionRow().addComponents(
            new MessageButton().setLabel(`LINK`).setStyle(5).setURL(avatar)) 
            let msg = await message.channel.send({ components: [row], embeds: [Embed.setImage(avatar)]})
            var filter = (button) => button.user.id === message.author.id;
            const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
            
        
    }
    exports.conf = {aliases: ["Avatar", "pp"]}
    exports.help = {name: 'avatar'}
    