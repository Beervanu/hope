const fs = require('fs')

exports.func = function on_guild_join(guild)
{	
	this.backup.saveWatchedGuilds(this.guilds).then(() => this.load_guilds())
}	

exports.event = 'guildCreate'