exports.func = async function among_us_code(msg, parameters)
{
	if (parameters.length)
	{
		this.command_handler.guilds[msg.guild.id].among_us_code = parameters[0]
		msg.channel.send({
			embeds:[{
				title: 'New Among Us Code',
				color: this.colours.misc,
				description: `The new among us code is ${parameters[0]}`
			}]
		})
	}
	else
	{
		msg.channel.send({
			embeds:[{
				title: 'Among Us Code',
				color: this.colours.misc,
				description: `The among us code is ${this.command_handler.guilds[msg.guild.id].among_us_code}`
			}]
		})
	}
}

exports.info = {
	aliases: ['ac', 'auc', 'au'],
	group: 'Miscellaneous',
	brief_desc: 'The among us code',
	long_desc: '**[<code>]** - the new among us code',
	usage: '[<code>]',
	checks: ['only_guild']
}