exports.func = async function disconnect(msg)
{
	this.command_handler.voice[msg.member.voice.channel.id].connection.disconnect()
}

exports.info = {
	aliases: ['dc'],
	group: 'Voice',
	brief_desc: 'Disconnects the bot from the voice channel',
	checks: ['only_guild', 'voice_connected', 'bot_connected']
}