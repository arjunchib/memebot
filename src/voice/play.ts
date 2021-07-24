import { VoiceChannel } from "discord.js";
import axios from "axios";

interface PlayInput {
  url: string;
  channel: VoiceChannel;
  name: string;
}

export async function play({ url, channel, name }: PlayInput) {
  const audioURL = url.startsWith("http")
    ? url
    : `${process.env.MEME_ARCHIVE_BASE_URL}/${url}`;
  const audioReq = axios.get(audioURL, { responseType: "stream" });
  const connection = await channel.join();
  const stream = await audioReq;
  const dispatcher = connection.play(stream.data);
  channel.client.user.setActivity(name);
  dispatcher.on("finish", () => {
    connection.disconnect();
    channel.client.user.setActivity();
  });
  dispatcher.on("error", console.error);
}
