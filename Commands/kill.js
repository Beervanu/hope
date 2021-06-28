const Heroku = require('heroku-client')

exports.func = async function kill(msg, parameters)
{
	let app_names = ['hope-js', 'hope-js2']
	let hk = new Heroku({token: process.env.HEROKU_API_KEY})
	await hk.patch(`/apps/${app_names[process.env.APP_VERSION]}/formation/worker`, {body: {
    	quantity: 0,
    	size: 'free'
    }})
}

exports.info = {
	aliases: ['k', 'stop'],
	group: 'Dev',
	hidden: true,
	checks: ['only_me', 'on_heroku']
}