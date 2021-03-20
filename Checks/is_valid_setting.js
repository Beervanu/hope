exports.func = function is_valid_setting(msg, parameters)
{
	let is_valid_prop = false
	let reason = 'urr dunno'
	if (this.command_handler.guilds[msg.guild.id].channels.hasOwnProperty(parameters[0]))
	{
		is_valid_prop = !!msg.mentions.channels.size
		reason = 'needs to be set to a channel'
	}


	return {
		check: is_valid_prop, 
		error: `This property (${parameters[0]}) ${reason}`
	}
}