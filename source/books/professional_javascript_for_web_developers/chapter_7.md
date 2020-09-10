---
title: JavaScript 高级程序设计读书笔记 第 7 章 函数表达式
date: 20120-04-22 11:53
toc: true
thumbnail: https://diamondyuan.oplinjie.cn/2019-08-26-code.jpg
---

# 第 7 章 函数表达式

函数有变量提升，可以先定义再调用。
函数表达式不会变量提升，使用前需要先赋值。

## 7.1 递归

略

## 7.2 闭包

闭包指的是有权访问另一个函数作用域中的变量的函数。常见做法是在函数内部创建了一个函数。
函数内部创建的匿名函数会包含外部函数的活动对象，这样匿名函数就可以访问外部函数的全部变量，直到匿名函数被销毁，活动对象才会被销毁。

### 7.2.1 闭包与变量

```javascript
function createFunctions() {
  let result = [];

  for (let i = 0; i < 10; i++) {
    result[i] = (function (num) {
      return function () {
        return num;
      };
    })(i);
  }
  return result;
}
```

CG 回收（逃

### 7.2.2 关于 this 对象

```javascript
let name = "The Window";
let object = {
  name: "My Object",
  getName: function () {
    let that = this;
    return function () {
      return that.name;
    };
  },
};
console.log(object.getName()());
```

可以使用 that 来保存 this

### 7.2.3 内存泄漏

略

## 7.3 模仿块级作用域

```javascript
(function () {
  //这里是块级作用域
})();
```

## 7.4 私有变量

```javascript
function MyObject() {
  let privateVariable = 10;
  function privateFunction() {
    return false;
  }
  this.publicMethod = function () {
    privateVariable++;
    return privateFunction();
  };
}
```

```javascript
function Person(name) {
  this.getName = function () {
    return name;
  };
  this.setName = function (value) {
    name = value;
  };
}

var person = new Person("Nicholas");
console.log(person.getName());
person.setName("Greb");
console.log(person.getName());
```

可以用闭包来模拟。缺点是每次调用构造函数都会创建同样的方法

## 7.5 小节

![image.png](https://cdn.nlark.com/yuque/0/2019/png/113971/1569833612252-1f3c6d74-f503-49d1-a936-3233e9d87e57.png#align=left&display=inline&height=1382&name=image.png&originHeight=1382&originWidth=1600&size=800559&status=done&width=1600)
