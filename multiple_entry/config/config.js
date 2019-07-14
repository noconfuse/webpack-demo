const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
function getEntry(globPath) {
  var entry = {};
  glob.sync(globPath).forEach(function(path) {
    let nameIndex = path.split("/").length - 2;
    let name = path.split("/")[nameIndex];
    entry[name] = path;
  });
  return entry;
}

function getOutHtmls(entryPath) {
  let outHtmls = [];
  glob.sync(entryPath).forEach(p => {
    let nameIndex = p.split("/").length - 2;
    let name = p.split("/")[nameIndex];
    let dirname = path.dirname(p);
    outHtmls.push(
      new HtmlWebpackPlugin({
        filename: `${name}.html`,
        template: `${dirname}/${name}.html`,
        inject: true,
        chunks: [name, "common", "vendor"] //这里的common、vendor是为了之后抽取公共代码后，自动引入相应的js文件
      })
    );
  });
  return outHtmls;
}

module.exports = { getEntry, getOutHtmls };
