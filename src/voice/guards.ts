import { CommandContext } from "../../../disky/lib";

export function isPlaying({ msg, client }: CommandContext) {
  return client.voice.connections.has(msg.member.voice.channel.id);
}

export function hasVoiceChannel({ msg }: CommandContext) {
  return msg.member.voice.channel;
}
