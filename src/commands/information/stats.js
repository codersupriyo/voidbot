const { Command } = require('discord-akairo');
const { Message, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const Akairo = require('discord-akairo');
const moment = require('moment');
require('moment-duration-format');
const os = require('os-utils');

class StatsCommand extends Command {
	constructor() {
		super('stats', {
			aliases: ['stats', 'botinfo'],
			category: 'information',
			description: {
				content: 'Displays the statistics of Star Platinum'
			},
			cooldown: 3000,
			channel: 'guild'
		});
	}

	/**
	 * @param {Message} message - The message object.
	 * @returns {*} Embed containing bot's stats.
	 */

	async exec(message) {
		const uptime = moment.duration(this.client.uptime).format('D [days], H [hrs], m [mins]');
		const embed = new MessageEmbed()
			.setAuthor('Sharingan Statistics', this.client.user.avatarURL())
			.addField('Memory', `\`\`\`Free: ${Math.round(os.freemem())}MB\nUsed: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\`\`\``)
			.addField('Uptime', `${uptime}`)
			.addField('Discord', `\`\`\`User: ${this.client.users.cache.size}\nServer: ${this.client.guilds.cache.size}\nChannel: ${this.client.channels.cache.size} \`\`\``)
			.addField('Modules', `\`\`\`Discord.js: v${Discord.version}\nAkairo: v${Akairo.version}\nNodeJS: ${process.version} \`\`\``)
			.setFooter('© 2020 Sharingan v1.0.0')
			.setColor('RED');

		return message.util.send(embed);
	}
}

module.exports = StatsCommand;
