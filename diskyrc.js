// @ts-check
import { Intents } from "discord.js";

/**
 * @type {import('Disky').ClientOptions}
 */
const options = {
  token: process.env.BOT_TOKEN,
  guildId: process.env.GUILD_ID,
  intents: [Intents.FLAGS.GUILD_VOICE_STATES],
};

export default options;
