const { Argument, Command } = require('discord-akairo');
const { Message, MessageEmbed } = require('discord.js');

// Available games
const games = ['valorant', 'apexlegends', 'freefire', 'cod', 'minecraft', 'fortnite'];

class AddGameCommand extends Command {
	constructor() {
		super('addgame', {
			aliases: ['addgame'],
			category: 'game',
			channel: 'guild',
			cooldown: 5000,
			description: {
				content: 'Add a game to your profile.',
				usage: 'gameName InGameName',
				examples: ['Valorant Supriyo#2199']
			},
			args: [
				{
					id: 'game',
					type: Argument.validate('string', (m, p, str) => games.includes(str.toLowerCase())),
					prompt: {
						start: 'Enter the game\'s name.',
						retry: '**The game is not available.**\nThe following are the available ones:\n' +
						'\tValorant\n\tApexLegends\n\tFreeFire\n\tCOD\n\tMinecraft\n\tFortnite',
						cancel: 'Command has been cancelled. I have not saved anything.'
					}
				},
				{
					id: 'ign',
					type: Argument.validate('string', (m, p, str) => str.length >= 7),
					prompt: {
						start: 'Enter your in-game name.',
						retry: 'Please write your ign properly!',
						cancel: 'Command has been cancelled. I have not saved anything.'
					}
				}
			]

		});
	}

	/**
	 * @param {Message} message - The message object.
	 * @param {Object} args - The args object.
	 * @param {} args.game - The game's name.
	 * @param {} args.ign - Author's in-game name.
	 * @returns {*}
	 */

	async exec(message, { game, ign }) {
		// Embed
		const embed = new MessageEmbed().setColor(0xBFFF00)
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setDescription(
				[
					'SUCCESS✅',
					`- **Game**: ${game.toUpperCase()}`,
					`- **In-Game Name:** ${ign.replace(/\s|-/g, '')}`
				]
			)
			.setTimestamp();
		return message.channel.send(embed).then(() => {
			// Updating the database for the user.
			this.client.mongo.db('void').collection(game.toLowerCase().split(' ')
				.join(''))
				.updateOne(
					{
						user: message.author.id
					}, {
						$set: {
							registeredAt: new Date(),
							inGameName: ign.replace(/\s|-/g, '')
						}
					},
					{
						upsert: true
					}
				);
		});
	}
}

module.exports = AddGameCommand;
