const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@main": path.resolve(__dirname, "src/pages/main"),
      "@profile": path.resolve(__dirname, "src/components/profile"),
      "@friendList": path.resolve(__dirname, "src/components/friendList"),
      "@dmList": path.resolve(__dirname, "src/components/dmList"),
    },
  },
};
