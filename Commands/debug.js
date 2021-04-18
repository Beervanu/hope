exports.func = async function debug(msg)
{
	msg.author.send({
		files: [{
			attachment: this.Debug.debug_path
		},
		{
			attachment: this.Debug.log_path
		},
		{
			attachment: this.Debug.debug_path2
		},
		{
			attachment: this.Debug.log_path2
		}]
	})
}

exports.info = {
	aliases: ['d'],
	group: 'Dev',
	brief_desc: 'Sends debug info (if something broke)',
	checks: ['only_me']
}