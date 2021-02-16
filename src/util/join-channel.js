module.exports = (discordObject) => {
  const voiceChannel = discordObject.member.voice.channel
  if (!voiceChannel) {
    discordObject.channel.send(
      "Papillo, tiene que estar en un canal de voz para poner misica!"
    )
    return false
  }
  const permissions = voiceChannel.permissionsFor(discordObject.client.user)
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    discordObject.channel.send(
      "Necesito permisos para unirme y cantar en tu canal!"
    )
    return false
  }
  return true
}