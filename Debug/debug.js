const CONFIG = require('./config.json')
var last_ctx = ''
const fs = require('fs')
const path = require('path')

exports.debug_path = `${__dirname}/debug.txt`
exports.debug_path2 = `${__dirname}/debug2.txt`
exports.log_path = `${__dirname}/logs.txt`
exports.log_path2 = `${__dirname}/logs2.txt`

exports.debug = function debug(string, ctx = '')
{
	if (CONFIG.debug.show_debug_messages)
	{
		if (ctx)
		{
			ctx = `${ctx.constructor.name}: ${ctx.display_name||ctx.name}: `
		}
		check_context(ctx)
		writeDebug(`Debug: ${ctx}${string}`)
	}
}

exports.log_message = function log_message(msg)
{
	if (CONFIG.logs.show_logs)
	{
		if (msg.channel.type !== 'dm'||msg.channel.recipient.id !== '807914451457146900')
		{
			let output
			if (CONFIG.logs.simplified)
			{
				output = `${msg.author.username} in #${msg.channel.name||msg.channel?.recipient.username}: `
			}
			else
			{
				output = `${msg.createdAt.toDateString()} Logs: ${msg.author.username} in #${msg.channel.name||msg.channel?.recipient.username}: `
			}
			
			msg.content ? output += msg.cleanContent : output += 'placeholder for non-text'
			writeLog(output)
		}	
	}
}

exports.reset = function reset()
{
	fs.writeFileSync(`${__dirname}/debug.txt`, '')
	fs.writeFileSync(`${__dirname}/logs.txt`, '')
}

function check_context(current)
{
	if (last_ctx !== current)
	{
		last_ctx = current
		writeDebug('')
	}
}

function writeDebug(data='', terminator='\n')
{
	let debug_path = `${__dirname}/debug.txt`
	// if (isFileOver5MB(debug_path))
	// {
	// 	fs.copyFileSync(debug_path, `${__dirname}/debug2.txt`)
	// 	fs.writeFileSync(debug_path, `Reset at ${Date()}\n`)
	// }
	fs.appendFileSync(debug_path, data + terminator)
}

function writeLog(data='', terminator='\n')
{
	let log_path = `${__dirname}/logs.txt`
	// if (isFileOver5MB(log_path))
	// {
	// 	fs.copyFileSync(log_path, `${__dirname}/logs2.txt`)
	// 	fs.appendFileSync(`${__dirname}/logs2.txt`, `Reset at ${Date()}`)
	// 	fs.writeFileSync(log_path, `Reset at ${Date()}\n`)
	// }
	fs.appendFileSync(log_path, data + terminator)
}

exports.reset()



function displayConfig(config, tabSize)
{
	writeDebug(`Started at ${Date()}`)
	writeDebug('CONFIG FILE\n------')
	loopThroughObject(config, tabSize)
	writeDebug('------\nEnd CONFIG FILE')
}

function loopThroughObject(obj, tabSize)
{
	let spaces = ' '.repeat(tabSize)
	for (i in obj)
	{
		writeDebug(spaces+i + ': ', '')
		if (obj[i] instanceof Object)
		{
			writeDebug()
			loopThroughObject(obj[i], tabSize*2)
		}
		else
		{
			writeDebug(obj[i])
		}
	}
}

function isFileOver5MB(path)
{
	let stats = fs.statSync(path)
	return stats.size > 5242880
}

displayConfig(CONFIG, 4)