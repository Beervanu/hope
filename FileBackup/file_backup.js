const fs = require('fs')

exports.Backup = class Backup
{
    constructor(backupChannel, files=[])
    {
        this.files = []
        this.retrieved = false
        this.backupChannel = backupChannel
        this.commandHandler = commandHandler
        this.retrieve()
        for(let i = files.length; i--;)
        {
            this.watch(files[i])
        }
    }

    watch(filename)
    {
        this.files.push(filename)
        fs.watch(filename, this.backup)
    }

    retrieve()
    {
        this.backupChannel.messages.fetch({limit: 1})
            .then(msg => msg.attachments.each(attachment => {
                fs.writeFileSync(attachment.filename, attachment.attachment)
            }))
        this.retrieved = true
    }

    backup(eventType, filename)
    {
        if (eventType === 'change')
        {
            this.backupChannel.send({files: this.files})
        }
    }
}