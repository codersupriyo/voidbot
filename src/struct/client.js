const { AkairoClient, CommandHandler, InhibitorHandler, ListenerHandler } = require('discord-akairo');
const MongoDB = require('./mongoDB.js');
const logger = require('../util/logger');

class Client extends AkairoClient {
	constructor() {
		super({
			ownerID: [
				// Supriyo
				'427077676235489291'
			]
		}, {
			messageCacheMaxSize: 100
		}, {
			disableEveryone: true,
			disabledEvents: [
				'TYPING_START'
			],
			disableMentions: 'none'
		});

		this.commandHandler = new CommandHandler(this, {
			directory: './src/commands/',
			aliasReplacement: /-/g,
			prefix: '>',
			allowMention: true,
			commandUtil: true,
			commandUtilLifetime: 10000,
			commandUtilSweepInterval: 10000,
			storeMessages: true,
			handleEdits: true, argumentDefaults: {
				prompt: {
					start: 'What is it?',
					modifyStart: (msg, text) => `・${text}\n・Type \`cancel\` to cancel this command.`,
					retry: 'What is it, again?',
					modifyRetry: (msg, text) => `・${text}\n・Type \`cancel\` to cancel this command.`,
					timeout: 'Out of time.',
					ended: 'No more tries.',
					cancel: 'Cancelled.',
					retries: 5
				},
				modifyOtherwise: (msg, text) => `${msg.author}, ${text}`
			}
		});

		this.inhibitorHandler = new InhibitorHandler(this, {
			directory: './src/inhibitors/'
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: './src/listeners/'
		});
	}

	async setup() {
		this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
		this.commandHandler.useListenerHandler(this.listenerHandler);

		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			inhibitorHandler: this.inhibitorHandler,
			listenerHandler: this.listenerHandler
		});

		this.commandHandler.loadAll();
		this.inhibitorHandler.loadAll();
		this.listenerHandler.loadAll();

		// MongoDB
		this.mongo = new MongoDB();
		await this.mongo.connect();

		this.logger = logger;

		// Resolver
		const resolver = this.commandHandler.resolver;
		resolver.addType('1-10', (message, phrase) => {
			const num = resolver.type('integer')(phrase);
			if (num == null) return null;
			if (num < 1 || num > 10) return null;
			return num;
		});
	}

	async start(token) {
		await this.setup();
		return this.login(token);
	}
}

module.exports = Client;
