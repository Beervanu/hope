exports.func = function on_member_update (old_m, new_m)
{
	try
	{
		if (this.guilds[new_m.guild.id].people?.[new_m.id]) 
		{
			this.guilds[new_m.guild.id].people[new_m.id].roles = new_m.roles.cache.keyArray()
		}
	}
	catch (e)
	{
		console.log(old_m, new_m)
	}
	
}

exports.event= 'guildMemberUpdate'