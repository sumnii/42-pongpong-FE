const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@main": path.resolve(__dirname, "src/pages/main/components"),
    },
  },
};
