//not mine
require('dotenv').config()
const path = require('path')
const Discord = require('discord.js')

//mine
const command = require('./CommandHandler/command_handler.js')

const client = new Discord.Client()
// '807914451457146900' cockslayer id
const ch = new command.CommandHandler(client, '.', 'Hope', path.resolve('./Guilds'), process.env.BACKUP_ID)
ch.add_commands(path.resolve('./Commands'), path.resolve('./Checks'))
ch.add_events(path.resolve('./Events'))
ch.template=path.resolve('./template.json')

process.on('SIGTERM', () =>
{
	client.users.fetch('574154383399452673').createDM().then(dm=> {
		dm.send('graceful close')
	})
})

// client.login(process.env.TOKEN) //actual bot
client.login(process.env.TEST) // test