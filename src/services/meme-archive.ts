import axios from "axios";

export default axios.create({
  baseURL: process.env.MEME_ARCHIVE_BASE_URL,
});
