const { rimraf, series } = require("nps-utils");

module.exports = {
  scripts: {
    default: "npx nps start",
    start: {
      description: "Run the demo in local environment",
      default:
        "cross-env NODE_ENV=development webpack-dev-server -w --open --mode development",
    },
    test: {
      description: "Run unit tests",
      default: "npx jest",
    },
    build: series(
      rimraf("./dist"),
      "cross-env NODE_ENV=production webpack --mode production"
    ),
  },
};
