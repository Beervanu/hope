exports.func = function on_member_join(member)
{
	// this.guilds[member.guild.id].settings.channels.JOIN_MESSAGES.channel?.send(`${member.mention} has finally figured out how to use technology\nFor reference ${member.mention} please check ${welcome.mention} and read **all** the messages for info about this server`)
	this.guilds[member.guild.id].people[member.id] = {roles: this.guilds[member.guild.id].people?.[member.id]?.roles ?? []}
	member.edit({roles: this.guilds[member.guild.id].people[member.id].roles})
}

exports.event = 'guildMemberAdd'