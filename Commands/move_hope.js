const Heroku = require('heroku-client')

exports.func = async function move_hope(msg, parameters)
{
	let app_names = ['hope-js', 'hope-js2']
    let hk = new Heroku({token: process.env.HEROKU_API_KEY})
    await hk.patch(`/apps/${app_names[process.env.APP_VERSION ^ 1]}/formation/worker`, {body: {
    	quantity: 1,
    	size: 'free'
    }})
    hk.post(`/apps/${app_names[process.env.APP_VERSION]}/dynos/${process.env.dyno}/actions/stop`)
}

exports.info = {
	aliases: ['mh'],
	group: 'Dev',
	hidden: true,
	brief_desc: 'Moves the bot host',
	long_desc: '[host_number(default:0)] - the number of the host (0-1)',
	usage: '[host_number(default:0)]',
	checks: ['only_me', 'on_heroku']
}