const play = require('../util/play-audio')

module.exports = {
  name: "play",
  description: "Play a song in your channel!",
  usage: "play <YOUTUBE_URL>",
  async execute(message) {
    const args = message.content.split(" ")

    return play(message, args[2])
  }
}