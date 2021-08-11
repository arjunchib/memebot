import axios from "axios";
import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
} from "@discordjs/voice";
import type { VoiceChannel } from "discord.js";

interface PlayOptions {
  name?: string;
}

/**
 * Streams a URL and plays it on a voice channel
 * @param url
 * @param channel
 * @param options
 */
export async function play(
  url: string,
  channel: VoiceChannel,
  options: PlayOptions
) {
  // Get audio
  const audioURL = new URL(url, process.env.MEME_ARCHIVE_BASE_URL);
  const audioReq = axios.get(audioURL.href, { responseType: "stream" });

  // Connect to voice channel
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
  connection.on("error", console.error);

  // Create player
  const player = createAudioPlayer();
  player.on(AudioPlayerStatus.Idle, () => {
    player.stop();
    connection.destroy();
    channel.client.user.setActivity();
  });
  player.on("error", console.error);
  connection.subscribe(player);

  // Play audio
  const stream = await audioReq;
  if (options.name) channel.client.user.setActivity(options.name);
  const resource = createAudioResource(stream.data);
  player.play(resource);
}
