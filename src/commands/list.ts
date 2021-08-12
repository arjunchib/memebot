import { Command, CommandContext, slash } from "disky";

@slash({
  name: "list",
  description: "Lists available memes",
})
export default class ListCommand extends Command {
  async run({ interaction }: CommandContext) {
    await interaction.reply("Visit memebot.life for a list of memes.");
  }
}
