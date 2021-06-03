exports.func = async function unmute(msg, parameters)
{
	let mute_message = await msg.channel.send({embed: {
		title: 'Unmuting',
		color: 'GOLD',
		description: 'Starting to unmute...'

	}})
	msg.member.voice.channel.members.each(member =>
	{
		member.edit({mute: false})
		mute_message.edit({
			embed: {
				title: 'Unmuting',
				color: 'GOLD',
				description: `Unmuted <@${member.id}>`
			}
		})
	})
	mute_message.delete()
	msg.delete()
}

exports.info = {
	aliases: ['um'],
	group: 'Admin',
	brief_desc: 'Unmutes everyone in the voice channel you are connected to',
	checks: ['only_admin', 'voice_connected']
}