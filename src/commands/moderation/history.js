const { Command } = require('discord-akairo');
const { Message, MessageEmbed, User } = require('discord.js');

class HistoryCommand extends Command {
	constructor() {
		super('history', {
			aliases: ['history', 'record'],
			category: 'moderation',
			description: {
				content: 'Check the history of a member.'
			},
			cooldown: 3000,
			channel: 'guild',
			clientPermissions: ['MANAGE_GUILD'],
			args: [{
				id: 'user',
				type: async (msg, phrase) => {
					if (!phrase || phrase.length < 2) return msg.author;
					// Check if the input phrase can resolve to a user or not.
					const resolvedUser = this.handler.resolver.type('user')(msg, phrase);

					// Return the user if resolved.
					if (resolvedUser) return resolvedUser;

					// Check if the string matches the discord id format or not.
					if (!/^[0-9]*$/.test(phrase)) return msg.author;

					// If it does, try to fetch the user from id.
					const user = await this.client.users.fetch(phrase);

					// If user couldn't be fetched, return the author.
					if (!user) return msg.author;

					// Else return the user.
					return user;
				}
			}]
		});
	}

	/**
	 * @param {Message} message - The message object.
	 * @param {Object} args - The args object.
	 * @param {User} args.user - The user whose information is requested.
	 * @returns {*}
	 */

	async exec(message, { user }) {
		// Warn Count
		const warn = await this.client.mongo.db('void').collection('moderation')
			.find({
				id: user.id,
				guildID: message.guild.id,
				type: 'warn'
			})
			.count();

		// Mute Count
		const mute = await this.client.mongo.db('void').collection('moderation')
			.find({
				id: user.id,
				guildID: message.guild.id,
				type: 'mute'
			})
			.count();

		// Kick count
		const kick = await this.client.mongo.db('void').collection('moderation')
			.find({
				id: user.id,
				guildID: message.guild.id,
				type: 'kick'
			})
			.count();

		// Ban count
		const ban = await this.client.mongo.db('void').collection('moderation')
			.find({
				id: user.id,
				guildID: message.guild.id,
				type: 'ban'
			})
			.count();

		// Embed
		const embed = new MessageEmbed().setColor('GREEN')
			.setAuthor(`${user.tag} (${user.id})`, user.avatarURL())
			.setFooter(`${warn} warns, ${mute} mutes, ${kick} kicks and ${ban} bans`);
		return message.util.send(embed);
	}
}

module.exports = HistoryCommand;
