import type { Interaction, VoiceChannel } from "discord.js";

/**
 * Get channel the bot should connect to
 * @param interaction Interaction that triggers the conenciton
 * @returns Voice channel promise
 */
export async function getChannel(
  interaction: Interaction
): Promise<VoiceChannel> {
  const channels = await interaction.guild.channels.fetch();
  return channels.find(
    (channel) => channel.type === "GUILD_VOICE"
  ) as VoiceChannel;
}
