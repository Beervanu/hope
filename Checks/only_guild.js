exports.func = function only_guild(msg)
{
	return {
		check: !!msg.guild,
		error: 'This command can only be used in a guild'
	}
}