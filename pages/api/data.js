import ytdl from "ytdl-core";
import nc from "next-connect";
import cors from "cors";
import axios from "axios";
import requestUrls from "../../utils/requestUrls";
const handler = nc()
  .use(cors())
  .post(async (req, res) => {
    const body = req.body;
    let check = await axios.post(requestUrls.api.SERVER_CHECKUSER, {
      uid: req.body.uid,
    });
    const info = await ytdl.getInfo(body.vid);
    const audio = ytdl.filterFormats(info.formats, "audioonly");
    res.json(audio[0]);
  });
export default handler;
