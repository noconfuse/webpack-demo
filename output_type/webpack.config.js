const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: "./src/unary.js", //入口文件
  output: {
    //输出
    path: path.resolve(__dirname, "lib"), //目录输出的绝对路径
    filename: "[name].js", //用于输出的文件名
    library: "selfPlugin",
    libraryTarget: "umd" //支持var、this、commonjs、commonjs2、amd、umd、window、global
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_DEV: JSON.stringify("development")
      }
    })
  ]
  // optimization: {
  //   minimizer: [new UglifyJsPlugin()]
  // }
};
