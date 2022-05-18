const Discord = require('discord.js')
const Debug = require('../Debug/debug.js')
const {performance} = require('perf_hooks')

exports.Command = class Command extends Function
{
	constructor(func, info={})
	{
		super('...args', 'return this.__self__.__call__(...args)')
		var self = this.bind(this)
		this.__self__ = self

		self.colours = info.command_handler.colours
		self.Debug = Debug
		self.command_handler = info.command_handler || null
    	self.func = func
		self.brief_desc = info.brief_desc || 'no brief description help'
		self.long_desc = info.long_desc || 'No more explaining to do, just type the command with the prefix'
		self.group = info.group || 'No Group'
		self.usage = info.usage || 'No usage'
		self.display_name = info.display_name || func.name[0].toUpperCase() + func.name.substring(1)
		self.extra = info.extra ? `\n\n${info.extra}` : ''

		self.permissions = new Discord.Permissions(info.permissions)
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
		let start = performance.now()
		Debug.debug('has been called', this)
		var err = {}
		let parameters = Array.from(msg.content.matchAll(/"(.+?)"|(\S+)/g), match => match[1] || match[2]).slice(1) //hocus pocus we have parameters
		let check
		if (!this.command_handler.guilds[msg.guild.id]['test_mode'] || msg.author.id !== '574154383399452673')
		{
			if(msg.author.dmChannel || msg.member.permissionsIn(msg.channel).has(this.permissions))
			{
				for (var i in this.checks)
				{
					try
					{
						check = this.checks[i].bind(this)(msg, parameters)
						if (!check.check)
						{
							check.name = this.checks[i].name
							break
						}
					}
					catch (e)
					{
						Debug.debug(`Check produced error(probably check order): ${this.checks[i].name}: ${e}`)
					}
				}
			}
			else
			{
				check = {
					check: false,
					error: `You do not have the correct permissions to run this command\n*(${this.permissions.toArray(false).join(', ')})*`
				}
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
				Debug.debug(`execution time ${performance.now()-start} ms`, this)
			}).catch(e => {Debug.error(e)})
			
		}
		else
		{
			Debug.debug(`Failed on check: ${check.name}: ${check.error}`, this)
			err = {embeds: {
				title: 'Wass going on',
				description: check.error,
				footer:{text: 'maybe that was helpful'}, 
				color: this.colours.error
			}}
		}
		return err
	}	
}



// var test = new exports.Command(function test(args) {console.log(args)})
// console.log(test)
// test('epic')