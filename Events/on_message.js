exports.func = function	on_message(msg)
{
	this.Debug.log_message(msg)
	if (msg.author.id !== this.client.user.id)
	{
		this.process_message(msg)
	}
}

exports.event = 'message'