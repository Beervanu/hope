const ReadableClone = require('readable-stream-clone')

exports.func = async function clip(msg, parameters)
{
	let duration = parseInt(parameters[0]) || 30
	let channelId = msg.member.voice.channel.id
	let clipStream = this.command_handler.voice[channelId].clipStreams.shift().stream

	let buffers = []
	clipStream.push(null)

	clipStream.on('end', () => {
		let clipBuffer = Buffer.concat(buffers)
		msg.channel.send({
			files: [{attachment: Buffer.concat([header(duration), clipBuffer.slice(-192000*duration)]), name: `${channelId}.wav`}]
		})
	})

	clipStream.on('data', (chunk) => {
		buffers.push(chunk)
	})

	this.command_handler.voice[channelId].clipStreams.push({
		stream: new ReadableClone(this.command_handler.voice[channelId].mixer),
		created: Date.now()
	})

}

exports.info = {
	group: 'Voice',
	brief_desc: 'Sends an audio clip of the last specified number of seconds of the voice channel you are in.',
	usage: '[<seconds(default:30)>]',
	long_desc: '**[<seconds(default:30)>]** - number of seconds to clip',
	aliases: ['c'],
	checks: ['bot_connected', 'voice_connected', 'only_guild', 'valid_clip_time']
}

function header(duration)
{
	let dataSize = 192000*duration
	let header = Buffer.alloc(44)
	header.write(		"RIFF"	,	0,	'utf8')
	header.writeUInt32LE(dataSize+44,	4) //size of file
	header.write(		"WAVE"	,	8,	'utf8')
	header.write(		"fmt "	,	12,	'utf8')
	header.writeUInt32LE(16		,	16)//size of subchunk
	header.writeUInt16LE(1		,	20)//1 for PCM
	header.writeUInt16LE(2		,	22)//number of channels
	header.writeUInt32LE(48000	,	24)//sample rate
	header.writeUInt32LE(192000	,	28)//Byte rate == SampleRate * NumChannels * BitsPerSample/8
	header.writeUInt16LE(4		,	32)//Block align == NumChannels * BitsPerSample/8 (number of bytes for one sample inculding all channels)
	header.writeUInt16LE(16		,	34)//Bits per sample
	header.write(		"data"	,	36,	'utf8')
	header.writeUInt32LE(dataSize,	40)//Number of bytes in Data == SampleRate * Duration * NumChannels * BitsPerSample/8s
	return header
}