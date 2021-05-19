exports.func = function bot_not_connected(msg)
{
	return {
		check: !this.command_handler.voice[msg.member.voice.channel.id],
		error: 'The bot is already connected to this channel'
	}
}