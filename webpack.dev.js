const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const path = require("path");

module.exports = merge(common(), {
  mode: "development",

  devServer: {
    static: path.resolve(__dirname, "src"),
    open: true,
    port: 9000,
    hot: true,
  },

  devtool: "source-map",
});
