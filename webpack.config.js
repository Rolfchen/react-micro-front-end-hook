const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = () => {
  const { NODE_ENV = "development" } = process.env;
  return {
    entry: {
      index:
        NODE_ENV === "development" ? "./demo/index.tsx" : "./src/index.tsx",
    },
    devServer: {
      port: 9004,
      compress: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
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
      extensions: [".ts", ".js", ".tsx"],
    },
    plugins:
      NODE_ENV && NODE_ENV != "production"
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
