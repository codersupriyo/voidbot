const { Listener } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');
// const Canvas = require('canvas');

class MemberJoinEvent extends Listener {
	constructor() {
		super('guildMemberAdd', {
			event: 'guildMemberAdd',
			emitter: 'client'
		});
	}

	async exec(member) {
	/* 	const canvas = Canvas.createCanvas(1207, 679);
		const ctx = canvas.getContext('2d');

		// Background image
		const background = await Canvas.loadImage('https://codersupriyo.github.io/images/void_entry.jpg');
		// This uses the canvas dimensions to stretch the image onto the entire canvas
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


		// Add an exclamation point here and below
		ctx.font = 'bold 60px sans-serif';
		ctx.fillStyle = '#FFFF00';
		ctx.fillText(`${member.user.username}`, 330, 620);


		// Loading user's avatar
		const avatar = await Canvas.loadImage(member.user.avatarURL({ format: 'jpg' }));
		// Draw a shape onto the main canvas
		ctx.drawImage(avatar, 460, 220, 250, 250);
		const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');
 */
		const embed = this.client.util.embed().setAuthor(`${member.user.tag} (${member.user.id})`, member.user.displayAvatarURL())
			.setFooter('User Joined')
			.setColor('GREEN')
			.setTimestamp();
		return member.guild.channels.cache.get('788417545312010271').send(embed);
	}
}

module.exports = MemberJoinEvent;
