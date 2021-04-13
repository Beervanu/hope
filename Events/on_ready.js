exports.func = function on_ready()
{
	this.Debug.debug(`connected`, this)
	this.load_guilds(this.guild_dir)
	this.backup.retrieve()
}

exports.event = 'ready'