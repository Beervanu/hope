exports.func = function only_me(msg)
{
	return {
		check: msg.author.id === '574154383399452673', 
		error: 'Nope, wrong person'
	}
}