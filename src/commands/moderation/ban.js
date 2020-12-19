const { Command } = require('discord-akairo');
const { MessageEmbed, Message } = require('discord.js');

class BanCommand extends Command {
	constructor() {
		super('ban', {
			aliases: ['ban'],
			category: 'moderation',
			description: {},
			userPermissions: ['BAN_MEMBERS'],
			clientPermissions: ['BAN_MEMBERS'],
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
		message.guild.members.ban(member.id).then(() => {
			message.util.send(`${member.user} has been banned by ${message.author} because: ${reason}.`);
			this.client.mongo.db('void').collection('ban')
				.insertOne({
					username: member.user.tag,
					id: member.user.id,
					guildID: message.guild.id,
					reason,
					type: 'ban',
					createdAt: new Date()
				});
		}).catch(err => {
			const embed = this.client.util.embed().setColor('RED')
				.setDescription([
					`I do not have the *permission* to ban \`${member.user.tag}\`.`
				]);
			return message.util.send({ embed });
		});
	}
}

module.exports = BanCommand;
