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
	if (mode === 'add')
	{
		msg.mentions.members.each(member=>
		{
			members_edited.push(member.displayName)
			update_embed.footer = {text: `Adding roles to ${member.displayName}`}
			update_message.edit({embed: update_embed})
			member.edit({roles: msg.mentions.roles.concat(member.roles.cache)})
		})
	}
	else if (mode === 'remove')
	{
		msg.mentions.members.each(member=>
		{
			members_edited.push(member.displayName)
			update_embed.footer = {text: `Removing roles from ${member.displayName}`}
			update_message.edit({embed: update_embed})
			member.edit({roles: msg.mentions.roles.difference(member.roles.cache)})
		})
	}
	update_message.edit({
		embed: {
			title: 'Finished Editing Roles',
			description: `Members Edited: ${members_edited.join(', ')}`,
			color: this.colours.admin,
			footer: {text: 'Completed'}
		}
	})
}

exports.info = {
	aliases: ['u'],
	group: 'Admin',
	checks: ['only_guild', 'only_admin'],
	brief_desc: 'Update a members roles',
	long_desc: '**[<mode(default:"add")>]** - either "add" or "remove" indicating whether to add or remove roles\n**<members>** - any number of members that you want to update\n**<roles>** - any number of roles that you want to add/remove from the members mentioned',
	usage: '[<mode(default:"add")>] <members> <roles>'
}