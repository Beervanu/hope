exports.func = async function ping(msg, parameters)
{
	let ping = await msg.channel.send('Pong! (number to be calculated) ms')	
	ping.edit(`Pong! ${Math.round(ping.createdAt.getTime()- msg.createdAt.getTime())} ms`)
}

exports.info = {
	group: 'Miscellaneous',
	brief_desc: 'Displays how long it takes for the bot to execute a command'
}