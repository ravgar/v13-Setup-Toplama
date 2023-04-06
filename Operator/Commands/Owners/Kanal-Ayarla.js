let hak = new Map();
module.exports.run = async (client, message, args, durum, kanal) => {
    if (!message.guild) return;

    if (message.member.permissions.has("ADMINISTRATOR") || durum) {
        let sec = args[0];
        if (sec === "limit") {
            if (message.member.voice.channel) {
                const miktar = Number(args[1]);
                if (!miktar) return;
                if (miktar > 99) return;
                if (miktar < 0) return;
                client.channels.cache.get(message.member.voice.channel.id).edit({userLimit: miktar})
                message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_tik")} Başarılı bir şekilde ses kanalının limitini \`${miktar}\` olarak değiştirdin.`);
            }
        };

        if (sec === "isim") {
            if (message.member.voice.channel) {
                let kanalhak = hak.get(message.member.voice.channel.id) || 0;
                const miktar = args.slice(1);
                if (!miktar) return;
                hak.set(message.member.voice.channel.id, (kanalhak+1));
                setTimeout(() => {
                    hak.delete(message.member.voice.channel.id)
                }, 1000*60*2);
                if (kanalhak >= 2) return message.reply(`${client.emojis.cache.find(x => x.name === "wex_cancel")} Limiti Aştığın için işlem iptal edildi.`);
                client.channels.cache.get(message.member.voice.channel.id).setName(miktar.join(" ")).then(x => {
                    message.channel.send(`${client.emojis.cache.find(x => x.name === "wex_tik")} Başarılı bir şekilde ses kanalının adını \`${miktar.join(" ")}\` olarak değiştirdin.`);
                })
            }
        }
    
    }

}
exports.conf = {
    aliases: []
}
exports.help = {
    name: 'kanal'
}