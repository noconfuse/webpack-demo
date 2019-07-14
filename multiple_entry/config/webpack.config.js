const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const util = require("./config.js");
const entryPattern = "./src/pages/**/*.js";

module.exports = {
  entry: util.getEntry(entryPattern),
  resolve: {
    alias: {
      "@": "./src/",
      images: path.resolve(__dirname, "src/images/")
    }
  },
  output: {
    //输出
    path: path.resolve(__dirname, "../dist"), //目录输出的绝对路径
    filename: "[name]_[chunkhash:8].js", //用于输出的文件名
    chunkFilename: "[name].js" //配置无入口的chunk在输出时的文件名称
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
    ...util.getOutHtmls(entryPattern),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_DEV: JSON.stringify("development")
      }
    }),
    new CleanWebpackPlugin()
  ],
  devtool: "cheap-source-map",
  optimization: {
    minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      //抽取公共代码
      cacheGroups: {
        //注意：priority优先级
        //打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        },
        //打包业务中的公共代码
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0
        }
      }
    }
  }
};
