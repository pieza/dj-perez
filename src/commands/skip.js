module.exports = {
	name: 'skip',
	description: 'Skip a song!',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id)
		if (!message.member.voice.channel) return message.channel.send('Papillo, tiene que estar en un canal de voz para poner misica!')
		if (!serverQueue) return message.channel.send('No hay canciones para brincarme!')
		serverQueue.connection.dispatcher.end()
	},
}