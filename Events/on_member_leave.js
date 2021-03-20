exports.func = function on_member_leave(member)
{
	this.guilds[member.guild.id].LEAVE_MESSAGES?.send(`${member.mention} bender.`)
}

exports.event = 'guildMemberRemove'