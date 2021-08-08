import { Command, CommandContext, meta } from "disky";

@meta({
  name: "list",
  description: "Lists available memes",
})
export default class ListCommand implements Command {
  async run({ interaction }: CommandContext) {
    await interaction.reply("Visit memebot.life for a list of memes.");
  }
}
