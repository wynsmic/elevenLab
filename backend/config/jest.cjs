const path = require("path");
module.exports = {
  testEnvironment: "node",
  rootDir: path.join(__dirname, ".."),
  coveragePathIgnorePatterns: ["/node_modules/"]
};
