const fs = require('fs')
const request = require('request')
const Debug = require('../Debug/debug.js')
const EventEmitter = require('events')

exports.Backup = class Backup extends EventEmitter
{
    constructor(client, backup_user_id, directory)
    {
    	super()
    	this.name = directory
    	this.client = client
    	this.directory = directory
        this.files = []
        this.retrieved = false
        this.backup_user_id = backup_user_id
    }

    watch(filename)
    {
        this.files.push(filename)
        fs.watch(`${this.directory}/${filename}`, this.backup.bind(this))
        Debug.debug(`Watching ${filename}`, this)
    }

    retrieve()
    {
    	Debug.debug(`Retrieving files from ${this.backup_user_id} (id)`, this)
		this.client.users.resolve(this.backup_user_id).createDM()
			.then(dm => 
			{
				dm.messages.fetch({limit: 1}).then(messages =>
				{
					messages.first()?.attachments.each(att =>
					{
						this.download(att)
					})
					this.emit('retrieved')
					this.retrieved = true
				})	
			})
    }

    backup(eventType, filename)
    {
        if (eventType === 'change'&&this.retrieved)
        {
        	let resolvedFiles = []
        	for(let i = this.files.length; i--;)
        	{
        		Debug.debug(`Backing up ${this.files[i]}`, this)
        		resolvedFiles.push(`${this.directory}/${this.files[i]}`)
        	}
            this.client.users.resolve(this.backup_user_id).createDM().then(dm=> 
            {
            	dm.send({files: resolvedFiles})
            })
        }
    }

    download(attachment)
    {
    	Debug.debug(`Rewriting ${attachment.name}`, this)
    	request.get(attachment.url)    		
    		.pipe(fs.createWriteStream(`${this.directory}/${attachment.name}`))
    }
}
