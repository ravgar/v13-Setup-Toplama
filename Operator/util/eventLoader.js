const reqEvent = (event) => require(`../Events/${event}`);
module.exports = client => {
  client.on('ready', () => reqEvent('ready')(client));
  client.on('message', reqEvent('message'));
  client.on('ready', reqEvent('ReadyStats'));
  client.on('guildMemberAdd', reqEvent('guildMemberAdd'));
  client.on('guildMemberRemove', reqEvent('guildMemberRemove'));
  client.on('guildMemberAdd', reqEvent('İnviteMemberAdd'));
  client.on('inviteDelete', reqEvent('İnviteDelete'));
  client.on('inviteCreate', reqEvent('İnviteCreate'));
  client.on('guildMemberRemove', reqEvent('İnviteMemberRemove'));
};
