require('dotenv').config();
const Client = require('./src/struct/client');
const client = new Client();

client.start(process.env.BOT_TOKEN)
process.on('unhandledRejection', err => console.error(err));
