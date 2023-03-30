const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@main": path.resolve(__dirname, "src/pages/main"),
      "@chatList": path.resolve(__dirname, "src/pages/chatList"),
      "@gameList": path.resolve(__dirname, "src/pages/gameList"),
      "@leftSide": path.resolve(__dirname, "src/components/leftSide"),
      "@rightSide": path.resolve(__dirname, "src/components/rightSide"),
    },
  },
};
