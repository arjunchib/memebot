import axios from "axios";

export default {
  async command({ msg }) {
    if (msg.member.voice.channel) {
      const name = msg.content.slice(1);
      const [meme, connection] = await Promise.all([
        axios.get(`${process.env.MEME_ARCHIVE_BASE_URL}/commands/${name}.json`),
        msg.member.voice.channel.join(),
      ]);
      connection.play(meme.data.audio);
    } else {
      msg.reply("You need to join a voice channel first!");
    }
  },
};
