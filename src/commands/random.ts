import { Command, CommandContext, meta } from "disky";
import { play } from "../voice/play";
import memeArchive from "../services/meme-archive";
import type { VoiceChannel } from "discord.js";

@meta({
  name: "random",
  description: "Plays a random meme",
})
export default class RandomCommand implements Command {
  async run({ interaction }: CommandContext) {
    const channels = await interaction.guild.channels.fetch();
    const channel = channels.find(
      (channel) => channel.type === "GUILD_VOICE"
    ) as VoiceChannel;
    const res = await memeArchive.get("/memes/random.json");
    const name = res.data.name;
    interaction.reply(`Playing ${name}`);
    await play({
      url: res.data.audio,
      channel,
      name,
    });
  }
}
