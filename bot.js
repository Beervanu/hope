//not mine
require('dotenv').config()
const path = require('path')
const Discord = require('discord.js')

//mine
const command = require('./CommandHandler/command_handler.js')

const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES']})

const ch = new command.CommandHandler(client, '.', 'Hope', path.resolve('./Guilds'), process.env.BACKUP_ID)
client.login(process.env.TOKEN)


ch.add_commands(path.resolve('./Commands'), path.resolve('./Checks'))
ch.add_events(path.resolve('./Events'))
ch.template=path.resolve('./template.json')
