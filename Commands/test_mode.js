exports.func = async function test_mode(msg, parameters)
{
	this.command_handler.guilds[msg.guild.id]['test_mode'] ^= true
	this.command_handler.save_guild_json(msg.guild.id)
	msg.channel.send({
		embed: {
			title: 'TEST MODE',
			description: `Test mode ${this.command_handler.guilds[msg.guild.id]['test_mode'] ? 'on' : 'off'}`,
			color: 'GOLD'
		}	
	})
}

exports.info = {
	aliases: ['t'],
	group: 'Dev',
	brief_desc: 'dickhead',
	hidden: true,
	checks: ['only_me']
}
