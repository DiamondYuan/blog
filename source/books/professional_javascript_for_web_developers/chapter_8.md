---
title: JavaScript 高级程序设计读书笔记 第 8 章 BOM
date: 20120-04-23 11:39
toc: true
thumbnail: https://diamondyuan.oplinjie.cn/2019-08-26-code.jpg
---

# 第 8 章 BOM

## 8.1 window 对象

window 即是通过 JavaScript 访问浏览器窗口的一个接口,又是 ECMAScript 规定的 Global 对象。
全局声明作用域下面的对象，会成为 window 的一个属性。

```javascript
var a = 1;
window.a === 1; //true
```

### 8.1.6 间歇调用和超时调用

JavaScript 是单线程语言,但它允许通过设置超时值和间歇时间值来调度代码在特定的时刻执行。

```javascript
let timer = setTimeout(() => {
  console.log("Hello");
}, 1000);
clearTimeout(timer);
```

```javascript
let timer = setInterval(() => {
  console.log("Hello");
}, 10);
clearInterval(timer);
```

第二个参数是一个表示等待多长时间的毫秒数,但经过该时间后指定的代码不一定会执行。 JavaScript 是一个单线程序的解释器,因此一定时间内只能执行一段代码。为了控制要执行的代码,就有一个 JavaScript 任务队列。这些任务会按照将它们添加到队列的顺序执行。setTimeout() 的第二个参数告诉 JavaScript 再过多长时间把当前任务添加到队列中。如果队列是空的,那么添加的代码会立即执行;如果队列不是空的,那么它就要等前面的代码执行完了以后再执行。

### 8.1.7   系统对话框

```javascript
alert(`Hello world`);
confirm("Do you sure");
```

## 8.2 location 对象

### 8.2.2 位置操作

```javascript
object.assign("https://www.qq.com");
window.location = "https://www.qq.com";
location.href = "https://www.qq.com";
```

上方三种方法等价，也可以单独修改 hash、search、hostname、pathname、port 等属性。每次修改 location 等属性(除了 hash)，都会刷新页面。

> HTML 5 中有 history，可以修改路由而不刷新页面。

上面等方式修改 URL 以后，浏览器的历史记录中就会新生成一条历史记录。如果要禁止这种行为，可以使用 `replace`  方法。
还可以使用 `reload`  方法来刷新页面，如果要强制从服务器加载，可以增加 true 参数。

```javascript
location.reload(); //重新加载(有可能从缓存中加载)
location.reload(true); //重新加载(从服务器重新加载)
```

## 8.3 navigator 对象

navigatior 提供了浏览器的一些信息，具体参数可以看  [链接](https://developer.mozilla.org/en-US/docs/Web/API/Navigator#Browser_compatibility).

常用的可以看下表

| 属性          | 用途                   |
| ------------- | ---------------------- |
| onLine        | 是否在线               |
| cookieEnabled | cookie 是否启用        |
| userAgent     | 浏览器的用户代理字符串 |

### 8.3.2 注册处理程序

`registerProtocolHandler` `registerContentHandler`  可以让站点指明它可以处理特定类型的信息。例如 RSS

## 8.4 screen 对象

详情可以看  [链接](https://developer.mozilla.org/zh-CN/docs/Web/API/Screen)

## 8.5 hisotry 对象

DOM `window`对象通过`history`对象提供了对浏览器历史的访问。它暴露了很多有用的方法和属性，允许你在用户浏览历史中向前和向后跳转，同时，从 HTML5 开始提供了对 history 栈中内容的操作。

history 主要通过  `go`,`back`,`forward`。
history 对象还有一个 length 属性,保存着历史记录的数量。

```javascript
// 在history中向后跳转
window.history.back();
window.history.go(-1);

// 向前跳转
window.history.forward();
window.history.go(1);

// 当前页
window.history.go(0);
```

![image.png](https://cdn.nlark.com/yuque/0/2019/png/113971/1564496151820-97a33b72-b84e-4b1d-b21e-4c342fba8483.png#align=left&display=inline&height=502&name=image.png&originHeight=1004&originWidth=1572&size=856976&status=done&width=786)
