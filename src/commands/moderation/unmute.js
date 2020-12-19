const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class MuteCommand extends Command {
	constructor() {
		super('unmute', {
			aliases: ['unmute'],
			category: 'moderation',
			description: {
				content: 'Unmutes a user'
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
				}
			]
		});
	}

	async exec(message, { member }) {
		// Role [Muted]
		const role = message.guild.roles.cache.get('771777379331735553');

		/* // Fetching the reason from database
		const reason = await this.client.mongo.db('void').collection('moderation')
			.find({
				id: member.user.id,
				guildID: message.guild.id,
				type: 'mute'
			})
			.sort({ createdAt: -1 })
			.limit(1);
		const something = reason.forEach(async el => await el.reason);
		console.log(reason);
		console.log(something);
 */

		// Embed
		const embed = new MessageEmbed().setColor('RED')
			.setAuthor(`Action by: ${message.author.username}`, message.author.avatarURL())
			.setDescription([
				'• **Action:** `Mute`',
				`• **User:** ${member.user}`
				// `• **Was muted because:** ${reason}`
			])
			.setTimestamp();

		// Removing the role
		member.roles.remove(role).then(() => message.util.send(embed));
	}
}

module.exports = MuteCommand;
