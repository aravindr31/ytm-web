require(dotenv).config();
const ydl = require("youtube-dl-exec");
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const videoid = req.query.id;
  let out = await ydl(`https://www.youtube.com/watch?v=${videoid}`, {
    dumpSingleJson: true,
    noWarnings: true,
    noCallHome: true,
    noCheckCertificate: true,
    preferFreeFormats: true,
    youtubeSkipDashManifest: true,
    extractAudio: true,
  });
  await res.json(out);
}
