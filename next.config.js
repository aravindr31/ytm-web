module.exports = {
  reactStrictMode: true,
  env: {
    CLIENT_URL: process.env.CLIENT,
    SERVER_URL: process.env.SERVER,
  },
    presets: ["next/babel"]
};
