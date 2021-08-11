import { Command, CommandContext, meta } from "disky";
import memeArchive from "../services/meme-archive";
import { isPlaying, play, getChannel } from "../voice";

@meta({
  name: "play",
  description: "Plays a meme in the current voice channel",
  options: [
    {
      name: "meme",
      type: "STRING",
      description: "The name or alias of the meme",
      required: true,
    },
  ],
})
export default class DefaultCommand implements Command {
  async run({ interaction }: CommandContext) {
    const meme = interaction.options.getString("meme");
    try {
      const [channel, res] = await Promise.all([
        getChannel(interaction),
        memeArchive.get(`/commands/${meme}.json`),
      ]);
      const { name, audio } = res.data;
      if (!channel) {
        return await interaction.reply(
          "Must have a voice channel to play memes"
        );
      }
      if (isPlaying(channel)) {
        return await interaction.reply("A meme is already playing");
      }
      Promise.all([
        interaction.reply(`Playing ${name}`),
        play(audio, channel, { name }),
      ]);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        return await interaction.reply("Could not find meme with that name");
      }
      throw e;
    }
  }
}
