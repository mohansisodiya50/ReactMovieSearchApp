var webpack = require("webpack");
var path = require("path");

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

var config = {
    entry: DEV + "/app.js",
    output: {
      path: OUTPUT,
      filename: "bundle.js"
    },
    module: {
    loaders: [{
  	  test : /\.jsx?/,
        include: DEV,
        loader: "babel-loader",
    }]
  }
};

module.exports = config;
