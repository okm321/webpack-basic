const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");

module.exports = merge(common(), {
  mode: "production",

  devtool: "hidden-source-map",

  plugins: [],
});
