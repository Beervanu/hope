//not mine
const path = require('path')
const Discord = require('discord.js')

//mine
const command = require('./CommandHandler/command_handler.js')

const client = new Discord.Client()
// '807914451457146900' cockslayer id
const ch = new command.CommandHandler(client, '.', 'Hope', path.resolve('./Guilds'), '807914451457146900')
ch.add_commands(path.resolve('./Commands'), path.resolve('./Checks'))
ch.add_events(path.resolve('./Events'))
ch.template=path.resolve('./template.json')

client.login('NjkxNjUyMjU0NzYzMzE5MzI2.XnjFWw.xUo2HSU9J4uTES80ei7heZ-YuvU') //actual bot
// client.login("NjkxNjYxOTEzMzk4MDUwODI5.XnjOWg.sOl5mfNHkc8zbT4dSdVQGAIQqLU") // test