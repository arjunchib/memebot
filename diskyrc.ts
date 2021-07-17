import { ClientOptions } from "disky";

const options: ClientOptions = {
  prefix: process.env.PREFIX,
  token: process.env.BOT_TOKEN,
  intents: ["GUILD_VOICE_STATES"],
};

export default ClientOptions;
