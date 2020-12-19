const { Listener } = require('discord-akairo');

class CooldownEvent extends Listener {
	constructor() {
		super('cooldown', {
			event: 'cooldown',
			emitter: 'commandHandler',
			category: 'commandHandler'
		});
	}

	exec(message, command, remaining) {
		const time = remaining / 1000;
		// const tag = message.guild ? `${message.guild.name}/${message.author.tag}` : `${message.author.tag}`;

		if (message.guild ? message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES') : true) {
			return message.reply(`you can use the **${command} command** again in in **${time} seconds.**`);
		}
	}
}

module.exports = CooldownEvent;
