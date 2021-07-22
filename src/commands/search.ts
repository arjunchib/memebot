import { Command, CommandContext, meta } from "disky";
import memeArchive from "../services/meme-archive";

interface CommandData {
  name: string;
}

@meta({
  usage: "search",
  description: "Finds memes by command",
})
export default class SearchCommand implements Command {
  async run(ctx: CommandContext) {
    const { msg } = ctx;
    const searchStr = msg.content.slice(
      process.env.PREFIX.length + "search ".length
    );
    const res = await memeArchive.get(`/commands.json`, {
      params: {
        s: searchStr,
      },
    });
    await msg.channel.send(this.resultText(res.data, searchStr));
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
