import { Command, CommandContext, meta } from "disky";

@meta({
  usage: "list",
  description: "Lists available memes",
})
export default class ListCommand implements Command {
  run({ msg }: CommandContext) {
    msg.reply("Visit memebot.life for a list of memes.");
  }
}
