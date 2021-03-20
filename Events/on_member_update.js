exports.func = function on_member_update (old_m, new_m)
{
	this.guilds[new_m.guild.id].people?.[new_m.id]?.roles = new_m.roles.cache.keyArray()
	this.save_guild_json(new_m.guild.id)
}

exports.event= 'guildMemberUpdate'