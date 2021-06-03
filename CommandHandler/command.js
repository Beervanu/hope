const Discord = require('discord.js')
const Debug = require('../Debug/debug.js')

exports.Command = class Command extends Function
{
	constructor(func, info={})
	{
		super('...args', 'return this.__self__.__call__(...args)')
		var self = this.bind(this)
		this.__self__ = self
		self.Debug = Debug
		self.command_handler = info.command_handler || null
    	self.func = func
		self.brief_desc = info.brief_desc || 'no brief description help'
		self.long_desc = info.long_desc || 'No more explaining to do, just type the command with the prefix'
		self.group = info.group || 'No Group'
		self.usage = info.usage || 'No usage'
		self.display_name = info.display_name || func.name[0].toUpperCase() + func.name.substring(1)
		self.extra = info.extra ? `\n\n${info.extra}` : ''

		self.checks = info.checks || [(msg => {return {check: true, error: ''}})]
		self.cooldown = info.cooldown || 0
		self.cooldowns = {}

		self.aliases = info.aliases || []
		self.hidden = info.hidden || false
		self.checks.push(this.check_cooldown)
		return self
	}



	get help_embed()
	{
		return new Discord.MessageEmbed(
		{
			title: `${this.display_name} (${this.group})`,
			description: `Description: *${this.brief_desc}*\n\n*Usage: ${this.usage}*${this.extra}\n\n${this.long_desc}`,
			footer: {text: `All aliases: ${this.aliases.join(', ') ? this.aliases.join(', ') + ', ' + this.func.name: this.func.name}`},
			color: 'ORANGE'
		})
	}

	get help_text()
	{
		return '**'+this.display_name+':** *'+this.brief_desc+'*'
	}

	check_cooldown(msg)
	{
		this.cooldowns[msg.author.id] = this.cooldowns[msg.author.id] || 0
		let on_cooldown = msg.createdAt.getTime() > this.cooldowns[msg.author.id]
		if (on_cooldown)
		{
			if (this.cooldown)
			{
				this.cooldowns[msg.author.id] = msg.createdAt.getTime() + this.cooldown
			}
			
		}
		return {
			check: on_cooldown, 
			error: `Retry in ${Math.round((this.cooldowns[msg.author.id] - Date.now())/100)/10} seconds`
		}
	}

	__call__(msg)
	{
		let start = Date.now()
		Debug.debug('has been called', this)
		var err = {}
		try
		{
			let parameters = msg.content.split(' ').slice(1)
			let check
			if (!this.command_handler.guilds[msg.guild.id]['test_mode'] || msg.author.id !== '574154383399452673')
			{
				for (var i in this.checks)
				{
					check = this.checks[i].bind(this)(msg, parameters)
					if (!check.check) break
				}
			}
			else
			{
				check = {
					check: msg.author.id === '574154383399452673',
					error: 'Nope, wrong person'
				}
			}

			
			if (check.check)
			{
				this.func.bind(this)(msg, parameters).then(() => {
					Debug.debug(`execution time ${Date.now()-start} ms`, this)
				})
				
			}
			else
			{
				Debug.debug(`Failed on check: ${check.error}`, this)
				err = {embed: {
					title: 'Wass going on',
					description: check.error,
				 	footer:{text: 'maybe that was helpful'}, 
				 	color: 'RED'
				}}
			}
		} catch (err) {console.log(err)}
		return err
	}	
}



// var test = new exports.Command(function test(args) {console.log(args)})
// console.log(test)
// test('epic')