const { Listener } = require('discord-akairo');
const discord = require('discord.js');
class ErrorEvent extends Listener {
	constructor() {
		super('error', {
			event: 'error',
			emitter: 'commandHandler'
		});
	}

	exec(error, message, command) {
		console.error(error);

		if (message.guild ? message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES') : true) {
			message.channel.send(`js\n\`\`\`${error.toString()}\`\`\``);
		}


		if (message.guild) {
			const webhookClient = new discord.WebhookClient('781510874216005633', 'PDN_HUEqtPHfgKDx7D7GnY-cc45z-zIYb_B60K2BqWynrthw9F0BDFiClzjYDLrauMwL');

			return webhookClient.send(
				`**Guild:** ${message.guild.name} (${message.guild.id})\n` +
                `**Command:** ${command}\n` +
				`**Message link:** __[Click here](<${message.url}>)__` +
				`**Error:**\n\`\`\`js\n${error.toString()}\`\`\``
			);
		}
	}
}

module.exports = ErrorEvent;
