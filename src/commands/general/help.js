const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ['help', 'cmd'],
			category: 'general',
			cooldown: 5000,
			channel: 'guild',
			clientPermissions: ['EMBED_LINKS'],
			quoted: false,
			args: [
				{
					id: 'command',
					type: 'commandAlias'
				}
			],
			description: {
				content: 'Displays the list of commands or information about a command.',
				usage: '[command]',
				examples: ['', 'kick', 'play']
			}
		});
	}

	async exec(message, { command }) {
		if (!command) return this.execCommandList(message);

		const prefix = this.handler.prefix;
		const description = Object.assign({
			content: '<:Crossmark:703278354475909242> No description available for the command.',
			usage: '',
			examples: []
		}, command.description);

		const embed = this.client.util.embed().setColor('RED')
			.setAuthor('Command details', 'https://pixelcrux.com/Clash_Royale/Battles/Icon.png')
			.setTitle(`\`${prefix}${command.aliases[0]} ${description.usage}\``)
			.addField('Description', description.content);

		if (command.aliases.length > 1) {
			embed.addField('Aliases', `\`${command.aliases.join('`, `')}\``);
		}

		if (description.examples.length) {
			const text = `${prefix}${command.aliases[0]}`;
			embed.addField('Examples', `\`\`\`${text} ${description.examples.join(`\n${text} `)}\`\`\``);
		}

		if (command.userPermissions && command.userPermissions[0]) {
			embed.addField('User Permissions',
				`\`${command.userPermissions.join('` `').replace(/_/g, ' ').toLowerCase()
					.replace(/\b(\w)/g, char => char.toUpperCase())}\`` || null);
		}

		if (command.clientPermissions && command.clientPermissions[0]) {
			embed.addField('Client Permissions',
				`\`${command.clientPermissions.join('` `').replace(/_/g, ' ').toLowerCase()
					.replace(/\b(\w)/g, char => char.toUpperCase())}\`` || null);
		}

		return message.util.send({ embed });
	}

	async execCommandList(message) {
		// Prefix
		const prefix = this.handler.prefix;
		const embed = new MessageEmbed().setColor('RED')
			.setAuthor('Command list', 'https://i.pinimg.com/originals/cf/08/5d/cf085de99662fc50d8bc78adb47cc596.gif')
			.setDescription(`**For additional info on a command, do** \`\`\`html\n${prefix}help <command>\`\`\``)
			.setFooter(`Developed by ${this.client.users.cache.get('427077676235489291').tag}`, this.client.users.cache.get('427077676235489291').avatarURL());

		const commands = [];
		for (const category of this.handler.categories.values()) {
			const name = {
				general: 'General',
				moderation: 'Moderation',
				information: 'Information',
				game: 'Game'
			};

			const title = name[category.id];
			if (title) {
				commands[Object.values(name).indexOf(title)] = { id: category.id, category, title };
			}
		}

		for (const cmd of commands) {
			embed.addField(`${cmd.title} [${this.handler.categories.get(cmd.category.id).size}]`, [
				cmd.category.sort().filter(cmd => cmd.aliases.length > 0)
					.map(cmd => `\`${cmd.aliases[0].replace(/-/g, '')}\``)
					.join(', ')
			]);
		}
		return message.util.send(embed);
	}
}
module.exports = HelpCommand;

