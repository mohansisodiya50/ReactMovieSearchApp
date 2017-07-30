var webpack = require("webpack");
var path = require("path");

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

var config = {
  entry: {
    pageA: DEV + "/index.jsx",
    pageB: DEV + "/movieDetails.jsx"
  },
  output: {
    path: OUTPUT,
    filename: "[name].myCode.js"
  },
  module: {
  loaders: [{
      include: DEV,
      loader: "babel-loader",
  }]
}
};

module.exports = config;
