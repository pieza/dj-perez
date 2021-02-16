const dotenv = require('dotenv')
dotenv.config()

const fs = require('fs')
const Discord = require('discord.js')
const Client = require('./services/discord.service')
const db = require('./db')
const Event = require('./models/event')
const Setting = require('./models/setting')
const { getUserFromMention } = require('./util/get-user')
const play = require('./util/play-audio')
const {
	prefix,
	token,
} = require('./config')

db.authenticate().then(async () => {
  console.log('connected to database')
  await db.sync()
  console.log('database synchronized successfully')
}).catch(err => {
  console.error('unable to connect to the database')
})

const client = new Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands/${file}`)
	client.commands.set(command.name, command)
}

client.once('ready', () => {
	console.log('Ready!')
})

client.once('reconnecting', () => {
	console.log('Reconnecting!')
})

client.once('disconnect', () => {
	console.log('Disconnect!')
})

client.on('message', async message => {
	const args = message.content.slice(prefix.length).split(/ +/)
	const commandName = args.shift().toLowerCase()
  const command = client.commands.get(commandName)

	if (message.author.bot) return
	if (!message.content.startsWith(prefix)) return

	try {
    if(command) {
      command.execute(message, client)
    } else {
      const event = await Event.findOne({
        where: {
          server_id: message.guild.id,
          user_id: 'server',
          action: commandName
        },
        raw: true
      })

      if(event) {
        play(message, event.url)
      } else {
        message.channel.send('No entendi XD')
      }
    }
		
	} catch (error) {
		console.error(error)
		message.reply('Mae wn me despiche aaah!')
	}
})

client.on('voiceStateUpdate', async (oldMember, newMember) => {
  const setting = await Setting.findOne({
    where: {
      server_id: newMember.guild.id,
      property: 'welcomes'
    },
    raw: true
  })


  if(setting && setting.value == 'off') return
  
  let newUserChannel = newMember.channel
  let oldUserChannel = oldMember.channel
  if(newUserChannel) {
    const event = await Event.findOne({
      where: {
        server_id: newMember.guild.id,
        user_id: newMember.id,
        action: 'join'
      },
      raw: true
    })
  
    if(event) {
      play(newMember, event.url)
    } 
  }

  // console.log(newMember)
})

client.login(token)