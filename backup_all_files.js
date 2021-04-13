const path = require('path')
const Discord = require('discord.js')

//mine
const command = require('./CommandHandler/command_handler.js')
const backup = require('./FileBackup/file_backup.js')

const client = new Discord.Client()
let b = new backup.Backup(client,  path.resolve('./Guilds'), '807914451457146900')
b.backup('change', 'cock')

client.login('NjkxNjUyMjU0NzYzMzE5MzI2.XnjFWw.xUo2HSU9J4uTES80ei7heZ-YuvU')