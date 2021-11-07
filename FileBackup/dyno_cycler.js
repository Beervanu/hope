const Cron = require('node-cron')
let {func} = require('../Commands/move_hope.js')
// let {func} = require('../test.js')

Cron.schedule('0 0 * * 0', async ()=>
{
	console.log('cycling dynos')
	await func()
})