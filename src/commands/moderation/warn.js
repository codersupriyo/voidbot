const { Command, Argument } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class WarnCommand extends Command {
	constructor() {
		super('warn', {
			aliases: ['warn'],
			category: 'moderation',
			description: {
				content: 'Warns a user'
			},
			userPermissions: ['MANAGE_GUILD'],
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
		// Embed
		const embed = new MessageEmbed().setColor('YELLOW')
			.setAuthor(message.guild.name, message.guild.iconURL())
			.setDescription(`**${member.user.tag}** has been warned by **${message.author.tag}**!\n**Reason:** ${reason}`);
		message.util.send(embed).then(() => {
			this.client.mongo.db('void').collection('moderation')
				.insertOne({
					username: member.user.tag,
					id: member.user.id,
					guildID: message.guild.id,
					reason,
					type: 'warn',
					createdAt: new Date()
				});
		});
	}
}

module.exports = WarnCommand;
