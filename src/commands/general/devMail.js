const { Command, Argument } = require('discord-akairo');
const { Message, MessageEmbed } = require('discord.js');

class DevMailCommand extends Command {
	constructor() {
		super('devmail', {
			aliases: ['devmail', 'contact'],
			channel: 'guild',
			cooldown: 5000,
			args: [
				{
					id: 'msg',
					type: 'content',
					/* In case you want to have a character limit, use the below statement with adjustment */
					// type: Argument.validate('string', (m, p, str) => str.length >= 12 && str.length <= 100),
					prompt: {
						start: message => `${message.author}, please enter the message.`,
						retry: 'Please enter a short and descriptive message.',
						cancel: 'Okay, the command has been cancelled and I have not sent anything.'
					}
				}
			]
		});
	}
	/**
	* @param {Message} message - The message object.
	* @param {Object} args - The args object.
	* @param {} args.msg - The message which is to be sent to Dev
	* @return {*}
	*/

	async exec(message, { msg }) {
		// Add condition for blacklisted people here
		// ...

		// Sending message to developer
		const dev = this.client.users.cache.get('427077676235489291');
		dev.send(`**${message.author.tag}:** ${msg}`);

		// Embed for the author
		const embed = new MessageEmbed().setColor('RED')
			.setAuthor('Dev mail sent!', message.author.avatarURL())
			.setDescription(msg)
			.setTimestamp();
		return message.util.send(embed);
	}
}

module.exports = DevMailCommand;
