exports.func = async function send(msg, parameters)
{
	msg.channel.send(parameters.join(' '))
	msg.delete()
}

exports.info = {
	aliases: ['s'],
	group: 'Admin',
	brief_desc: 'Sends a message through the bot',
	usage: '[<message>]',
	long_desc: '**[<message>]** - the message to send through the bot',
	checks: ['only_admin']
}