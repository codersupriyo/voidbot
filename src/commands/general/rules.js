const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class RulesCommand extends Command {
	constructor() {
		super('rules', {
			aliases: ['rules', 'rule'],
			category: 'general',
			description: {
				content: 'Rules and regulations of the server.'
			},
			cooldown: 3000
		});
	}

	async exec(message) {
		const embed = new MessageEmbed().setColor('#050065')
			.setAuthor('Rules and Regulations', message.guild.iconURL())
			.setDescription([
				'**1.** Maintain peace in the server, don\'t misuse bots and agitate people and don\'t rage fights.',
				'**2.** You can steal  unlimited times but don\'t use any abusive language in the <#751359769310134322> and <#751730113795719289> channels with the help of the bot <@!270904126974590976>.',
				'**3.** Please don\'t beg or ask for roles. The respective roles in the server will be given to respective people in due time.',
				'**4.**	 No NSFW channels or words are allowed.',
				'**5.** Respect all members of the __VOID community__ irrespective of their age.',
				'**6.** Don\'t misuse the power of the roles that are given to you.',
				'**7.** <#751359769310134322> and <#751730113795719289> are twin channels, enter and chat in only one of them.',
				'**8.** Please don\'t argue uselessly and baselessly with any of the moderators on petty topics or after breaking rules.Rules are rules, don\'t break them.',
				'**9.** Please don\'t promote your server, but you can promote your youtube channels, Twitch channels, and other stuff for sure.',
				'**10.**English is the primary chat language, you may use different language in VC depending on the person with whom you converse.'
			])
			.addField('Note', 'Violation of these rules once can get you a warning, twice can get you a temporary ban. If you break the rules again after ban, then you will be kicked out of the server. So I suggest you to abide to and obey the rules of the server. Have fun!');
		return message.util.send(embed);
	}
}

module.exports = RulesCommand;
