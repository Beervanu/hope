exports.func = async function voice_chat(msg, parameters)
{	
	msg.channel.send(`@everyone\n:loud_sound:\nSincerely <@${msg.author.id}>`)
}

exports.info = {
	aliases: ['vc'],
	cooldown: 300000,
	brief_desc: 'Shout at people to get in vc :)',
	group: 'Miscellaneous',
	permissions: 'MENTION_EVERYONE'
}