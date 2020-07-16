const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = () => {
  const { NODE_ENV = "development" } = process.env;
  return {
    entry: {
      index: NODE_ENV === "local" ? "./demo/index.jsx" : "./src/index.tsx",
    },
    devtool: "source-map",
    output: {
      filename: "index.js",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      port: 9005,
      compress: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".tsx", ".jsx"],
    },
    plugins:
      NODE_ENV && NODE_ENV === "local"
        ? [
            new HtmlWebPackPlugin({
              template: "./demo/index.html",
              filename: "./index.html",
              inject: true,
            }),
          ]
        : [],
  };
};
