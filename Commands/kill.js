exports.func = async function kill(msg, parameters)
{
	let signal = parameters[0] || "SIGTERM"
	process.emit(signal)
}

exports.info = {
	aliases: ['k'],
	group: 'Dev',
	hidden: true,
	checks: ['only_me']
}