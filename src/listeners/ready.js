const { Listener } = require('discord-akairo');
const logger = require('../util/logger');

class ReadyEvent extends Listener {
	constructor() {
		super('ready', {
			event: 'ready',
			emitter: 'client'
		});
	}

	async exec() {
		// Client activity
		this.client.user.setActivity('The Void',
			{
				type: 'PLAYING'
			});


		logger.info(`I am ${this.client.user.tag}.`);
	}
}

module.exports = ReadyEvent;
