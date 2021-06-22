const fs = require('fs')
const Debug = require('../Debug/debug.js')
const command = require('./command.js')
const Backup = require('../FileBackup/file_backup.js')
exports.CommandHandler = class CommandHandler
{
	constructor(client, prefix, name, guild_dir, backup_user_id)
	{
		this.voice = {}
		this.retrieved = false
		this.Debug = Debug
		this.client = client
		this.name = name
		this.prefix = prefix
		this.commandMatcher = new RegExp(`^${escapeRegExp(prefix)}(\\S+)`)
		this.commands = {}
		this.server_template = {}
		this.guilds = {}
		this.guild_dir = guild_dir

		
		this.backup = new Backup.Backup(client, backup_user_id, this)
		this.backup.on('retrieved', () => {
			this.Debug.debug(`Files retrieved from backup`, this)
			this.load_guilds()
			this.retrieved = true
		})

		process.on('SIGTERM', () =>
		{
			Debug.debug(`Preparing for termination`, this)
			this.backup.backup(this.guilds).then(() => process.exit())
		})
	}

	async process_message(msg)
	{
		try {
			var err = this.commands[this.commandMatcher.exec(msg.content.toLowerCase())[1]](msg)
			if (Object.keys(err).length) msg.channel.send(err)
		} catch {
			this.message_searchers(msg)
		}
	}

	make_aliases(command)
	{
		for (var i in command.aliases)
		{
			Object.defineProperty(this.commands, command.aliases[i], {
				get: function() 
				{
					return this[command.func.name]
				}
			})
		}
	}

	load_guilds()
	{
		fs.readdir(this.guild_dir, (err, files) => 
		{
			this.client.guilds.cache.each(guild => {
				let exists = false
				for (let j = files.length; j--;)
				{
					if (files[j] === `${guild.id}.json`)
					{
						Debug.debug(`${guild.name} (server file) has been loaded`, this)
						this.guilds[guild.id] = JSON.parse(fs.readFileSync(`${this.guild_dir}/${files[j]}`))
						exists = true
						break;
					}
				}
				if (!exists)
				{
					Debug.debug(`${guild.name} (server file) has been created`, this)
					this.guilds[guild.id] = this.server_template
					guild.members.cache.each(member => {
						this.guilds[guild.id].people[member.id] = {roles: member.roles.cache.keyArray()}
					})
				}
				this.backup.watch(guild.id)
			})
			
		})
	}

	set template(path)
	{
		this.server_template = JSON.parse(fs.readFileSync(path))
	}

	async add_events(event_dir)
	{
		let directory = fs.opendirSync(event_dir)
		for await (const file of directory)
		{
			let event = require(`${event_dir}/${file.name}`)
			if (!event.disabled)
			{
				Debug.debug(event.event + ' (event) has been added', this)
				this.client.on(event.event, event.func.bind(this))				
			}
			else 
			{
				Debug.debug(`Disabled event`, this)
			}
		}

		Debug.debug(event_dir + ' (events folder) has been added', this)
	}

	async add_commands(command_dir, check_dir)
	{
		let directory = fs.opendirSync(command_dir)
		for await (const file of directory)
		{
			this.add_command(`${command_dir}/${file.name}`, check_dir)
		}

		Debug.debug(command_dir + ' (commands folder) has been added', this)
	}

	add_command(file, check_dir)
	{
		let {func, info={}, disabled=false} = require(file)
		if (!disabled)
		{
			let checks = info.checks || []
			info.checks = []
			info.command_handler = this
			for (let i = checks.length; i--;)
			{
				info.checks.unshift(require(`${check_dir}/${checks[i]}.js`).func)
			}

			let comnd = new command.Command(func, info)
			this.commands[comnd.func.name] = comnd
			this.make_aliases(comnd)
			Debug.debug(comnd.display_name + ' has been added', this)
		}
		else
		{
			Debug.debug('disabled command', this)
		}
	}



	message_searchers(msg)
	{
		let match
		if (msg.content.match(/b+r+u+h+/i))
		{
			this.guilds[msg.guild.id]['bruh_counter']++
			msg.channel.send(`Bruh momento numero: ${this.guilds[msg.guild.id]['bruh_counter']}`).then(message => {
				message.delete({timeout: 5000})
			})
		}
		if (msg.content.match(/j+ee+z+/i))
		{
			msg.channel.send(`mans getting pissed`).then(message => {
				message.delete({timeout: 5000})
			})
		}

		if (match = msg.content.match(/c4arena\.com\S*/))
		{
			msg.channel.send(`http://${match}`)
		}
	}
}

function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
