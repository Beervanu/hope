exports.func = function on_heroku()
{
	return {
		check: !!process.env.HEROKU_API_KEY,
		error: 'The bot is not currently hosted on heroku'
	}
}