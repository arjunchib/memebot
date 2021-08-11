import { getVoiceConnection } from "@discordjs/voice";
import { GuildMember, VoiceChannel } from "discord.js";

/**
 * Check if the bot is currently connected to a voice channel
 * @param channel Voice channel to check
 * @returns True, if connected
 */
export function isPlaying(channel: VoiceChannel) {
  return !!getVoiceConnection(channel.id);
}
