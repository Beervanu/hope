exports.func = async function mute(msg, parameters)
{
	let mute_message = await msg.channel.send({embeds: [{
		title: 'Muting',
		color: this.colours.admin,
		description: 'Starting to mute...'

	}]})
	msg.member.voice.channel.members.each(member =>
	{
		member.edit({mute: true})
		mute_message.edit({
			embeds: [{
				title: 'Muting',
				color: this.colours.admin,
				description: `Muted <@${member.id}>`
			}]
		})
	})
	mute_message.delete()
	msg.delete()
}

exports.info = {
	aliases: ['m', 'mu'],
	group: 'Admin',
	brief_desc: 'Mutes everyone in the voice channel you are connected to',
	checks: ['only_guild', 'voice_connected'],
	permissions: 'ADMINISTRATOR'
}