exports.func = function valid_clip_time(msg, parameters)
{
	let duration = parseInt(parameters[0]) || 30
	let uptime = (Date.now() - this.command_handler.voice[msg.member.voice.channel.id].clipStreams[0].created)/1000
	return {
		check: duration<uptime,
		error: `You can't clip ${duration} seconds (connection uptime: ${uptime} seconds)`
	}
}