---
title: JavaScript 高级程序设计读书笔记 第 6 章 面向对象的程序设计
date: 2019-9-30 13:45:00
toc: true
more: true
tags:
  - JavaScript
  - JavaScript 高级程序设计
categories:
  - 读书笔记
thumbnail: https://blog-staticfile.diamondyuan.com/2019-08-26-code.jpg
---

# 第 6 章 面向对象的程序设计

JavaScript 中的对象定义为**“无序属性的集合,其属性可以包含基本值、对象或者函数。”**每一个对象都是基于一个引用类型创建的。

## 6.1 理解对象

创建自定义对象最简单的方式就是创建一个 Object 的实例，然后为它添加属性和方法。

### 6.1.1 属性类型

ECMAScript 中有两种属性:数据属性和访问器属性。

#### 数据属性

数据属性 数据属性包含一个数据值的位置，在这个位置可以读取和写入值。数据属性有四个描述其行为的特性。

- **Configurable** 表示能否通过 delete 删除属性从而重新定义属性,能否修改属性的特性,或者能否把属性修改为访问器属性。默认 `true`
- **Enumerable** 表示能否通过 for-in 循环返回属性。默认 `true`
- **Writeble** 表示能否修改属性的值。 `true`
- **Value**包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。默认 `undefined`

要修改属性默认的特性，需要使用 `Object.defineProperty()` 方法。这个方法

接收三个参数:属性所在的对象、属性的名字和一个描述符对象。其中,描述符对象的属性必须是: configurable、 enumerable、 writable和 value。设置其中的一或多个值,可以修改对应的特性值。

**注意**一旦修改 configurable 则再也不能修改回去了。

在调用`Object.defineProperty()`方法时,如果不指定 configurable，enumerable 和 writable 特性的默认值都是 false。

#### 访问器属性

访问器属性不包含数据值 它们包含一对 getter 和 setter 函数。
在读取访问器属性时,会调用 getter 函数,这个函数负责返回有效的值;在写入访问器属性时,会调用 setter 函数并传入新值,这个函数负责决定如何处理数据。访问器属性有如下4个特性。

- **Configurable**表示能否通过 delete 删除属性从而重新定义属性,能否修改属性的特性,或者能否把属性修改为数据属性。
- **Enumerable**表示能否通过for-in 循环返回属性。
- **Get** 在读取属性时调用的函数。默认值为 undefined
- **Set** 在写人属性时调用的函数。默认值为 undefined

访问器属性不能直接定义，必须使用 Object.defineProperty 来定义。

### 6.1.2 定义多个属性

使用 Object.defineProperties 方法。可以同时定义多个属性。

```javascript
let obj = {};

Object.defineProperties(obj, {
  _name: {
    value: 'diamondyuan',
  },
  name: {
    get: function() {
      return this._name;
    },
  },
});

console.log(obj.name);
```

### 6.1.3 读取属性的特性

使用 Object. getOwnPropertyDescriptor 可以取得给定属性的描述符。

## 6.2 创建对象

### 6.2.1 工厂模式

用工厂模式函数来封装以特定接口创建对象的细节。

```javascript
function personFactory(name, age) {
  let o = new Object();
  o.name = name;
  o.age = age;
  o.sayName = function() {
    console.log(this.name);
  };
  return o;
}

let person1 = personFactory('DiamondYuan', 20);
person1.sayName();
```

### 6.2.2 构造函数模式

通过构造函数可以创建特定类型的对象，所以可以自定义构造函数。来定义自定义对象的属性和方法。

```javascript
function Person(name, age) {
	this.name = name;
	this.age = age;
	this.sayName = function() {
		console.log(this.name);
	};
}

let person1 = new Person('DiamondYuan', 20);
person1.sayName();
```

调用构造函数需要使用 new 操作符，实际会经历下面四个步骤

- 创建一个新对象
- 将构造函数的作用域赋值给新对象
- 执行构造函数中的代码
- 返回新对象

通过 instanceof 可以识别构造函数类型。这个是比工厂模式好的地方。

#### 1. 将构造函数当作函数

直接运行构造函数，会把值赋值给 window，在严格模式下会报错。可以使用 call apply 来模拟 new

#### 2.构造函数的问题

1. 如果直接在构造函数里定义函数，那么不同实例上的同名函数是不等的。
1. 如果在全局里定义函数，再再构造函数里把函数绑定到对象上，这样在全局作用域下定义的函数只能被某个对象调用，而且需要定义很多全局函数，无封装性可言。

### 6.2.3 原型模式

我们创建的每一个函数都有一个 `prototype` 原型属性,指向包含可以由特定类型的所有实例共享的属性和方法，即 `prototype` 就是通过构造函数而创建的对象实例的原型对象。使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法。

1. 理解原型对象

只要创建了一个函数，那么该函数会有一个 `prototype` 的属性，这个属性指向函数的原型对象。

所有原型对象都会有自动获得一个 `constructor` 的属性。这个属性包含一个指向 `prototype` 属性所在函数的指针。

```javascript
function Person() {
}

console.log(Person.prototype.constructor === Person) //true
```

创建自定义构造函数，其原型对象只会取得 `constructor` 属性，其他方法都是由 Object 继承而来。每当调用构造函数创建一个新实例后，该实例都将包含一个指针，指向构造函数的原型对象。在 `ECMA-262` 第 5 版中管这个指针叫 `[[Prototype]]`，在 Firefox Safari Chrome ，每一个对象都支持一个属性 `__proto__`。

```javascript
const person = new Person();

console.log(person.__proto__ === Person.prototype); //true
```

虽然在所有实现中都无法访问到 `[[prototype]]`，但是可以通过 `isPrototypeOf` 方法来确认这种关系。

```javascript
const person = new Person();

Person.prototype.isPrototypeOf(person); //true
```

在 `ECMAScript` 5 增加了一个新的方法 `Object.getPrototypeOf` 方法来获取 `[[prototype]]` 的值。

```javascript
const person = new Person();

console.log(Object.getPrototypeOf(person) === Person.prototype);
```

当代码读取对象属性，首先会从对象实例本身开始，如果在实例中找到了具体给定名字的属性，则返回该属性的值。否则就去原型对象上面找。

虽然可以通过实例对象访问原型中的值，但是不能通过原型对象实例重写原型中的值。在实例中添加属性，会写到实例对象上，屏蔽同名的原型对象上的值。

可以通过 `hasOwnProperty()` 来检测一个属性是否存在于实例中。

```javascript
function Person() {
}

Person.prototype.name = 'Old'
const person = new Person()
person.name = 'DiamondYuan'
console.log(person.hasOwnProperty('name')) //ture
delete person.name;
console.log(person.name) //old
```

`Object.getOwnPropertyDescriptor` 方法只能用于实例属性。如果要获取原型属性，必须直接在原型对象上调用。

2. 原型与 `in` 操作符

`for in` 与 `Object.keys` 可以获取对象全部可枚举的属性。如果要获取全部属性，包括可枚举与不可枚举，可以使用 `Object.getOwnPropertyNames()` 方法

```javascript
function Person() {
}
Person.prototype.name = 'Old'
const person = new Person()
console.log(Object.getOwnPropertyNames(Person.prototype)) //[ 'constructor', 'name' ]
```

3. 更简单的原型方法

可以用一个包含所有属性和方法的对象字面量来重写整个原型对象。

```javascript
function Person() {}

Person.prototype = {
  name: 'DiamondYuan',
  sayName: function() {
    return this.name;
  },
};
```

此时 `constructor` 不再指向 `Person` 函数，需要自己设置成适当的值。而且需要用 `Object.defineProperty` 修改 `constructor` 的特性。
4. 原型的动态性
由于在原型中查找值的过程是一次搜索,因此我们对原型对象所做的任何修改都能够立即从实例上反映出来——即使是先创建了实例后修改原型也照样如此。
而如果重写了整个原型对象，那么就切断现有原型和之前已经存在的对象实例之间的联系，引用的还是原来的原型。
5. 原声对象的原型
原生对象也是在构造函数的原型上定义了方法。

```javascript
console.log(Array.prototype.sort) //[Function: sort]
```

> 不推荐直接修改原生对象的原型


6. 原型对象的问题

因为属性是被多个实例共享的。如果属性是引用类型，那么修改会在全部的实例中反映出来。

### 6.2.4 组合使用构造函数模式和原型模式

```javascript
function Person(name) {
	this.name = name;
}
Person.prototype.sayName = function() {
	return this.name;
};
var person = new Person('DiamondYuan');

console.log(person.sayName());
```

用原型模式定义方法和共享的属性。构造函数定义实例属性。

### 6.2.5 动态原型模式

```javascript
function Person(name) {
  this.name = name;

  if (typeof this.sayName != 'function') {
    Person.prototype.sayName = function() {
      return this.name;
    };
  }
}

var person = new Person('DiamondYuan');

console.log(person.sayName());
```

可以把信息都封装在构造函数里。

### 6.2.6 寄生构造模式

```javascript
function Person(name, age) {
	let o = new Object();
	o.name = name;
	o.age = age;
	o.sayName = function() {
		console.log(this.name);
	};
	return o;
}

var person = new Person('DiamondYuan', 12);

person.sayName();
```

和工厂模式代码一样，在构造函数内末尾添加`return`，重写构造函数的返回值。

### 6.2.7 稳妥构造函数

```javascript
function Person(name) {
	let o = new Object();
	o.name = name;
	o.sayName = function() {
		return name;
	};
	return o;
}

var person = Person('DiamondYuan');

console.log(person.sayName());
```

不使用`new` 和 `this`，除了 `sayName`，没有其他任何方法访问到 `name`。

## 6.3 继承

`ECMAScript` 中只有实现继承，无接口继承。

### 6.3.1 原型链

可以让子类型的原型对象指向父类型的实例。层层递进，构成了原型链。

```javascript
function SuperType() {
  this.property = true;
}
SuperType.prototype.getSuperValue = function() {
  return this.property;
};

function SubType() {
  this.subProperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function() {
  return this.subProperty;
};

var instance = new SubType();
console.log(instance.getSubValue()); //false
console.log(instance.getSuperValue()); //true
instance.__proto__.__proto__ === SuperType.prototype //true
```

注意，上面代码中 `instance.constructor` 指向了 `SuperType`。因为原来 这是因为原来 `SubType. prototype`中的 `constructor` 被重写了。 见 6.2.3.3

![image.png](https://cdn.nlark.com/yuque/0/2019/png/113971/1569829354358-eee885ca-345f-495c-a48f-ea588bd53a84.png#align=left&display=inline&height=586&name=image.png&originHeight=586&originWidth=1230&search=&size=166941&status=done&width=1230)

1. 别忘了默认的原型

上面的例子还少了一环，所有的引用类型都继承了 Object ,这个继承也是通过原型链实现的。


![image.png](https://cdn.nlark.com/yuque/0/2019/png/113971/1569829392997-4817c101-56db-44ad-906f-dbc031c8762f.png#align=left&display=inline&height=880&name=image.png&originHeight=880&originWidth=1232&search=&size=301778&status=done&width=1232)

SubType 继承了 SuperType，而 SuperType 继承了 Object。
2. 确定原型和实例的关系
第一种方法可以使用 `instanceof` 操作符。或者使用 `isPrototypeOf` 方法。

```javascript
function SuperType() {
  this.property = true;
}
SuperType.prototype.getSuperValue = function() {
  return this.property;
};

function SubType() {
  this.subProperty = false;
}

SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function() {
  return this.subProperty;
};

let instance = new SubType();

console.log(SubType.prototype.isPrototypeOf(instance)); // true
console.log(SuperType.prototype.isPrototypeOf(instance));/ true
console.log(Object.prototype.isPrototypeOf(instance)); // true
```

3. 谨慎定义方法

给原型添加方法需要在替换原型之后。否则调用的还是原来的方法。
3. 原型链的问题

所有引用类型的原型属性会被所有的实例共享。

### 6.3.2 借用构造函数

可以在子类的构造函数里面调用父类构造函数。

![image.png](https://cdn.nlark.com/yuque/0/2019/png/113971/1569832716413-d8bf398c-0b64-4a5a-b243-1b46ad707bdc.png#align=left&display=inline&height=518&name=image.png&originHeight=518&originWidth=934&search=&size=107483&status=done&width=934)

1. 传递参数

构造函数的好处是可以传递参数。
1. 问题

只能构造函数中定义，且超类原型中的方法对子类也不可见。

### 6.3.3 组合继承

借用构造函数和原型链，用构造函数继承原型的属性，用原型链继承原型上的方法。
![image.png](https://cdn.nlark.com/yuque/0/2019/png/113971/1569832737492-8fc984dd-f0f4-44cf-9ac5-865dd4e9dbc6.png#align=left&display=inline&height=1576&name=image.png&originHeight=1576&originWidth=1036&search=&size=247053&status=done&width=1036)

### 6.3.4 原型式继承

借用原型基于已有的对象创建新的对象

```javascript
function object(o){
  function F(){};
  F.prototype = 0;
  return new F();
}
```

在 es5 中可以使用 `Object.create` 来实现。

![image.png](https://cdn.nlark.com/yuque/0/2019/png/113971/1569832833989-2678602d-7329-4fda-b015-45a733eb8ca1.png#align=left&display=inline&height=888&name=image.png&originHeight=888&originWidth=878&search=&size=75439&status=done&width=878)

### 6.3.5 寄生式继承
```javascript
function createAnother(original) {
  var clone = object(original);
  clone.sayHi = function() {
    alert('hi');
  };
  return clone;
}
```

创建一个封装继承过程的函数，在函数内部增强对象。缺点是函数无法复用。

### 6.3.6 寄生组合式继承

使用构造函数来继承属性，其背后的基本思路是:不必为了指定子类型的原型而调用超类型的构造函数,我们所需要的无非就是超类型原型的一个副本而已。本质上,就是使用寄生式继承来继承超类型的原型,然后再将结果指定给子类型的原型。
![image.png](https://cdn.nlark.com/yuque/0/2019/png/113971/1569832969949-758de422-4f86-40b3-bcbf-0b3d95f3ae22.png#align=left&display=inline&height=182&name=image.png&originHeight=182&originWidth=1220&search=&size=64380&status=done&width=1220)

![image.png](https://cdn.nlark.com/yuque/0/2019/png/113971/1569832976029-813ae461-4a48-4d62-a3c5-332de7941139.png#align=left&display=inline&height=646&name=image.png&originHeight=646&originWidth=758&search=&size=112165&status=done&width=758)

## 6.4 小结

![image.png](https://cdn.nlark.com/yuque/0/2019/png/113971/1569832952763-e698fe0c-a75c-40d2-8dcb-67a291b492a4.png#align=left&display=inline&height=1152&name=image.png&originHeight=1152&originWidth=1570&search=&size=821933&status=done&width=1570)
