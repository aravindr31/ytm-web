import axios from "axios";
import requestUrls from "./requestUrls";

export const fetchUserData = async (id) => {
  let responseData = await axios
    .post(requestUrls.api.SERVER_SONG, {
      data: id,
    })
    .then(async (res) => {
      return await res.data[0].data;
    });
  return responseData;
};

export const deleteRequest = async (uid, vid) => {
  await axios.post(
    requestUrls.api.SERVER_DELETE_SONG,
    { data: { uid, vid } },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return;
};
export const requestOTP = async (id) => {
  let response = await axios.post(requestUrls.api.SERVER_OTP, { id });
  return response;
};
export const validateOtp = async (num, otp) => {
  let response = await axios({
    url: requestUrls.api.SERVER_OTP_VALIDATE,
    method: "POST",
    data: { Number: num, otp: otp },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then(async (res) => {
    return await res.data;
  });
  return response;
};

let abortController;
export const getSongData = async (userId, videoId) => {
  console.log(userId, videoId);
  if (typeof abortController != typeof undefined) {
    abortController.abort();
  }
  abortController = new AbortController();

  // const songInfo = await axios({
  //   url: requestUrls.api.SERVER_SONGMETA,
  //   method: "POST",
  //   data: { userId, videoId },
  //   signal: abortController.signal,
  // });
  // const songInfo = await axios({
  //   method: "POST",
  //   url: requestUrls.api.REQEUST_SONG_META,
  //   data: { videod: videoId },
  //   signal: abortController.signal,
  //   // headers: {
  //   //   "Access-Control-Allow-Origin": "*",
  //   // },
  // });
  const songInfo = await axios({
    method: "POST",
    url: requestUrls.api.REQEUST_SONG_META,
    data: { vid: videoId, uid: userId },
    signal: abortController.signal,
  });
  console.log(songInfo);
  return songInfo;
};
