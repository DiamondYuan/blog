---
title: JavaScript 高级程序设计读书笔记 第 1 章 JavaScript 简介
date: 2018-12-27 16:28:00
tags:
  - JavaScript
  - JavaScript 高级程序设计
categories:
  - 读书笔记
thumbnail: https://blog-staticfile.diamondyuan.com/2019-08-26-code.jpg
---

# 第 1 章 JavaScript 简介

完整的 Javascript 实现应该由三部分组成 `ECMAScript` `DOM` `BOM`。

## 1.2.1 ECMAScript

ECMAScript 和浏览器没有依赖关系，浏览器只是 ECMAScript 可能的宿主环境之一。宿主环境不仅提供基本的 ECMAScript 实现，同时也会提供该语言的扩展,以便语言与环境之间对接交互。而这些扩展——如 DOM，则利用 ECMAScript 的核心类型和语法提供更多具体功能。
ECMAScript 则大致规定了这门语言的下列组成部分。

- 语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符
- 对象

## 1.2.2 文档对象模型 (DOM)

1.2.2 文档对象模型(DOM)
文档对象模型(DOM, Document Object Model )是针对 XML 但经过扩展用于 HTML 的 API。
利用 DOM API，开发人员就可以轻松自如地删除、添加、替换或修改任何节点。

## 1.2.3 浏览器对象模型(BOM)

BOM 是支持访问和操作浏览器窗口的浏览器对象模型(BOM, Browser Object Model) 的 API,开发人员使用 BOM 可以控制浏览器显示的页面以外的部分。但人们习惯上也把所有针对浏览器的 JavaScript 扩展算作 BOM 的一部分。

## 1.3 JavaScript 版本

不同的浏览器支持不同的 JavaScript，有一些高级的 API 就无法在古老的浏览器中使用。

## 1.4 小结

JavaScript 是一种专为与网页交互而设计的脚本语言,由下列三个不同的部分组成

- ECMAScript,由 ECMA-262 定义,提供核心语言功能;
- 文档对象模型(DOM),提供访问和操作网页内容的方法和接口;
- 浏览器对象模型(BOM),提供与浏览器交互的方法和接口。
