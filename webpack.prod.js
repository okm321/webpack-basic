const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = merge(common(), {
  mode: "production",

  devtool: "hidden-source-map",

  plugins: [
    // ビルド前に、/dist/images/内の画像を/src/images/にコピーする
    // new FileManagerPlugin({
    //   events: {
    //     onStart: {
    //       copy: [
    //         {
    //           source: path.resolve(__dirname, "dist/images/*"),
    //           destination: path.resolve(__dirname, "src/images/"),
    //         },
    //       ],
    //     },
    //   },
    // }),
  ],
});
