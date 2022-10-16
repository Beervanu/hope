exports.func = async function mute(msg, parameters)
{
	let mute_message = await msg.channel.send({embeds: [{
		title: 'Muting',
		color: this.colours.admin,
		description: 'Starting to mute...'
	}]})
	let edits = []
	msg.member.voice.channel.members.each(member =>
	{
		member.edit({mute: true})
		edits.push(mute_message.edit({
			embeds: [{
				title: 'Muting',
				color: this.colours.admin,
				description: `Muted <@${member.id}>`
			}]
		}))
	})
	msg.delete()
	await Promise.all(edits)
	mute_message.delete()
}

exports.info = {
	aliases: ['m', 'mu'],
	group: 'Admin',
	brief_desc: 'Mutes everyone in the voice channel you are connected to',
	checks: ['only_guild', 'voice_connected'],
	permissions: 'ADMINISTRATOR'
}