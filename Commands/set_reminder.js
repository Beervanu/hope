const {validate} = require('node-cron')

exports.func = function set_reminder(msg, parameters)
{
	if(validate(parameters[2]))
	{
		this.command_handler.guilds[msg.id].reminders.push({
			name: parameters[0],
			message: parameters[1],
			date: parameters[2],
			one_time: parameters[3] ? (parameters[3].toLowerCase() === 'true') : true
		})
		msg.channel.send({
			embed: {
				title: 'Reminder set',
				description: `Reminder: ${parameters[0]}`,
				color: this.colours.reminder
			}
		})
	}
	else
	{
		msg.channel.send({
			embed: {
				title: 'Wass going on',
				description: 'not a valid cron date',
				footer: {text: 'maybe that was helpful'},
				color: this.colours.error
			}
		})
	}
	
}

exports.info = {
	hidden: true,
	aliases: ['remindme', 'remind', 'sr', 'setreminder'],
	group: 'Miscellaneous',
	brief_desc: 'Set a reminder for a time',
	long_desc: '**<name>** - a name/title for the reminder\n**<message>** - the message in the reminder\n**<cron-date>** - a cron-date [link to formatting](https://support.acquia.com/hc/en-us/articles/360004224494-Cron-time-string-format)\n**[<one_time:true>]** - true or false, whether to remind you once or forever',
	usage: '<channel> <message> <cron-date> [<one_time:true>]',
	checks: ['only_guild']
}

exports.disabled = true
