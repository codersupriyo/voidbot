const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');

// Verification Levels
const HUMAN_LEVELS = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: '(╯°□°）╯︵ ┻━┻\n(High)',
	VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻\n(Very High)'
};

// Flags
const flags = {
	europe: 'flag_eu:',
	singapore: ':flag_sg:',
	'eu-central': ':flag_eu:',
	'us-south': ':flag_us:',
	india: ':flag_in:',
	'us-central': ':flag_us:',
	london: ':flag_gb:',
	japan: ':flag_jp:',
	'eu-west': ':flag_eu:',
	brazil: ':flag_br:',
	dubai: ':flag_ae:',
	'us-west': ':flag_us:',
	hongkong: ':flag_hk:',
	amsterdam: ':flag_nl:',
	southafrica: ':flag_ss:',
	'us-east': ':flag_us:',
	sydney: ':flag_sh:',
	frankfurt: ':flag_de:',
	russia: ':flag_ru:'
};


class ServerInfoCommand extends Command {
	constructor() {
		super('server', {
			aliases: ['server', 'serverinfo', 'guild', 'guildinfo'],
			category: 'information',
			description: {
				content: 'Displays server information.'
			},
			cooldown: 3000,
			channel: 'guild'
		});
	}

	/**
	 * @param {Message} message - The message object.
	 * @returns {*}
	 */

	async exec(message) {
		const embed = new MessageEmbed()
			.setAuthor('Server info', message.guild.iconURL()).setColor('RED')
			.setDescription(
				[
					`• **Owner**: <@${message.guild.ownerID}>`,
					`• **Users**: ${message.guild.members.cache.filter(member => !member.user.bot).size}`,
					`• **BOTs**: ${message.guild.members.cache.filter(member => member.user.bot).size}`,
					`• **Roles**: ${message.guild.roles.cache.size}`,
					`• **TextChannels**: ${message.guild.channels.cache.filter(c => c.type === 'text').size}`,
					`• **VoiceChannels**: ${message.guild.channels.cache.filter(c => c.type === 'voice').size}`,
					`• **Region**: ${message.guild.region.toUpperCase()} ${flags[message.guild.region]}`,
					`• **Created on**: ${moment.utc(message.guild.createdAt).format('DD/MM/YYYY kk:mm:ss')}`,
					`• **Verification**: ${HUMAN_LEVELS[message.guild.verificationLevel]}`
				]
			)
			.setFooter('© 2020 Sharingan', this.client.user.avatarURL());
		return message.util.send(embed);
	}
}

module.exports = ServerInfoCommand;
