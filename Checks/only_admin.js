exports.func = function only_admin(msg)
{
	return {
		check: msg.channel.permissionsFor(msg.author).has('ADMINISTRATOR'),
		error: 'Only admins can use this command'
	}
}