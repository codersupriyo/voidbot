const { Listener } = require('discord-akairo');

class GuildMemberRemoveListener extends Listener {
	constructor() {
		super('guildMemberRemove', {
			emitter: 'client',
			event: 'guildMemberRemove',
			category: 'client'
		});
	}

	exec(member) {
		const embed = this.client.util.embed().setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL())
			.setFooter('User Left')
			.setColor('RED')
			.setTimestamp();
		return member.guild.channels.cache.get('779726621971972107').send(embed);
	}
}

module.exports = GuildMemberRemoveListener;
