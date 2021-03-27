//not mine
const path = require('path')
const Discord = require('discord.js')


//mine
const command = require('./CommandHandler/command_handler.js')


const client = new Discord.Client()


const ch = new command.CommandHandler(client, '.', 'Hope', path.resolve('./Guilds'))
ch.add_commands(path.resolve('./Commands'), path.resolve('./Checks'))
ch.add_events(path.resolve('./Events'))
ch.template=path.resolve('./template.json')

client.login("NjkxNjYxOTEzMzk4MDUwODI5.XnjOWg.dIsz2r89X97xxGPN9BeXoGHD4Jk")