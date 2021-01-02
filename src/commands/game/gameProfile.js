const { Command } = require('discord-akairo');
const { MessageEmbed, User } = require('discord.js');

class GameProfileCommand extends Command {
	constructor() {
		super('profile', {
			aliases: ['profile', 'gameprofile'],
			category: 'game',
			channel: 'guild',
			cooldown: 5000,
			description: {
				content: 'Displays game profile of a user.',
				usage: ['', '@mention'],
				examples: ['', '@Supriyo#2199']
			},
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
			]
		});
	}

	/**
	 * @param {Message} message - The message object.
	 * @param {Object} args - The args object.
	 * @param {User} args.user - The user whose information is requested.
	 * @return {*}
	 */

	 async exec(message, { user }) {
		/* Pulling data for each game from the database */

		// Valorant
		 const valoData = await this.client.mongo.db('void').collection('valorant')
			 .findOne({ user: user.id });
		let valorant;
		if (valoData) {
			valorant = await valoData.inGameName;
		}

		 // Apex Legends
		 const apexData = await this.client.mongo.db('void').collection('apexlegends')
			 .findOne({ user: user.id });
		 let apexLegends;
		 if (apexData) {
			apexLegends = await apexData.inGameName;
		}

		 // Minecraft
		 const mcData = await this.client.mongo.db('void').collection('minecraft')
			 .findOne({ user: user.id });
		 let minecraft;
		 if (mcData) {
			 minecraft = await mcData.inGameName;
		 }

		 // Free Fire
		 const ffData = await this.client.mongo.db('void').collection('freefire')
			 .findOne({ user: user.id });
		 let firefire;
		 if (ffData) {
			 firefire = await ffData.inGameName;
		 }

		 // Call of Duty
		 const codData = await this.client.mongo.db('void').collection('cod')
			 .findOne({ user: user.id });
		 let cod;
		 if (codData) {
			 cod = await codData.inGameName;
		 }

		 // Fortnite
		 const fnData = await this.client.mongo.db('void').collection('fortnite')
			 .findOne({ user: user.id });
		 let fortnite;
		 if (fnData) {
			 fortnite = await fnData.inGameName;
		 }

		//  Embed
		const embed = new MessageEmbed().setColor('YELLOW')
			.setAuthor(user.tag, user.avatarURL());
		if (valoData) embed.addField('Valorant', `**Name:** ${valorant}`);
		if (apexData) embed.addField('Apex Legends', `**Name:** ${apexLegends}`);
		if (mcData) embed.addField('Minecraft', `**Name:** ${minecraft}`);
		if (ffData) embed.addField('Free Fire', `**Name:** ${firefire}`);
		if (codData) embed.addField('Call of Duty', `**Name:** ${cod}`);
		if (fnData) embed.addField('Fortnite', `**Name:** ${fortnite}`);
		embed.setTimestamp();
		return message.util.send(embed);
	 }
}
module.exports = GameProfileCommand;
