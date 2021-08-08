import { getVoiceConnection } from "@discordjs/voice";
import { CommandContext } from "disky";
import { GuildMember } from "discord.js";

export function isPlaying({ interaction, client }: CommandContext) {
  return !!getVoiceConnection(
    (interaction.member as GuildMember).voice.channel.id
  );
}

export function hasVoiceChannel({ interaction }: CommandContext) {
  return (interaction.member as GuildMember).voice.channel;
}
