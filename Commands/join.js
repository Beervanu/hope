const audio = require('audio-mixer')
const ReadableClone = require('readable-stream-clone')

exports.func = async function join(msg, parameters)
{
	let concurrentClips = Number(parameters[0]) || 2
	let connection = await msg.member.voice.channel.join()
	let mixer = new audio.Mixer({
		channels: 2,
		sampleRate: 48000,
		bitDepth: 16
	})

	let clipStreams = []
	for (;concurrentClips--;)
	{
		clipStreams.push({
			stream: new ReadableClone(mixer),
			created: Date.now()
		})
	}

	let inputs = {}
	connection.setSpeaking(0)
	connection.channel.members.each(mbr => 
	{
		inputs[mbr.id] = mixer.input({})
		connection.receiver.createStream(mbr, {mode:'pcm', end:'manual'}).pipe(inputs[mbr.id])
	})

	connection.on('disconnect', () => {
		msg.channel.send({embed: {
			title: `Disconnected from ${connection.channel.name}`,
			color: 'GOLD',
			description: 'Sadge'
		}})	
		delete this.command_handler.voice[connection.channel.id]
	})

	this.command_handler.voice[connection.channel.id] = {
		connection: connection,
		mixer: mixer, 
		inputs: inputs, 
		clipStreams: clipStreams
	}


	msg.channel.send({embed: {
		title: `Joined ${msg.member.voice.channel.name}`,
		color: 'GOLD',
		description: 'Ready to clip'
	}})	
}

exports.info = {
	aliases: ['j'],
	group: 'Voice',
	brief_desc: 'Gets the bot to join vc',
	usage: '[<concurrent clips(default:2)>]',
	long_desc: '**[<concurrent clips(default:2)>]** - number of concurrent clips (once someone clips, that clip stream is reset to the time of clipping)',
	checks: ['voice_connected', 'only_guild', 'bot_not_connected']
}