const { rimraf, series } = require("nps-utils");

module.exports = {
  scripts: {
    default: "npx nps start",
    start: {
      description: "Run the demo in local environment",
      default:
        "cross-env NODE_ENV=local webpack-dev-server -w --open --mode development",
    },
    test: {
      description: "Run unit tests",
      default: "npx jest",
    },
    build: {
      default: series(rimraf("./dist"), "npx tsc"),
    },
  },
};
