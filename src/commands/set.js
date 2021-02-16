const Setting = require('../models/setting')

module.exports = {
	name: 'set',
  description: 'Change a settings value',
  usage: "set <PROPERTY> <VALUE>",
	async execute(message) {
    const args = message.content.split(" ")
    const property = args[2]
    const value = args[3]

    const setting = await Setting.findOne({
      where: {
        server_id: message.guild.id,
        property
      }
    })

    if(!setting) {
      const newSetting = new Setting({
        server_id: message.guild.id,
        property,
        value
      })
      await newSetting.save()
    } else {
      await setting.update({value})
    }

    return message.channel.send(`Configuracion actualizada correctamente!`)
	},
}