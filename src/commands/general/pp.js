const { Command } = require('discord-akairo');
const { Message, MessageEmbed } = require('discord.js');

class PPSize extends Command {
	constructor() {
		super('pp', {
			aliases: ['pp'],
			description: { content: 'Evaluates JS code.' },
			args: [
				{
					id: 'user',
                    type: 'user',
                    default: message => message.author
				}
			]
		});
	}

	/**
     * @description - This command is used to evaluate javascript code.
     * @param {Message} message - The message object.
     */
	async exec(message, { user }) {
		const size = `8${Array(Math.floor(Math.random() * 10)).fill('=').join('')}D`;
		return message.util.send(`${user}'s pp:\n${size}`);
	}
}

module.exports = PPSize;
