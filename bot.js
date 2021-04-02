//not mine
const path = require('path')
const Discord = require('discord.js')

const { Client } = require('pg');
const pgClient = new Client({
  connectionString: process.env.DATABASE_URL
});

//mine
const command = require('./CommandHandler/command_handler.js')


const client = new Discord.Client()

pgClient.connect();

const query = `CREATE TABLE guilds (
	id varchar,
	name text
);`

pgClient.query(query, (err, res) => {
  if (err)
  {
  	console.log(err)
  	return;
  }
  pgClient.end();
});


const ch = new command.CommandHandler(client, '.', 'Hope', path.resolve('./Guilds'))
ch.add_commands(path.resolve('./Commands'), path.resolve('./Checks'))
ch.add_events(path.resolve('./Events'))
ch.template=path.resolve('./template.json')

client.login("NjkxNjYxOTEzMzk4MDUwODI5.XnjOWg.sOl5mfNHkc8zbT4dSdVQGAIQqLU")