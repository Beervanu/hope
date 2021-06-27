const Heroku = require('heroku-client')

exports.func = function restart(msg, parameters)
{
	let app_names = ['hope-js', 'hope-js2']
    let hk = new Heroku({token: process.env.HEROKU_API_KEY})
    hk.delete(`/apps/${app_names[process.env.APP_VERSION]}/dynos/${process.env.DYNO}`)
}

exports.info = {
	aliases: ['r'],
	group: 'Dev',
	hidden: true,
	checks: ['only_me', 'on_heroku']
}