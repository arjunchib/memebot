import { VoiceChannel } from "discord.js";
import axios from "axios";

export async function play(url: string, channel: VoiceChannel) {
  const audioURL = url.startsWith("http")
    ? url
    : `${process.env.MEME_ARCHIVE_BASE_URL}/${url}`;
  const audioReq = axios.get(audioURL, { responseType: "stream" });
  const connection = await channel.join();
  const stream = await audioReq;
  const dispatcher = connection.play(stream.data);
  dispatcher.on("finish", () => {
    connection.disconnect();
  });
  dispatcher.on("error", console.error);
}
