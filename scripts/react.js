"use strict";
// @ts-check
const path = require("path");

function resolve(root) {
  return path.resolve(__dirname, "../source/", root[0]);
}

hexo.extend.tag.register("react", function (args) {
  require("@babel/register")({
    extensions: [".jsx"],
  });
  const data = require(resolve(args));
  return data.default;
});