const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@main": path.resolve(__dirname, "src/pages/main"),
      "@chatList": path.resolve(__dirname, "src/pages/chatList"),
      "@gameList": path.resolve(__dirname, "src/pages/gameList"),
      "@profile": path.resolve(__dirname, "src/components/profile"),
      "@friendList": path.resolve(__dirname, "src/components/friendList"),
      "@dmList": path.resolve(__dirname, "src/components/dmList"),
    },
  },
};
