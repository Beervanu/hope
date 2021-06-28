const Heroku = require('heroku-client')

exports.func = async function kill(msg, parameters)
{
	if(process.env.HEROKU_API_KEY)
	{
		let app_names = ['hope-js', 'hope-js2']
		let hk = new Heroku({token: process.env.HEROKU_API_KEY})
		hk.post(`/apps/${app_names[process.env.APP_VERSION]}/dynos/${process.env.dyno}/actions/stop`)
	}
	else 
	{
		let signal = parameters[0] || "SIGTERM"
		process.emit(signal)
	}
}

exports.info = {
	aliases: ['k', 'stop'],
	group: 'Dev',
	hidden: true,
	checks: ['only_me']
}