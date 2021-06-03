exports.func = function is_valid_setting(msg, parameters)
{
	let is_valid_prop = false
	let reason = "doesn't exist"
	console.log(this.command_handler.guilds[msg.guild.id].settings.channels.hasOwnProperty(parameters[0]))
	if (this.command_handler.guilds[msg.guild.id].channels.hasOwnProperty(parameters[0]))
	{
		console.log('here')
		this.command_handler.guilds[msg.guild.id].channels[parameters[0]].channel = msg.mentions.channels.first()
		is_valid_prop = !!msg.mentions.channels.size
		reason = 'needs to be set to a channel'
	}


	return {
		check: is_valid_prop, 
		error: `This property (${parameters[0]}) ${reason}`
	}
}