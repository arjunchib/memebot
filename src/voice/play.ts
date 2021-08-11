import axios from "axios";
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from "@discordjs/voice";
import type { VoiceChannel, StageChannel } from "discord.js";

interface PlayInput {
  url: string;
  channel: VoiceChannel | StageChannel;
  name: string;
}

export async function play({ url, channel, name }: PlayInput) {
  const audioURL = url.startsWith("http")
    ? url
    : `${process.env.MEME_ARCHIVE_BASE_URL}${url}`;
  const audioReq = axios.get(audioURL, { responseType: "stream" });
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
  const player = createAudioPlayer();
  connection.subscribe(player);
  const stream = await audioReq;
  const resource = createAudioResource(stream.data);
  player.on(AudioPlayerStatus.Idle, () => {
    player.stop();
    connection.destroy();
    channel.client.user.setActivity();
  });
  player.on("error", console.error);
  connection.on("error", console.error);
  channel.client.user.setActivity(name);
  player.play(resource);
}
