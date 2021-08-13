import { Intents } from "discord.js";
import { ClientOptions } from "disky";

export const options: ClientOptions = {
  token: process.env.BOT_TOKEN,
  guildId: process.env.GUILD_ID,
  intents: [Intents.FLAGS.GUILD_VOICE_STATES],
};
