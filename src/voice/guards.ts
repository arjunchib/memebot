import { getVoiceConnection } from "@discordjs/voice";
import { CommandContext } from "disky";

export function isPlaying({ msg, client }: CommandContext) {
  return !!getVoiceConnection(msg.member.voice.channel.id);
}

export function hasVoiceChannel({ msg }: CommandContext) {
  return msg.member.voice.channel;
}
