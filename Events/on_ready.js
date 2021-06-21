exports.func = async function on_ready()
{
	this.Debug.debug(`connected`, this)
	this.backup.retrieve()
}

exports.event = 'ready'