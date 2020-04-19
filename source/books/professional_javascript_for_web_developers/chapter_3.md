---
title: JavaScript 高级程序设计读书笔记 第 3 章 基本概念
date: 2019-3-4 16:28:00
toc: true
thumbnail: https://blog-staticfile.diamondyuan.com/2019-08-26-code.jpg
---

# 第 3 章 基本概念

## 3.1 语法

### 3.1.1 区分大小写

ECMAScript 中的一切都区分大小写。

<!-- more -->

### 3.1.2 标识符

所谓标识符,就是指变量、函数、属性的名字,或者函数的参数。标识符可以是按照下列格式规则组合起来的一或多个字符:

- 第一个字符必须是一个字母、下划线或一个美元符号(`$`);
- 其他字符可以是字母、下划线、美元符号或数字。

## 3.4 数据类型

ECMAScript 有六种基本类型 `Undifined` `Null` `Boolean` `Number` `String` `Symbol` 和 `Object`。

### 3.4.1 typeof 操作符

```js
// Numbers
typeof 37 === "number";
typeof 3.14 === "number";
typeof Math.LN2 === "number";
typeof Infinity === "number";
typeof NaN === "number"; // 尽管NaN是"Not-A-Number"的缩写
typeof Number(1) === "number"; // 但不要使用这种形式!

// Strings
typeof "" === "string";
typeof "bla" === "string";
typeof typeof 1 === "string"; // typeof总是返回一个字符串
typeof String("abc") === "string"; // 但不要使用这种形式!

// Booleans
typeof true === "boolean";
typeof false === "boolean";
typeof Boolean(true) === "boolean"; // 但不要使用这种形式!

// Symbols
typeof Symbol() === "symbol";
typeof Symbol("foo") === "symbol";
typeof Symbol.iterator === "symbol";

// Undefined
typeof undefined === "undefined";
typeof declaredButUndefinedVariable === "undefined";
typeof undeclaredVariable === "undefined";

// Objects
typeof { a: 1 } === "object";

// 使用Array.isArray 或者 Object.prototype.toString.call
// 区分数组,普通对象
typeof [1, 2, 4] === "object";

typeof new Date() === "object";

// 下面的容易令人迷惑，不要使用！
typeof new Boolean(true) === "object";
typeof new Number(1) === "object";
typeof new String("abc") === "object";

// 函数
typeof function() {} === "function";
typeof class C {} === "function";
typeof Math.sin === "function";
typeof new Function() === "function";
```

**注意  **

```js
typeof null === "object";
```

### 3.4.5 Number 类型

#### 1.精度

浮点数值的最高精度是 17 位小数,但在进行算术计算时其精确度远远不如整数。例如,0.1 加 0.2 的结果不是 0.3。

#### 2.范围

ECMAScript 正数数值范围最大为 `Number.MAX_VALUE` 最小的数值为 `Number.Min_VALUE`,如果超出最大值，则会转换为 Infinity。
判断一个数字是否是有穷的，可以通过 `isFinite()`函数来判断。

#### 3.NaN

NaN,即非数值(Not a Number)是一个特殊的数值,这个数值用于表示一个本来要返回数值的操 作数未返回数值的情况(这样就不会抛出错误了)。
**注意**

```js
（NaN === NaN) === false;
```

判断 NaN 需要通过 `isNaN` 函数。
如果基于对象调用 isNaN ,会先使用 valueOf ，然后返回的值是否能转换为数值，如果不能，再调用 toString() 方法。

#### 4.数值转换

有三个函数可以把非数值转换为数值，`Number()`,`parseInt()`,`parseFloat`。
Number 的转换规则如下

- 如果是 Boolean，true 和 false 讲分别转换为 1 和 0
- 如果是数值，则是简单的传入和返回
- 如果是 null 返回 0
- 如果是 undefined 返回 NAN
- 如果是字符串,遵循下列规则 + 如果字符串中只包含数字(包括前面带正号或负号的情况),则将其转换为十进制数值,即 1 会变成 1,`"123"`会变成 123,而`"011"`会变成 11 + 如果字符串中包含有效的浮点格式,如 1.1,则将其转换为对应的浮点数值 + 如果字符串中包含有效的十六进制格式,例如`"0xf"`,则将其转换为相同大小的十进制整数值; + 如果字符串是空的(不包含任何字符),则将其转换为 0 + 如果字符串中包含除上述格式之外的字符,则将其转换为 NaN + 如果是对象,则调用对象的 valueof()方法,然后依照前面的规则转换返回的值。如果转换的结果是 NaN,则调用对象的 tostring()方法,然后再次依照前面的规则转换返回的字符串值。

`一元加操作符(3.5.1节将介绍)的操作与 number() 函数相同。`

`parseInt()`在转换字符串时,更多的是看其是否符合数值模式。它会忽略字
符串前面的空格,直至找到第一个非空格字符。如果第一个字符不是数字字符或者负号, parseInt()就会返回 NaN;也就是说, `parseInt('') //NaN`

- 如果第一个字符是数字字符, parseInt()会继续解析第二个字符,直到解析完所有后续字符或者遇到了一个非数字字符。

`parseInt` 的第二个参数为转换使用的进制，建议无论在任何情况都要穿入第二个参数。

`parseFloat` 也是从第一个字符(位置 0)开始解析每个字符。而且也是一直解析到字符串末尾, 或者解析到遇见一个无效的浮点数字字符为止。符串中的第一个小数点是有效的,而第二个小数点就是无效的了。

`parseFloat()` 只解析十进制的数字，如果字符串包含的是个可解析为整数的数，`parseFloat` 结果会是一个整数。

### 3.4.6 String 类型

`String` 类型用于表示由零或多个 16 位 Unicode 字符组成的字符序列,即字符串。字符串可以由单引号(`'`)或双引号`"`)表示。

```js
"\u03a3".length === 1; //true
```

2. 字符串的特点
   ECMAScript 中的字符串是不可变的。一旦创建，它们的值就不能改变。要改变变量创建的字符串，首先要销毁原来的字符串。
3. 转换为字符串
   要把值转换为字符串，有两种方式。第一种是使用几乎每个值都有的 toString 方法。多数情况下,调用 tostring 方法不必传递参数。但是,在调用数值的 tostring()方法时,可以传递一个参数：输出数值的基数。默认情况下，基数为 10。

```js
var num = 10;
console.log(num.toString(8)); // "12"
```

如果不确定值是否为 `null` 或者 `undefined` 可以使用函数 String 来转换。

```js
String(null); // "null"
String(undefined); // "undefined"
```

### 3.4.7 Object 类型

对象可以通过执行 new 操作符后跟要创建的对象类型的名称来创建。

## 3.5 操作符

### 3.5.1 一元操作符

1. 递增和递减操作符 `++`,`--`

```js
let a = 1;
console.log(++a); //2
console.log(a++); //2
console.log(a); //3
```

2. 一元加和减操作符
   加放在数值面前，对数值不会产生任何影响，如果是对非数值应用一元加操作符，会先把这个值转换成数值。

### 3.5.2 位运算

- 非 `~`
- 与 `&`
- 或 `|`
- 异或 `^`
- 左移 `<<`
- 有符号右移 `>>`
- 无符号右移 `>>>`

### 3.5.3 布尔操作符

1. 逻辑非 `!`
   可以把任何数据类型都转换为布尔值。

```js
![]; //false
!{}; //false
!123; //false
!0; //true
!NaN; //true
```

可以同时使用两个 `!`,结果与 Boolean 函数相同

2. 逻辑与`&&`
   除了用在布尔值上，也可以用在对象上。

- 如果第一个操作数是对象,则返回第二个操作数;
- 如果第二个操作数是对象,则只有在第一个操作数的求值结果为 true 的情况下才会返回该对象;
- 如果两个操作数都是对象,则返回第二个操作数;
- 如果有一个操作数是 null,则返回 null;
- 如果有一个操作数是 NaN,则返回 NaN;
- 如果有一个操作数是 undefined , 则返回 undefined

3. 逻辑或 `||`
   同上，也可以用在对象上。

- 如果第一个操作数是对象,则返回第一个操作数;
- 如果第一个操作数的求值结果为 false,则返回第二个操作数;
- 如果两个操作数都是对象,则返回第一个操作数;
- 如果两个操作数都是 null,则返回 null;
- 如果两个操作数都是 NaN,则返回 NaN;
- 如果两个操作数都是 undefined,则返回 undefined

### 3.5.4 乘性操作符

`*` `/`

### 3.5.5 加性操作符

`+` `-`

### 3.5.6 关系操作符

`<` `>` `<=` `>=`

- 如果两个操作数都是数值,则执行数值比较。
- 如果两个操作数都是字符串,则比较两个字符串对应的字符编码值。
- 如果一个操作数是数值,则将另一个操作数转换为一个数值,然后执行数值比较。
- 如果一个操作数是对象,则调用这个对象的 valueOf 方法,用得到的结果按照前面的规则执行比较。如果对象没有 valueOf 方法,则调用 toString 方法,并用得到的结果根据前面的规则执行比较。
- 如果一个操作数是布尔值,则先将其转换为数值,然后再执行比较。

因为大写字符的字符编码全部小于小写字母的字符编码，所以就会看到如下的现象。

```js
var result = "Brick" < "alphabet"; //true
var result = "23" < "3"; //true;
var result = "23 " < 3; // false
```

### 3.5.7 相等操作符

`==` `===` `!=` `!==`

1. 相等和不相等
   如果两个操作数不相等，会执行强制转型，再比较相等性

- 如果有一个操作数是布尔值,则在比较相等性之前先将其转换为数值 fase 转换为 0,而 true 转换为 1;
- 如果一个操作数是字符串,另一个操作数是数值,在比较相等性之前先将字符串转换为数值;
- 如果一个操作数是对象,另一个操作数不是,则调用对象的 valueOf()方法,用得到的基本类型值进行比较。

```js
null == undefined; //true
NaN != NaN; //true
```

2. 全等和不全等
   如果类型不相等，则返回 false

### 3.5.8 条件操作符 `?:`

```js
variable = boolean_expression ? true_value : false_value;
```

### 3.5.9 赋值操作符 `=`

在等号前面加乘性操作符、加性操作符或位操作符,可以完成复合操作。

```js
var num = 10;
num = num + 10;
//等价于下面的
var num = 10;
num += 10;
```

### 3.5.10 逗号操作符

逗号操作符可以在一行语句中执行多个操作.

```js
var num = 1,
  num2 = 2;
```

## 3.6 语句

### 3.6.1 if 语句

推荐任何时候都用代码块包起来。

### 3.6.2 do-while 语句

略

### 3.6.3 while 语句

略

### 3.6.4 for 语句

```js
for (;;) {
  console.log(1);
} // 无限循环
```

### 3.5.5 for-in 语句

用来枚举对象的属性，或者枚举数组的索引

### 3.6.6 label 语句

略 几乎不使用

### 3.6.7 break 和 continue 语句

略

### 3.6.8 with 语句

略

### 3.6.9 switch 语句

不要忘记加 `break`

## 3.7 函数

通过 return 来表示返回值，函数会在 return 之后立刻退出，任何 return 后的语句都不会执行。finally 除外。

```js
function tt() {
  try {
    return 2;
  } catch {
  } finally {
    return 1;
  }
}
tt(); // 1
```

如果 return 后不带任何返回值，则相当于返回 undefined 。

> 推荐的做法是要么让函数始终都返回一个值,要么永远都不要返回值。否则,如果函教有时候返回值,有时候有不返回值,会给调试代码带来不便。

### 3.7.1 理解参数

函数内可以通过 arguments 来访问参数，arguments 不是 Array 的实例，虽然有 length 来表示参数的个数。但是没有 Array 的一些方法。

### 3.7.2 没有重载

定于两个名字相同的函数，则名字属于后定义的函数，可以通过检查传入参数的类型和数量，模拟重载。

## 3.8 小结

JavaScript 的核心语言特性在 ECMA-262 中是以名为 ECMAScrip t 的伪语言的形式来定义的。ECMAScript 中包含了所有基本的语法、操作符、数据类型以及完成基本的计算任务所必需的对象,但没有对取得输入和产生输出的机制作出规定。理解 ECMAScript 及其纷繁复杂的各种细节,是理解其在 Web 浏览器中的实现 ————JavaScript 的关键。

- ECMAScript 中的基本数据类型包括 Undefined、Null、 Boolean、Number、String 和 Symbol
- 与其他语言不同, ECMScript 没有为整数和浮点数值分别定义不同的数据类型, Number 类型可用于表示所有数值。
- ECMAScript 中也有一种复杂的数据类型,即 Object 类型,该类型是这门语言中所有对象的基础类型。
- 严格模式为这门语言中容易出错的地方施加了限制。
- ECMAScript 提供了很多与 C 及其他类 C 语言中相同的基本操作符,包括算术操作符、布尔操作符、关系操作符、相等操作符及赋值操作符等。
- ECMAScript 从其他语言中借鉴了很多流控制语句,例如 if 语句、for 语句和 switch 语句等。
  ECMAScript 中的函数与其他语言中的函数有诸多不同之处。
- 无须指定函数的返回值,因为任何 ECMAScript 函数都可以在任何时候返回任何值。
- 实际上,未指定返回值的函数返回的是一个特殊的 undefined 值。
- ECMAScript 中也没有函数签名的概念,因为其函数参数是以一个包含零或多个值的数组的形式传递的。
- 可以向 ECMAScript 函数传递任意数量的参数,并且可以通过 arguments 对象来访向这些参数。
- 由于不存在函数签名的特性, ECMAScript 函数不能重载。
