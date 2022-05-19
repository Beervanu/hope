exports.func = async function starboard(msg, parameters)
{
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
					let imageURL = message.attachments.filter(attachment=> attachment.contentType.startsWith('image')).first()?.url || message.embeds.filter(embed=> embed.type === 'image')[0]?.url
					let videoURL = message.attachments.filter(attachment=> attachment.contentType.startsWith('video')).first()?.url || message.embeds.filter(embed=> embed.type === 'video')[0]?.url
					starboard.send({
						content: `⭐ ${star_reactions} <#${message.channel.id}>`,
						embeds: [{
							color: 'GOLD',
							description: `[jump to message](${message.url})`,
							timestamp: Date.now(),
							footer: {text: message.id},
							author: {
								name: message.author.username,
								iconURL: message.author.displayAvatarURL()
							},
							image: imageURL ? {url: imageURL} : undefined,
							video: videoURL ? {url: videoURL} : undefined,
							fields: message.content ? [{name: 'Message:', value: message.content}] : undefined
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