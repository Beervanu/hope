exports.func = async function mute(msg, parameters)
{
	let mute_message = await msg.channel.send({embed: {
		title: 'Muting',
		color: 'GOLD',
		description: 'Starting to mute...'

	}})
	msg.member.voice.channel.members.each(member =>
	{
		member.edit({mute: true})
		mute_message.edit({
			embed: {
				title: 'Muting',
				color: 'GOLD',
				description: `Muted <@${member.id}>`
			}
		})
	})
	mute_message.delete()
	msg.delete()
}

exports.info = {
	aliases: ['m', 'mu'],
	group: 'Admin',
	brief_desc: 'Mutes everyone in the voice channel you are connected to',
	checks: ['only_guild', 'only_admin', 'voice_connected']
}