exports.func = async function on_ready()
{
	this.Debug.debug(`connected`, this)
	// this.load_guilds()
	this.backup.retrieve()
}

exports.event = 'ready'