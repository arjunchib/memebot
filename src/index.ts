import Discord from "discord.js";
import { play } from "./commands";

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (msg) => {
  if (!msg.content.startsWith("!")) return;
  await play(msg);
});

client.login(process.env.BOT_TOKEN);
