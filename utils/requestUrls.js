export default {
  api: {
    FURL: process.env.CLIENT_URL + "/api/songs",
    VALIDATE_OTP_URL: process.env.CLIENT_URL + "/api/validateOtp",
    REQEUST_OTP_URL: process.env.CLIENT_URL + "/api/sendOtp",
    REQEUST_SONG_META: process.env.CLIENT_URL + "/api/data",
    SERVER_SONG: process.env.SERVER_URL + "/api/getSongs",
    SERVER_OTP: process.env.SERVER_URL + "/api/requestOtp",
    SERVER_DELETE_SONG: process.env.SERVER_URL + "/api/deleteSong",
    SERVER_OTP_VALIDATE: process.env.SERVER_URL + "/api/validateOtp",
    SERVER_SONGMETA: process.env.SERVER_URL + "/api/getSongData",
    SERVER_CHECKUSER: process.env.SERVER_URL + "/api/checkUser",
  },
};
