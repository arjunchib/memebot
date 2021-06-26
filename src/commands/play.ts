import fs from "fs";

export async function play(msg) {
  if (msg.member.voice.channel) {
    const connection = await msg.member.voice.channel.join();
    const dispatcher = connection.play(fs.createReadStream("test.ogg"));
  } else {
    msg.reply("You need to join a voice channel first!");
  }
}
