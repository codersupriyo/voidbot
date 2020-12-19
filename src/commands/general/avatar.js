const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class UserAvatar extends Command {
	constructor() {
		super('avatar', {
			aliases: ['avatar', 'av', 'dp'],
			category: 'general',
			description: {
				content: 'User avatar'
			},
			args: [
				{
					id: 'user',
					type: 'user',
					default: message => message.author
				}
			]
		});
	}

	async exec(message, { user }) {
		const embed = new MessageEmbed().setColor('RED')
			.setAuthor(user.tag, user.avatarURL({ dynamic: true }))
			.setImage(user.avatarURL({ dynamic: true, size: 4096 }))
			.setTimestamp()
			.setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true }));
		return message.util.send(embed);
	}
}

module.exports = UserAvatar;
