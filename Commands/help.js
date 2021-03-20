exports.func = async function help(msg, parameters)
{
	try
	{
		msg.channel.send({embed: this.command_handler.commands[parameters[0]].help_embed})
	} 
	catch (err)
	{
		try
		{
			let sorted_commands = {}
			let description = ''
			for (const i in this.command_handler.commands)
			{
				if (!this.command_handler.commands[i].hidden)
				{
					let group = this.command_handler.commands[i].group
					sorted_commands[group] ? sorted_commands[group] += this.command_handler.commands[i].help_text + '\n' : sorted_commands[group] = this.command_handler.commands[i].help_text + '\n'
				}
			}

			for (const group in sorted_commands)
			{
				description += `**${group}**\n${sorted_commands[group]}\n`
			}

			msg.channel.send({embed: {
				title: 'Help Command',
				description: description,
				color: 'ORANGE'
			}})
		} 
		catch (err) 
		{
			console.log(err)
		}
	}
}

exports.info = {
	aliases: ['h'],
	group: 'Help',
	brief_desc: 'Displays this command',
	long_desc: '**[<command/command group>]** - The command (group) name or alias of the command (group) that you want a description of',
	usage: '[<command/command group>]'
}