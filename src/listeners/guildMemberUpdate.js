const { Listener } = require('discord-akairo');

class guildMemberUpdateEvent extends Listener {
	constructor() {
		super('guildMemberUpdate', {
			event: 'guildMemberUpdate',
			emitter: 'client'
		});
	}

	exec(oldMember, newMember) {
		// On nickname change
		// this.client.channels.cache.get('580400301677477942').send(`${oldMember.user.tag}'s nickname changed from **${oldMember.nickname}** to **${newMember.nickname}**`);
		// On role change
		/* this.client.channels.cache.get('580400301677477942').send(`**Old:** ${oldMember._roles}`);
		this.client.channels.cache.get('580400301677477942').send(`**New:** ${newMember._roles}`); */
		/* if (oldMember.nickname || oldMember.nickname.toLowerCase() !== newMember.nickname.toLowerCase()) {
			this.client.channels.cache.get('779726621971972107').send(`${oldMember.user}'s nickname changed from **${oldMember.nickname}** to **${newMember.nickname}**`);
		} */
		if (newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id)).size) {
			this.client.channels.cache.get('779726621971972107').send(
				`${newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id)).map(role => role).join(', ')} role was added to ${oldMember.user}`
			);
		}

		if (oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id)).size) {
			this.client.channels.cache.get('779726621971972107').send(
				`${oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id)).map(role => role).join(', ')} role was removed from ${oldMember.user}`
			);
		}
		// console.log(oldMember.roles.cache);
		// console.log(newMember.roles.cache);
	}
}

module.exports = guildMemberUpdateEvent;
