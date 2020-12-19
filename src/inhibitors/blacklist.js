const { Inhibitor } = require('discord-akairo');
const { Message } = require('discord.js');

class BlackListInhibitor extends Inhibitor {
	constructor() {
		super('blacklist', {
			reason: 'blacklist'
		});
	}

	/**
     * @description - This is the blacklist inhibitor. Return true to block people from using your bot.
     * @param {Message} message - The message object.
     * @returns {boolean} - The blacklist status.
     */
	async exec(message) {
		// Get the blacklist from the database.
		const blacklist = await this.client.mongo.db('void').collection('blacklist')
			.find({
				id: message.author.id,
				guildID: message.guild.id
			})
			.count();

		// If blacklist includes the user, block them.
		if (blacklist > 0) return blacklist.includes(message.author.id);
	}
}

module.exports = BlackListInhibitor;
