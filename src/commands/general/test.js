const { Command } = require('discord-akairo');
const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');

class Test extends Command {
	constructor() {
		super('test', {
			aliases: ['test'],
			args: [{
				id: 'member',
				type: 'user',
				default: message => message.author
			}]
		});
	}

	async exec(message, { member }) {
		const canvas = Canvas.createCanvas(1207, 679);
		const ctx = canvas.getContext('2d');

		// Background image
		const background = await Canvas.loadImage('https://codersupriyo.github.io/images/void_entry.jpg');
		// This uses the canvas dimensions to stretch the image onto the entire canvas
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


		// Add an exclamation point here and below
		ctx.font = 'bold 60px sans-serif';
		ctx.fillStyle = '#FFFF00';
		if (member.tag.length > 12) {
			ctx.fillText(`${member.tag}`, 430, 620);
		} else {
			ctx.fillText(`${member.tag}`, 330, 620);
		}


		// Loading user's avatar
		const avatar = await Canvas.loadImage(member.avatarURL({ format: 'jpg' }));
		// Draw a shape onto the main canvas
		ctx.drawImage(avatar, 460, 220, 250, 250);
		const attachment = new MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

		message.util.send(attachment);
	}
}

module.exports = Test;
