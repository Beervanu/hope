exports.func = function voice_connected(msg)
{
	return {
		check: !!msg.member.voice.channel,
		error: "You're not connected to a voice channel"
	}
}