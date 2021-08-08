import { Command, CommandContext, meta } from "disky";
import memeArchive from "../services/meme-archive";

interface CommandData {
  name: string;
}

@meta({
  name: "search",
  description: "Finds memes by command",
  options: [
    {
      name: "meme",
      type: "STRING",
      description: "The pattern to search for",
      required: true,
    },
  ],
})
export default class SearchCommand implements Command {
  async run(ctx: CommandContext) {
    const { interaction } = ctx;
    const searchStr = interaction.options.getString("meme");
    const res = await memeArchive.get(`/commands.json`, {
      params: {
        s: searchStr,
      },
    });
    await interaction.reply(this.resultText(res.data, searchStr));
  }

  resultText(commands: CommandData[], searchStr: string) {
    if (commands.length === 0) {
      return "*Couldn't find any memes*";
    }
    return commands
      .map((command) => command.name)
      .join(", ")
      .replace(RegExp(searchStr, "gi"), `**$&**`);
  }
}
