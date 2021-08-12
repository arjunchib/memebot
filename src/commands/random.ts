import { Command, CommandContext, slash } from "disky";
import memeArchive from "../services/meme-archive";
import { isPlaying, play, getChannel } from "../voice";

@slash({
  name: "random",
  description: "Plays a random meme",
})
export default class RandomCommand extends Command {
  async run({ interaction }: CommandContext) {
    const [channel, res] = await Promise.all([
      getChannel(interaction),
      memeArchive.get("/memes/random.json"),
    ]);
    const { audio, name } = res.data;
    if (!channel) {
      return await interaction.reply("Must have a voice channel to play memes");
    }
    if (isPlaying(channel)) {
      return await interaction.reply("A meme is already playing");
    }
    await Promise.all([
      interaction.reply(`Playing ${name}`),
      play(audio, channel, { name }),
    ]);
  }
}
