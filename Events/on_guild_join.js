const fs = require('fs')

exports.func = function on_guild_join(guild)
{	
	this.load_guilds()
}	

exports.event = 'guildCreate'