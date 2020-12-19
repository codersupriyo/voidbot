const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class KickCommand extends Command {
	constructor() {
		super('kick', {
			aliases: ['kick'],
			category: 'moderation',
			description: {},
			userPermissions: ['KICK_MEMBERS'],
			clientPermissions: ['KICK_MEMBERS'],
			cooldown: 3000,
			channel: 'guild',
			args: [
				{
					id: 'member',
					type: 'member',
					prompt: {
						start: 'Mention the user',
						retry: 'Please mention a valid user'
					}
				},
				{
					id: 'reason',
					type: 'rest',
					prompt: {
						start: 'Enter the reason'
					}
				}
			]
		});
	}

	async exec(message, { member, reason }) {
		member.kick(reason).then(() => {
			message.util.send(`${member.user} has been kicked by ${message.author} because: ${reason}.`);
			this.client.mongo.db('void').collection('moderation')
				.insertOne({
					username: member.user.tag,
					id: member.user.id,
					guildID: message.guild.id,
					reason,
					type: 'kick',
					createdAt: new Date()
				});
		}).catch(err => {
			const embed = this.client.util.embed().setColor('RED')
				.setDescription([
					`I do not have the *permission* to kick \`${member.user.tag}\`.`
				]);
			return message.util.send({ embed });
		});
	}
}

module.exports = KickCommand;
