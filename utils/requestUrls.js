export default {
  api: {
    FURL: process.env.CLIENT + "/api/songs",
    VALIDATE_OTP_URL: process.env.CLIENT + "/api/validateOtp",
    REQEUST_OTP_URL: process.env.CLIENT + "/api/sendOtp",
    REQUEST_SONG_META: process.env.CLIENT + "/api/data",
    SERVER_SONG: process.env.SERVER + "/api/getSongs",
    SERVER_OTP: process.env.SERVER + "/api/requestOtp",
    SERVER_DELETE_SONG: process.env.SERVER + "/api/deleteSong",
    SERVER_OTP_VALIDATE: process.env.SERVER + "/api/validateOtp",
  },
};
