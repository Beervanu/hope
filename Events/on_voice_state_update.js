exports.func = function on_voice_state_update(oldState, newState)
{
	if (this.client.user.id !== oldState.member.id)
	{
		let voice = this.voice
		if (oldState.channelID !== newState.channelID) //if the member moved update the streams and mixer
		{
			if(!!voice[oldState.channelID])
			{
				voice[oldState.channelID].mixer.removeInput(voice[oldState.channelID].inputs[oldState.member.id])
				delete voice[oldState.channelID].inputs[oldState.member.id]
			}
			if(!!voice[newState.channelID])
			{
				voice[newState.channelID].inputs[newState.member.id] = voice[newState.channelID].mixer.input({})
				voice[newState.channelID].connection.receiver.createStream(newState.member, {mode:'pcm', end:'manual'}).pipe(voice[newState.channelID].inputs[newState.member.id])
			}
		}
	}
	
}

exports.event = 'voiceStateUpdate'