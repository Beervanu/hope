exports.func = async function bruh_counter(msg)
{
	msg.channel.send(`There have been ${this.command_handler.guilds[msg.guild.id].bruh_counter} bruh momentos`)
}

exports.info = {
	aliases: ['bc'],
	brief_desc: "Displays the number of bruh's in the server",
	group: 'Miscellaneous',
	checks: ['only_guild']
}