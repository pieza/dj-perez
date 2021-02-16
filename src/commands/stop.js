module.exports = {
	name: 'stop',
	description: 'Stop all songs in the queue!',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id)
		if (!message.member.voice.channel) return message.channel.send('Tienes que estar en un canal para detener la musica!')
		serverQueue.songs = []
		serverQueue.connection.dispatcher.end()
	},
}