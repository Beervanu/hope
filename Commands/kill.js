const Heroku = require('heroku-client')

exports.func = async function kill(msg, parameters)
{
	let app_names = ['hope-js', 'hope-js2']
	let hk = new Heroku({token: process.env.HEROKU_API_KEY})
	hk.post(`/apps/${app_names[process.env.APP_VERSION]}/dynos/${process.env.DYNO}/actions/stop`)
}

exports.info = {
	aliases: ['k', 'stop'],
	group: 'Dev',
	hidden: true,
	checks: ['only_me', 'on_heroku']
}