exports.func = async function update(msg, parameters)
{
	let mode = ['add', 'remove'].includes(parameters[0]) ? parameters[0] : 'add'
	if (mode === 'add')
	{
		members.each(member=>member.edit({roles: roles.concat(member.roles.cache)}))
	}
	else if (mode === 'remove')
	{
		members.each(member=>member.edit({roles: roles.difference(member.roles.cache)}))
	}
}

exports.info = {
	aliases: ['u'],
	group: 'Admin',
	checks: ['only_admin', 'only_guild'],
	brief_desc: 'Update a members roles',
	long_desc: '**[<mode(default:"add")>]** - either "add" or "remove" indicating whether to add or remove roles\n**<members>** - any number of members that you want to update\n**<roles>** - any number of roles that you want to add/remove from the members mentioned',
	usage: '[<mode(default:"add")>] <members> <roles>'
}