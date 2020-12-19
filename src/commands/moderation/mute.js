const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class MuteCommand extends Command {
	constructor() {
		super('mute', {
			aliases: ['mute'],
			category: 'moderation',
			description: {
				content: 'Mutes a user'
			},
			userPermissions: ['MANAGE_GUILD'],
			clientPermissions: ['MANAGE_ROLES'],
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: 'Mention the user.',
						retry: 'Mention a valid user please!'
					}
				},
				{
					id: 'reason',
					match: 'rest',
					type: Argument.validate('string', (m, p, str) => str.length < 200),
					prompt: {
						start: 'Write the reason'
					}
				}
			]
		});
	}

	async exec(message, { member, reason }) {
		// Role [Muted]
		const role = message.guild.roles.cache.get('771777379331735553');

		// Embed
		const embed = new MessageEmbed().setColor('RED')
			.setAuthor(`Action by: ${message.author.username}`, message.author.avatarURL())
			.setDescription([
				'• **Action:** `Mute`',
				`• **User:** ${member.user}`,
				`• **Reason:** ${reason}`
			])
			.setTimestamp();

		// Adding the role
		member.roles.add(role).then(() =>
			message.util.send(embed).then(() => {
				this.client.mongo.db('void').collection('moderation')
					.insertOne({
						username: member.user.tag,
						id: member.user.id,
						guildID: message.guild.id,
						reason,
						type: 'mute',
						createdAt: new Date()
					});
			}));
	}
}

module.exports = MuteCommand;
