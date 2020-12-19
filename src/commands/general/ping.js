const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping', 'pong', 'latency'],
            category: 'general',
            cooldown: 2000,
            channel: 'guild',
            description: {
                content: 'Shows API latency.'
            }
        })
    }
    async exec(message) {alskdjaldkjald
        return message.util.send(`Pong! 🏓 | ${Math.round(this.client.ws.ping)}ms`);
    }
}

module.exports = PingCommand;