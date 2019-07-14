const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //用于生成html文件
module.exports = {
  entry: "./main.js", //入口文件
  mode: "development", //制定mode
  resolve: {
    alias: {
      "@": "./src/",
      images: path.resolve(__dirname, "src/images/")
    }
  },
  output: {
    //输出
    path: path.resolve(__dirname, "dist"), //目录输出的绝对路径
    filename: "[name]_[chunkhash:8].js" //用于输出的文件名
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } }, //测试css-module,这里一定两个目录都需要配置
          { loader: "less-loader", options: { modules: true } }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        use: ["file-loader"]
      }
    ]
  },
  devServer: {
    host: "127.0.0.1",
    contentBase: path.join(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./template.html",
      filename: "index.html"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_DEV: JSON.stringify("development")
      }
    })
  ],
  devtool: "cheap-source-map",
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
};
