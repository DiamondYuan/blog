---
title: JavaScript 高级程序设计读书笔记 第 5 章 引用类型
date: 2019-3-24 13:45:00
toc: true
more: true
tags:
  - JavaScript
  - JavaScript 高级程序设计
categories:
  - 读书笔记
thumbnail: https://blog-staticfile.diamondyuan.com/2019-08-26-code.jpg
---

# 第 5 章 引用类型

引用类型的值（对象）是引用类型的一个实例。对象是使用 new 操作符后跟一个构造函数来创建的。构造函数本身就是一个函数。

```js
var person = new Object();
```

<!-- more -->

## 5.1 Object 类型

创建 object 类型的实例有两种方式，一种是 new 操作符后面跟 Object 构造函数，另一种是用对象字面量表示法。例如 `var person = {};`
一般来说访问对象属性都用点来表示，不过也可以使用方括号表示法来访问对象属性。

```js
var person = { name: "Diamond" };
console.log(person.name); //Diamond
console.log(person["name"]); //Diamond
```

使用方括号表示的时候可以使用变量。

```js
var key = "name";
console.log(person[key]); //Diamond
```

## 5.2 Array 类型

初始化也有两种，一种是使用 Array 构造函数，或者也可以使用字面量表示。

```javascript
var colors = new Array();
var names = [];
```

访问数组的值，要使用方括号并且提供基于 0 的数字索引。
`length` 永远为数组的最后一项的索引 +1 。最多包含 4294967295 个项。

```javascript
let data = [];
data[100] = 10;
console.log(data.length); //101
```

### 5.2.1 检测数组

`Array.isArray`

### 5.2.2 转换方法

```javascript
let data = [1, 2];
console.log(data.toString() === data.join(",")); //true
```

### 5.2.3 栈方法

- push 入栈
- pop 出栈

### 5.2.4 队列方法

- push 入队
- shift 出队

### 5.2.5 重排序方法

- reverse 反转
- sort 排序

### 5.2.6 操作方法

- concat 连接
- slice 基于当前数组中的一或多个项创建一个新数组
- splice 删除/插入/替换

### 5.2.7 位置方法

- indexOf
- lastindexOf

### 5.2.8 迭代方法

- every 对数组中的每一项运行给定函数,如果该函数对每一项都返回 true,则返回 true。
- filter 对数组中的每一项运行给定函数,返回该函数会返回 true 的项组成的数组。
- forEach 对数组中的每一项运行给定函数。这个方法没有返回值。
- map 对数组中的每一项运行给定函数,返回每次函数调用的结果组成的数组。
- some 对数组中的每一项运行给定函数,如果该函数对任一项返回 true,则返回 true

### 5.2.9 缩小方法

- reduce
- reduceRight
  上面两个函数都接受四个参数，前一个值、当前值、项的索引和数组对象。这个函数返回的任何值都会作为第一个参数自动传给下一项。

## 5.3 Date 类型

注意

```javascript
console.log(new Date().getSeconds()); //返回秒数 范围是0~59
console.log(new Date().getDay()); //返回星期几 0 表示星期天
console.log(new Date().getMonth()); //返回几月份 0 表示1月 11表示12月
```

## 5.4 `RegExp` 类型

正则语法如下 `var expression = / pattern / flags;`
Flag 支持三个标志,可以一个或者多个

- g 表示全局，否则会在第一个匹配后立刻停止
- I 表示不区分大小写
- m 表示多行模式
-

### 5.4.1 实例属性

- gobal 布尔值,表示是否设置了 g 标志。
- ignoreCase 布尔值,表示是否设置了 i 标志
- lastIndex 整数,表示开始搜索下一个匹配项的字符位置,从 0 算起。
- multiline 布尔值,表示是否设置了 m 标志。
- source 正则表达式的字符串表示,按照字面量形式而非传入构造函数中的字符串模式返回。

### 5.4.2 `RegExp` 实例方法

RegExp 对象的主要方法是 exec ,该方法是专门为捕获组而设计的。exec 接受一个参数,即要应用模式的字符串,然后返回包含第一个匹配项信息的数组;或者在没有匹配项的情况下返回 null.
对于 exec 方法而言,即使在模式中设置了全局标志,它每次也只会返回一个匹配项。在不设置全局标志的情况下,在同一个字符串上多次调用 exec 将始终返回第一个匹配项的信息。而在设置全局标志的情况下,每次调用 exec 则都会在字符串中继续查找新匹配项。
正则表达式的第二个方法是 test ,它接受一个字符串参数。在模式与该参数匹配的情况下返回 true;否则,返回 false。
RegExp 实例继承的 tostring 方法会返回正则表达式的字面量。

## 5.5 Function 类型

函数可以通过 Function 构造函数来创建。

```javascript
var sum = Function("num1", "num2", "return num1 + num2");
```

### 5.5.1 没有重载

相同函数名的函数会相互覆盖

### 5.5.2 函数声明与函数表达式

解析器在向执行环节加载数据时，会率先去读函数声明，使其在执行任何代码之前可用。而函数表达式，则必须等到解析器执行到它所在的代码行。

### 5.5.3 作为值的函数

函数除了可以作为值使用，不仅可以把一个函数传递给另一个函数，还可以将一个函数作为另一个函数的结果返回。

### 5.5.4 函数的内部属性

this 引用的是函数据以执行的环境对象。在严格模式下，全局作用域调用函数时候，this 引用是 window。
函数名字仅仅是一个包含指针的变量，所以把函数赋值给其他对象，调用时候指向的仍然是同一个函数。

#### 严格模式下被废弃或者不推荐的内容

`arguments`  有一个名叫 `callee`  的属性，指向拥有这个 arguments 对象的函数。
函数有一个对象属性 `caller`  保存着调用当前函数的函数的引用。如果在全局调用，则它的值为 `null` .
严格模式下，全局调用的函数，this 指向的是 `undifined`

### 5.5.5 函数属性和方法

每个函数都包含两个属性，length 和 prototype。lenght 属性表示函数希望接收的命名参数的个数。
对于引用类型而言，prototype 是保存它们所有实例方法的真正所在。诸如 toString 和 valueOf 都保存在 prototype 下。
每个函数都包含两个非继承而来的方法 `call`  和 `apply` .这两个方法用途都是在特定作用域下调用函数，等于是设置 this 的值。首先，apply 接收两个参数，一个在其中运行函数的作用域，另一个是参数数组。可以是 array 的实例，也可以是 arguments 对象。
call 和 apply 作用相同，只是接收参数的方法不同。call 第一个参数和 apply 相同，其他参数都是直接传递给函数。
bind 方法会创建一个函数的实例，其 this 会被绑定到传给 bind 函数的值。
函数的 toSring 会返回函数的代码。

## 5.6 基本包装类型

每当读取基本类型值的时候，后台就会创建一个对应的基本包装类型的对象。让我们能够调用一些方法来操作这些属性。

### 5.6.1 Boolean 类型

建议不要使用。

### 5.6.2 Number 类型

```javascript
var numberObject = new Number(10); //创建
```

- toSring 方法传递基数，可以转换进制。
- toFixed 传入位数，返回数值的字符串表示，会四舍五入。IE8 以及之前有 bug
- toExponential 返回指数表示法，参数指定输出结果中的小数位数
- toPrecision ，会根据情况智能判断使用  toFixed 还是  toExponential
  建议不要实例化 Number ，因为 typeof 会显示 object。

### 5.6.3 String 类型

略 详情见[ MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

## 5.7 单体内置对象

ECMAScript 实现提供的，不依赖于宿主环境的对象，在 ECMAScript 程序执行前就已经存在了。

### 5.7.1 Global 对象

兜底对象，不属于其他对象的属性和方法，最终都是它的属性。

#### 1. URI 编码方法

`encodeURI` 和 `encodeURIComponent` 都可以对 URL 编码。
`encodeURI` 主要对 URI 编码，而 `encodeURIComponent` 则会对任何非标准字符编码。编码对应有两个解码方法 `decodeURI` , `decodeURIComponent`。

#### 2. eval 方法

只接受一个参数，就是要执行的 ECMAScript 字符串。被执行代码具有与该环境相同的作用域链。严格模式下，外部无法访问到 eval 中创建的任何变量和函数。

#### 3. Global 对象的属性

所有原生引用类型的构造函数都是 `Global` 对象的属性。还有 undefined ,NaN 和 Infinity 等。

#### 4.window 对象

在浏览器环境下，全剧作用域中声明的所有变量和函数，都成为了 window 对象的的属性。

#### 5.Math 对象

详情可见 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math)。

### 5.8 小结

对象在 Javascript 中被称为引用类型的值,而且有一些内置的引用类型可以用来创建特定的对象
现简要总结如下:

- 引用类型与传统面向对象程序设计中的类相似,但实现不同;
- Object 是一个基础类型,其他所有类型都从 Object 继承了基本的行为;
- Array 类型是一组值的有序列表,同时还提供了操作和转换这些值的功能;
- Date 类型提供了有关日期和时间的信息,包括当前日期和时间以及相关的计算功能;
- RegExp 类型是 ECMAScrip t 支持正则表达式的个接口,提供了最基本的和一些高级的正则表达式功能。
  函数实际上是 Function 类型的实例,因此函数也是对象;而这一点正是 Javascript 最有特色的地方。由于函数是对象,所以函数也拥有方法,可以用来增强其行为.因为有了基本包装类型,所以 JavaScript 中的基本类型值可以被当作对象来访问。三种基本包装类型分别是: Boolean、 Number 和 String。以下是它们共同的特征:
- 每个包装类型都映射到同名的基本类型;
- 在读取模式下访问基本类型值时,就会创建对应的基本包装类型的一个对象,从而方便了数据操作;
- 操作基本类型值的语句一经执行完毕,就会立即销毁新创建的包装对象。
  在所有代码执行之前作用域中就已经存在两个内置对象,Global 和 Math 在大多数 ECMAScript 实现中都不能直接访问 Global 对象;不过,web 浏览器实现了承担该角色的 window 对象。全局变量和函数都是 Global 对象的属性。Math 对象提供了很多属性和方法,用于辅助完成复杂的数学计算任务。
