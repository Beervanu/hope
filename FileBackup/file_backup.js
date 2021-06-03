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
        this.num_files_to_retrieve = 0
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
					this.num_files_to_retrieve = messages.first()?.attachments.size
					messages.first()?.attachments.each(att =>
					{
						this.download(att)
					})						
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
    		this.emit('retrieved')
    		this.retrieved = true
    	} 
    }
}
