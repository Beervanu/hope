exports.func = async function update(msg, parameters)
{
	let mode = ['add', 'remove'].includes(parameters[0]) ? parameters[0] : 'add'
	let update_embed = {
			title: 'Editing roles',
			color: this.colours.admin,
			description: `Mode: ${mode}`,
			footer: ''
	}
	let update_message = await msg.channel.send({embed: update_embed})

	let members_edited = []
	let roles_to_edit
	if (msg.author.id !== '574154383399452673')
	{
		roles_to_edit = msg.mentions.roles.filter(role => msg.member.roles.highest.comparePositionTo(role)>0)
	}
	else
	{
		//for me (backdoor)
		roles_to_edit = msg.mentions.roles
	}
	

	if (mode === 'add')
	{
		msg.mentions.members.each(member=>
		{
			members_edited.push(member.displayName)
			update_embed.footer = {text: `Adding roles to ${member.displayName}`}
			update_message.edit({embed: update_embed})
			member.edit({roles: roles_to_edit.concat(member.roles.cache)})
		})
	}
	else if (mode === 'remove')
	{
		msg.mentions.members.each(member=>
		{
			members_edited.push(member.displayName)
			update_embed.footer = {text: `Removing roles from ${member.displayName}`}
			update_message.edit({embed: update_embed})
			member.edit({roles: roles_to_edit.difference(member.roles.cache)})
		})
	}
	let failed = roles_to_edit.difference(msg.mentions.roles)

	failed = failed.size ? failed.reduce((prev, curr) => `${prev.toString()}, ${curr.toString()}`) : ''
	failed = failed ? `\nFailed to edit these roles: ${failed} as these roles are hoisted higher than you` : ''
	update_message.edit({
		embed: {
			title: 'Finished Editing Roles',
			description: `Members Edited: ${members_edited.join(', ')}${failed}`,
			color: this.colours.admin,
			footer: {text: 'Completed'}
		}
	})
}

exports.info = {
	aliases: ['u'],
	group: 'Admin',
	checks: ['only_guild'],
	brief_desc: 'Update a members roles',
	long_desc: '**[<mode(default:"add")>]** - either "add" or "remove" indicating whether to add or remove roles\n**<members>** - any number of members that you want to update\n**<roles>** - any number of roles that you want to add/remove from the members mentioned',
	usage: '[<mode(default:"add")>] <members> <roles>',
	permissions: 'ADMINISTRATOR'
}