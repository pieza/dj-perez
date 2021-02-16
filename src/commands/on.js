const { getUserFromMention } = require('../util/get-user')
const Event = require('../models/event')

const EVENTS = ['join', 'leave', 'bye']

module.exports = {
	name: 'on',
  description: 'Register a new event on the bot!',
  usage: `on @USER [${EVENTS.join('/')}] <URL>`,
	async execute(message, client) {
    const args = message.content.split(" ")
    const user = getUserFromMention(args[2], client)
    console.log(user)
    if(user) {
      const action = args[3]
      const url = args[4]

      const event = await Event.findOne({
        where: {
          server_id: message.guild.id,
          user_id: user.id,
          action: 'join'
        }
      })

      if(!event) {
        const newEvent = new Event({
          server_id: message.guild.id,
          user_id: user.id,
          action,
          url
        })
        await newEvent.save()
        return message.channel.send(`Accion agregada correctamente!`)
      } else {
        await event.update({url})
        return message.channel.send(`Accion actualizada correctamente!`)
      }

    } else {
      const action = args[2]
      const url = args[3]

      if(EVENTS.indexOf(args[2]) > -1) {
        const event = await Event.findOne({
          where: {
            server_id: message.guild.id,
            user_id: 'server',
            action: 'join'
          }
        })

        if(!event) {
          const newEvent = new Event({
            server_id: message.guild.id,
            user_id: 'server',
            action,
            url
          })
          await newEvent.save()
          return message.channel.send(`Accion agregada correctamente!`)
        } else {
          await event.update({url})
          return message.channel.send(`Accion actualizada correctamente!`)
        }
      }
    }
	},
}