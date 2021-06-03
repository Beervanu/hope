//not mine
const path = require('path')
const Discord = require('discord.js')

//mine
const si = require('./sensitiveInfo.json')
const command = require('./CommandHandler/command_handler.js')

const client = new Discord.Client()
// '807914451457146900' cockslayer id
const ch = new command.CommandHandler(client, '.', 'Hope', path.resolve('./Guilds'), si.backup_id)
ch.add_commands(path.resolve('./Commands'), path.resolve('./Checks'))
ch.add_events(path.resolve('./Events'))
ch.template=path.resolve('./template.json')

client.login(si.tokens.Hope) //actual bot
// client.login(si.tokens.Test986) // test