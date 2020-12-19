const { Command } = require('discord-akairo');
const { Message, MessageEmbed, User } = require('discord.js');
const moment = require('moment');
// const { parseDuration } = require('../../util/util');
require('moment-duration-format');

class UserInfoCommand extends Command {
	constructor() {
		super('user', {
			aliases: ['user', 'member'],
			args: [
				{
					id: 'user',
					/**
                     * @param {Message} msg - The message object.
                     * @param {string} phrase - The input phrase argument.
                     * @returns {User} - The resolved user.
                     */
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
				}
			],
			category: 'information',
			description: {
				content: 'Get information about a user.',
				usage: '@user',
				examples: ['@Supriyo#2199']
			}
		});
	}

	/**
     * @param {Message} message - The message object.
     * @param {Object} args - The args object.
     * @param {User} args.user - The user whose information is requested.
     * @returns {*}
     */
	exec(message, { user }) {
		const embed = new MessageEmbed();
		embed.setColor('RED')
			.setAuthor(user.tag, user.displayAvatarURL())
			.setTimestamp();

		const member = message.guild?.member(user);
		if (member) {
			let memberInfo = undefined;
			// const joined = parseDuration(Date.now() - member.joinedTimestamp);
			embed.setColor(member.displayColor || 'RED');
			memberInfo = `**__Highest Role:__** ${member.roles.highest}\n` +
                '**__Display Color:__**: ' +
                `${member.displayColor ? `${member.displayHexColor.toUpperCase()}` : 'No Color.'}\n` +
                `**__Joined__**:\n・${moment(member.joinedAt).format('Do MMM, Y [at] kk:mm')}`;
			embed.addField('**__Member:__**', memberInfo);
		}

		const presence = [];
		if (user.presence.activities.length) {
			for (const activity of user.presence.activities) {
				if (activity.name === 'Spotify') {
					presence.push(`・<:spotify:750678896201957418> ${activity.details} | ${activity.state}`);
				} else if (activity.type === 'LISTENING') {
					presence.push(`・🎵 ${activity.details ?? ''} | ${activity.state ?? ''}`);
				} else if (activity.name === 'Custom Status' && activity.state) {
					presence.push(`・💭 ${activity.state.replace('🤷🏻♀', '🤷🏻‍♀️')}`);
				} else if (activity.name === 'Visual Studio Code') {
					let emoji = undefined;
					if (activity.assets.smallText.toLowerCase().includes('insiders')) {
						emoji = '<:insiders:750674384351395900>';
					} else {
						emoji = '<:VSCode:722366120106917919>';
					}
					presence.push(`・${emoji} ${activity.details ?? 'Programming.'} | ${activity.state ?? ''}`);
				} else if (!activity.details && !activity.state) {
					if (!presence.length) presence.push(`・${activity.name ?? 'Nothing.'}`);
				} else {
					presence.push(`・${activity.name} - ${activity.details} | ${activity.state}`);
				}
				if (presence.length === 4) break;
			}
		}

		let device = '';
		if (user.presence?.clientStatus?.mobile) device += '📱';
		if (user.presence?.clientStatus?.desktop) device += '💻';
		if (user.presence?.clientStatus?.web) device += '🌐';

		let { status } = user.presence;
		if (status === 'online') status = { name: 'Online', img: 'https://i.imgur.com/uO93HuD.png' };
		else if (status === 'idle') status = { name: 'Idle', img: 'https://i.imgur.com/y4dEkIj.png' };
		else if (status === 'dnd' && device) status = { name: 'Do Not Disturb', img: 'https://i.imgur.com/qyjnS70.png' };
		else status = { name: 'Offline', img: 'https://i.imgur.com/0zvqqpy.png' };

		embed.setDescription(
			`${user.bot ? '<:bot:750693021246423040> **__BOT__**\n\n' : ''}` +
            `**__ID:__** ${user.id}\n\n` +
            `**__Joined:__**\n・${moment(user.createdAt).format('Do MMM, Y [at] kk:mm')}\n` +
            // `・[${parseDuration(Date.now() - user.createdTimestamp)} ago].\n\n` +
            `${presence.length > 0 ? `**__Status:__**\n${presence.join('\n')}\n` : ''}\n`
		);
		embed.setFooter(`${device} | ${status.name}`, status.img);
		return message.channel.send(embed);
	}
}

module.exports = UserInfoCommand;
