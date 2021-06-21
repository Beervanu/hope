const fs = require('fs')

exports.func = function on_guild_join(guild)
{	
	await this.backup.saveWatchedGuilds(this.guilds)
	this.load_guilds()
}	

exports.event = 'guildCreate'