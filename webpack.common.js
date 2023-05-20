const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackWatchedGlobEntries = require("webpack-watched-glob-entries-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");

const filePath = {
  js: "./src/ts/",
  pug: "./src/pug/",
  sass: "./src/scss/",
};

/** Sassファイル読み込みの定義 */
const entriesScss = WebpackWatchedGlobEntries.getEntries(
  [path.resolve(__dirname, `${filePath.sass}**/**.scss`)],
  {
    ignore: path.resolve(__dirname, `${filePath.sass}**/_*.scss`),
  }
)();

const cssGlobPlugins = (entriesScss) => {
  return Object.keys(entriesScss).map(
    (key) =>
      new MiniCssExtractPlugin({
        // 出力するファイル名
        filename: `./css/${key}.[contenthash].css`,
      })
  );
};

/** Pug読み込みの定義 */
const entries = WebpackWatchedGlobEntries.getEntries(
  [path.resolve(__dirname, `${filePath.pug}**/*.pug`)],
  {
    ignore: path.resolve(__dirname, `${filePath.pug}**/_*.pug`),
  }
)();

const htmlGlobPlugins = (entries) => {
  return Object.keys(entries).map(
    (key) =>
      new HtmlWebpackPlugin({
        // 出力するファイル名
        filename: `${key}.html`,
        template: `${filePath.pug}${key}.pug`,
        //JS・CSS自動出力と圧縮を無効化
        inject: true,
        minify: true,
      })
  );
};

/** TypeScript読み込みの定義 */
const entriesTs = WebpackWatchedGlobEntries.getEntries([
  path.resolve(__dirname, `${filePath.js}*.ts`),
])();

module.exports = () => ({
  entry: entriesTs,

  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
    filename: "./js/[name].[contenthash].js",
  },

  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "~": path.resolve(__dirname, "src/"), // `src` はエイリアスのルートディレクトリに置き換えてください。
    },
  },

  target: "web",

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: "pug-loader",
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // CSSを別ファイルに出力する設定
          },
          {
            loader: "css-loader",
            options: {
              url: true,
              sourceMap: true, //ソースマップツールを有効
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true, //ソースマップを有効
              postcssOptions: {
                plugins: [[require("autoprefixer")({ grid: true })]],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true, //ソースマップツールを有効
            },
          },
        ],
      },
      {
        test: /\.png|\.jpg|\.jpeg|\.webp/,
        type: "asset/resource",
        generator: {
          filename: "images/[name][contenthash][ext]",
        },
      },
    ],
  },

  plugins: [
    ...cssGlobPlugins(entriesScss),
    ...htmlGlobPlugins(entries),
    new ImageMinimizerPlugin({
      // 圧縮の記述
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminGenerate,
        options: {
          plugins: [
            ["mozjpeg", { quality: 80 }], // jpgの設定
            ["pngquant", { quality: [0.8, 0.8] }], // pngの設定
          ],
        },
      },
    }),
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false, // ライセンスコメントの抽出を停止
      }),
    ],
  },

  watchOptions: {
    ignored: /node_modules/,
  },
});
