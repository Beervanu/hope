exports.func = function bot_connected(msg)
{
	return {
		check: !!this.command_handler.voice[msg.member.voice.channel.id],
		error: 'The bot is not connected to this channel'
	}
}