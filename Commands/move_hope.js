const shell = require('node-powershell')

exports.func = async function move_hope(msg, parameters)
{
	let ps = new shell({
		executionPolicy: 'Bypass',
		noProfile: true
	});

	ps.addCommand(`./moveHope.ps1 ${parameters[0] || 0}`)
	ps.invoke()
		.then(() => {
			msg.send({embed: {
				title: 'Moving hope',
				color: 'GOLD',
				description
			}})
	})
	.catch(err => {
		this.Debug.debug(err);
		ps.dispose();
	});
}

exports.info = {
	aliases: ['mh'],
	group: 'Dev',
	brief_desc: 'Moves the bot host',
	long_desc: '[host_number(default:0)] - the number of the host (0-1)',
	usage: '[host_number(default:0)]'
	checks: ['only_me']
}