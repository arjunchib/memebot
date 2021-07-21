import { Command, CommandContext, meta } from "disky";
import axios from "axios";

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
    const res = await axios.get(
      `${process.env.MEME_ARCHIVE_BASE_URL}/commands.json?s=${searchStr}`
    );
    await msg.channel.send(this.resultText(res.data, searchStr));
  }

  resultText(commands: CommandData[], searchStr: string) {
    return commands
      .map((command) => command.name)
      .join(", ")
      .replace(RegExp(searchStr, "gi"), `**$&**`);
  }
}
