require("dotenv").config();
var path = require("path");
var SRC_DIR = path.join(__dirname, "/client/src");
var DIST_DIR = path.join(__dirname, "/client/dist");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");


module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: "bundle.js",
    path: DIST_DIR,
  },
  plugins: [
    new CompressionPlugin({
      filename: "[path].gz[query]",
      test: /.js$|.css$/,
      algorithm: "gzip"
    }),
    new NodePolyfillPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};