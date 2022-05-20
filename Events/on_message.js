exports.func = async function on_message(msg)
{
	this.Debug.log_message(msg)
	if (msg.author.id !== this.client.user.id&&this.retrieved)
	{
		this.process_message(msg)
	}
}

exports.event = 'messageCreate'