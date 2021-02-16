const ytdl = require("ytdl-core")
const join = require('./join-channel')

function play(discordObject, song) {
  const queue = discordObject.client.queue
  const guild = discordObject.guild
  const serverQueue = queue.get(discordObject.guild.id)

  if (!song) {
    serverQueue.voiceChannel.leave()
    queue.delete(guild.id)
    return
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift()
      play(discordObject, serverQueue.songs[0])
    })
    .on("error", error => console.error(error))
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
  try {
    serverQueue.textChannel.send(`Esta vara se prendio con: **${song.title}**`)
  } catch(err) {
    console.error(err)
  }
}

module.exports = async (discordObject, url) => {
  try {
    const queue = discordObject.client.queue
    const serverQueue = discordObject.client.queue.get(discordObject.guild.id)
    const voiceChannel = discordObject.member.voice.channel

    if(!join(discordObject)) return

    const songInfo = await ytdl.getInfo(url)
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url
    }

    if (!serverQueue) {
      const queueContruct = {
        textChannel: discordObject.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      }

      queue.set(discordObject.guild.id, queueContruct)

      queueContruct.songs.push(song)

      try {
        var connection = await voiceChannel.join()
        queueContruct.connection = connection
        play(discordObject, queueContruct.songs[0])
      } catch (err) {
        console.log(err)
        queue.delete(discordObject.guild.id)
        return discordObject.channel.send(err)
      }
    } else {
      serverQueue.songs.push(song)
      return discordObject.channel.send(
        `${song.title} ha sido agregada a la cola!`
      )
    }
  } catch (error) {
    console.log(error)
    discordObject.channel.send(error.message)
  }
}