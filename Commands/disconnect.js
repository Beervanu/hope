exports.func = async function disconnect(msg)
{
	this.command_handler.voice[msg.member.voice.channel.id].connection.disconnect()
}

exports.info = {
	aliases: ['dc'],
	group: 'Voice',
	brief_desc: 'Disconnects the bot from the voice channel',
	checks: ['bot_connected', 'voice_connected', 'only_guild']
}