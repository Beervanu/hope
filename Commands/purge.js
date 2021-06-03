exports.func = async function purge(msg, parameters)
{

	let filter = msg.mentions.members.concat(msg.mentions.roles)
	
	let limit = parseInt(parameters[0]) || 10
	msg = await msg.delete()
	let messages = await msg.channel.messages.fetch({limit: limit})
	if (filter.size)
	{
		messages.filter(message=>{
			return filter.has(message.member.id) || filter.intersect(message.member.roles.cache).first()
		}).each(message=>message.delete())
	}
	else
	{
		messages.each(message=>message.delete())
	}	
}

exports.info = {
	aliases: ['pu'],
	group: 'Admin',
	brief_desc: 'Purges a specified number of messages',
	extra: 'By default messages will not be filtered - all messages will be deleted\nIf a role or user is specified, then those with that role (or roles) messages will be deleted',
	long_desc: '**[<limit(default:10)>]** - number of messages to check through\n**[<users>]** - users(mentions) to delete the messages of\n**[<roles>]** - roles(mentions) to delete the messages of',
	usage: '[<limit(default:10)>] [<users>] [<roles>]',
	checks: ['only_admin', 'only_guild']
}