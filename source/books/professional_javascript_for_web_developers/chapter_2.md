---
title: JavaScript 高级程序设计读书笔记 第 2 章 在HTML中使用 JavaScript
date: 2018-12-27 17:51:00
toc: true
thumbnail: https://blog-staticfile.diamondyuan.com/2019-08-26-code.jpg
---

# 第 2 章 在 HTML 中使用 JavaScript

## 2.1 `<script>` 元素

在页面插入 JavaScript 主要方法，就是使用 <script\> 元素。 <script\> 常用有下面几个属性:

- `async`(html5) 该布尔属性指示浏览器是否在允许的情况下异步执行该脚本。该属性对于内联脚本无作用 (即没有 src 属性的脚本）。
- `defer` 这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后，触发 DOMContentLoaded 事件前执行。如果缺少 src 属性（即内嵌脚本），该属性不应被使用，因为这种情况下它不起作用。对动态嵌入的脚本使用 `async=false` 来达到类似的效果。
- `src` 这个属性定义引用外部脚本的 URI，这可以用来代替直接在文档中嵌入脚本。指定了 src 属性的 script 元素标签内不应该再有嵌入的脚本
- `type` 该属性定义 script 元素包含或 src 引用的脚本语言。属性的值为 MIME 类型; 支持的 MIME 类型包括`text/javascript`, `text/ecmascript`, `application/javascript`, 和`application/ecmascript`。如果没有定义这个属性，脚本会被视作 JavaScript。如果 type 属性为 `module`，代码会被当作 JavaScript 模块 。请参见 [ ES6 In Depth: Modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/ "ES6 In Depth: Modules")

代码出现 `</script>` 会导致错误。

```js
<script type="text/javascript*>
	function sayScript (){
		alert("</script>")
	}
</script>
```

<!-- more -->

因为按照解析嵌入式代码的规则,当浏览器遇到字符串`</script>`时,就会认为那是结束的 `<script>`标签。可以通过把这个字符串分隔为两部分可以解决这个问题。

```js
<script type="text/javascript*>
	function sayScript (){
		alert("<\/script>")
	}
</script>
```

无论如何包含代码,只要不存在 defer 和 async 属性,浏览器都会按照<script\>元素在页面中 出现的先后顺序对它们依次进行解析。换句话说,在第一个 <script\>元素包含的代码解析完成后,第 二个 <script\>包含的代码才会被解析,然后才是第三个、第四个…..

### 2.1.1 标签的位置

如果把 <script\> 标签放在 <head\> 中，则必须等全部的 JavaScript 代码执行完成以后，才能呈现页面的内容。此时浏览器窗口将是一片空白。所以现代应用程序一般把 JavaScript 引用放在 <body\> 元素中页面内容的后面。如下显示:

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <!-- 这里放内容 -->
	<script src="example1.js"></script>
</body>
</html>
```

### 2.1.2 延迟脚本 defer

如果 <script\> 标签添加了 defer 属性，那么脚本会延迟到整个页面都解析完毕再运行。相当于告诉浏览器立刻下载，但是延迟执行。

```js
<script defer="defer" src="example1.js">
<script defer="defer" src="example2.js">
```

在上面的例子中，脚本将延迟到浏览器遇到 </html\> 标签后再按照它们出现的顺序依次执行。这两个脚本会先于 DOMContentLoaded 事件触发前执行。
注意 defer 只适用于外部脚本。

### 2.1.3 异步脚本

HTML5 之中为 <script\> 元素定义了 async 属性。和 defer 属性类似，async 同样只适用于外部脚本。但是和 defer 不同的是标记为 async 的脚本不保证先后顺序执行。
就拿下面的例子来说，脚本 2 可能在脚本 1 之前执行。

```js
<script async src="example1.js">
<script async src="example2.js">
```

异步脚本一定会在页面的 load 事件之前执行，但是可能在 DOMContentLoaded 事件触发之前或触发之后执行。

## 2.4 <noscript\> 元素

包含在< noscript\>元素中的内容只有在下列情况下才会显示出来

- 浏览器不支持脚本;
- 浏览器支持脚本,但脚本被禁用。

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
	<noscript>
		<p>本页面需要浏览器支持(启用) JavaScript</p>
	</noscript>
</body>
</html>
```

就像上面那个例子。这个页面会在脚本无效的情况下向用户展示一条消息。

## 2.5 小结

把 JavaScript 插入到 HTML 页面中要使用 <script\> 元素。使用这个元素可以把 JavaScript 嵌入到 HTML 页面中,让脚本与标记混合在一起;也可以包含外部的 JavaScript 文件。而我们需要注意的地方有:

- 在包含外部 JavaScript 文件时,必须将 src 属性设置为指向相应文件的 URL。而这个文件既可 以是与包含它的页面位于同一个服务器上的文件,也可以是其他任何域中的文件。
- 所有 <script\> 元素都会按照它们在页面中出现的先后顺序依次被解析。在不使用 defer 和 async 属性的情况下,只有在解析完前面 <script\>元素中的代码之后,才会开始解析后面 <script\> 元素中的代码
- 由于浏览器会先解析完不使用 defer 属性的 <script\>元素中的代码,然后再解析后面的内容, 所以一般应该把 <script\> 元素放在页面最后,即主要内容后面,</body\>标签前面。
- 使用 defer 属性可以让脚本在文档完全呈现之后再执行延迟脚本总是按照指定它们的顺序执行。
- 使用 async 属性可以表示当前脚本不必等待其他脚本,也不必阻塞文档呈现。不能保证异步脚本按照它们在页面中出现的顺序执行。
  另外,使用< noscrip\>元素可以指定在不支持脚本的浏览器中显示的替代内容。但在启用了脚本的情况下,浏览器不会显示< noscript\>元素中的任何内容。
