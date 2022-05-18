exports.func = async function settings(msg, parameters)
{
	if (this.command_handler.guilds[msg.guild.id].channels.hasOwnProperty(parameters[0]))
	{
		this.command_handler.guilds[msg.guild.id]['channels'][parameters[0]] = msg.mentions.channels.first().id
		msg.channel.send({
			embeds: [{
				title: 'Settings',
				color: this.colours.setting,
				description: `${parameters[0]} set to ${msg.mentions.channels.first()}`
			}]
		})
	}
}	

exports.info = {
	aliases: ['set'],
	group: 'Admin',
	brief_desc: 'Change the settings for your guild',
	long_desc: '**<channel>** - set a channel to send messages to',
	usage: '<channel>',
	checks: ['is_valid_setting', 'only_guild'],
	permissions: 'ADMINISTRATOR'
}
