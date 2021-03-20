exports.func = function on_member_join(member)
{
	this.guilds[member.guild.id].JOIN_MESSAGES?.send(`${member.mention} has finally figured out how to use technology\nFor reference ${member.mention} please check ${welcome.mention} and read **all** the messages for info about this server`)
	this.guilds[member.guild.id].people[member.id] = {roles: this.guilds[member.guild.id].people?.[member.id]?.roles ?? []}
	member.edit({roles: this.guilds[member.guild.id].people[member.id].roles})
	this.save_guild_json(member.guild.id)
}

exports.event = 'guildMemberAdd'