exports.func = async function unmute(msg, parameters)
{
	let mute_message = await msg.channel.send({embeds: [{
		title: 'Unmuting',
		color: this.colours.admin,
		description: 'Starting to unmute...'

	}]})
	let edits = []
	msg.member.voice.channel.members.each(member =>
	{
		member.edit({mute: false})
		edits.push(mute_message.edit({
			embeds: [{
				title: 'Unmuting',
				color: this.colours.admin,
				description: `Unmuted <@${member.id}>`
			}]
		}))
	})
	msg.delete()
	await Promise.all(edits)
	mute_message.delete()
}

exports.info = {
	aliases: ['um'],
	group: 'Admin',
	brief_desc: 'Unmutes everyone in the voice channel you are connected to',
	checks: ['only_guild', 'voice_connected'],
	permissions: 'ADMINISTRATOR'
}