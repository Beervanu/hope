exports.func = async function starboard(msg, parameters)
{
	const imageFileTypes = ['.png', '.jpg', '.jpeg', '.jpe', '.jif', '.jfif', '.jfi', '.gif', '.webp', '.tiff', '.tif', '.psd', 'raw', '.jp2', '.j2k', '.jpf', '.jpx', '.jpm', '.mj2','.heif', '.heic']
	const videoFileTypes = ['.mp4', '.mov', '.wmv', '.webm']
	let limit = parseInt(parameters[0]) || 10
	let star_threshold = parseInt(parameters[1]) || 0
	let update_message = await msg.reply({
		embeds: [{
			title: 'Resetting Starboard',
			color: this.colours.admin,
			description: `Found 0 starred messages`
		}]
	})
	let starboard = msg.mentions.channels.first()
	let channels = await msg.guild.channels.fetch()
	let found_messages = 0
	let searched_channels = 0

	channels = channels.filter(channel => channel.isText())
	
	channels.each(async channel => {
		let before_messageID = (await channel.messages.fetch({limit: 1})).id

		for(;limit>0; limit-=100)
		{
			let messages = await channel.messages.fetch({
				limit: limit > 100 ? 100 : limit,
				before: before_messageID
			})
			if(!messages.size) break;
			messages.filter(message => !message.author.bot)
			.each(async message => {
				let star_reactions = message.reactions.cache.get('⭐')?.count
				if(star_reactions >= star_threshold)
				{					
					await update_message.edit({
						embeds: [{
							title: 'Resetting Starboard',
							color: this.colours.admin,
							description: `Found ${++found_messages} starred messages`
						}]
					})

					
					let imageURL = message.attachments.filter(attachment=> imageFileTypes.some(ft=>attachment.url.toLowerCase().endsWith(ft))).first()?.url || message.embeds.filter(embed=> embed.image)[0]?.url
					starboard.send({
						files: message.embeds.filter(embed=>embed.video).map(embed=>embed.url).concat(message.attachments.filter(attachment=> videoFileTypes.some(ft=>attachment.url.toLowerCase().endsWith(ft))).map(attachment=> attachment.url)),
						content: `⭐ ${star_reactions} <#${message.channel.id}>`,
						embeds: [{
							color: 'GOLD',
							description: `[jump to message](${message.url})`,
							timestamp: message.createdAt,
							footer: {text: message.id},
							author: {
								name: message.author.username,
								iconURL: message.author.displayAvatarURL()
							},
							image: imageURL ? {url: imageURL} : undefined,
							fields: message.content ? [{name: 'Message:', value: message.content.length > 1023 ? message.content.substring(0, 1024-3)+'...': message.content}] : undefined
						}]
					})
				}
			})
			
			before_messageID = messages.last().id

		}
		if(++searched_channels === channels.size)
		{
			await update_message.edit({
				embeds: [{
					title: 'Finished Resetting Starboard (after kaarthick broke it)',
					color: this.colours.admin,
					description: `Found ${found_messages} starred messages`
				}]
			})
		}
	})
}

exports.info = {
	brief_desc: 'reset the starboard',
	long_desc: '**[<limit>]** - limit of messages of each channel to check\n**[<threshold>]** - threshold of star emojis',
	group: 'Dev',
	checks: ['only_me']
}