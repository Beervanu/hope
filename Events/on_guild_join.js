const fs = require('fs')

exports.func = function on_guild_join(guild)
{	
	fs.writeFileSync(`${guild.id}.json`, this.server_template)
}	

exports.event = 'guildCreate'