const fs = require('fs')
const fsPromises = require('fs/promises')
const request = require('request')
const Debug = require('../Debug/debug.js')
const EventEmitter = require('events')

exports.Backup = class Backup extends EventEmitter
{
    constructor(client, backup_user_id, command_handler)
    {
    	super()
    	
    	this.directory = command_handler.guild_dir
    	this.name = command_handler.guild_dir
    	this.client = client
        this.guilds = []
        this.fileNames = []
        this.retrieved = false
        this.backup_user_id = backup_user_id
        this.num_files_to_retrieve = 0
    }

    watch(guildId)
    {
        this.guilds.push(guildId)
        this.fileNames.push(`${this.directory}/${guildId}.json`)
        Debug.debug(`Watching ${guildId}`, this)
    }

    retrieve()
    {
    	Debug.debug(`Retrieving files from ${this.backup_user_id} (id)`, this)
		this.client.users.resolve(this.backup_user_id).createDM()
			.then(dm => 
			{
				dm.messages.fetch({limit: 1}).then(messages =>
				{
					this.num_files_to_retrieve = messages.first()?.attachments.size
					messages.first()?.attachments.each(att =>
					{
						this.download(att)
					})						
				})	
			})
	}

	async backup(guildData)
	{
		await this.saveWatchedGuilds(guildData)

		let dm = await this.client.users.resolve(this.backup_user_id).createDM()
		await dm.send({files: this.fileNames})
	}

	async saveWatchedGuilds(guildData)
	{

		return Promise.all(
			this.guilds.map(async (id, i) => {
				console.log(JSON.stringify(guildData[id], null, 4))
				return fsPromises.writeFile(this.fileNames[i], JSON.stringify(guildData[id], null, 4))
			})
		)
	}

	download(attachment)
	{
		Debug.debug(`Downloading and rewriting ${attachment.name} from ${attachment.url}`, this)
		let stream = fs.createWriteStream(`${this.directory}/${attachment.name}`)
		stream.on('finish', () => this.waitForDownload())
		request.get(attachment.url).pipe(stream)

	}

	waitForDownload()
	{
		this.num_files_to_retrieve--
		Debug.debug(`${this.num_files_to_retrieve} files left to download`, this)
		if(this.num_files_to_retrieve === 0)
		{
			this.retrieved = true
			this.emit('retrieved')
		} 
	}
}
