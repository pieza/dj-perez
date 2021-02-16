const fs = require('fs')

module.exports = {
	name: 'help',
	description: 'List all available commands.',
	execute(message) {
		let str = '';
		const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))

		for (const file of commandFiles) {
			const command = require(`./${file}`)
			str += `- \`${command.name}:\` ${command.description} \n`
			if(command.usage) str += `     usage: \`${command.usage}\`\n`
		}

		message.channel.send(str)
	},
}