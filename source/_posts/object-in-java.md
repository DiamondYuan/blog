---
title: Java Object 方法简析
date: 2018-03-23 16:08:30
tags:
- java
categories:
- Java 基础
---

# Java Object 方法简析

Object 类位于`java.lang` ，我们可以看到源码中写到 `Every class has {@code Object} as a superclass. All objects` 即 Object 类是所有类的父类。

```java
 	public final native Class<?> getClass();

    public native int hashCode();
    public boolean equals(Object obj);

    protected native Object clone() throws CloneNotSupportedException;

    public String toString();

    public final native void notify();
    public final native void notifyAll();
    public final native void wait(long timeout) throws InterruptedException;
    public final void wait(long timeout, int nanos) throws InterruptedException;
    public final void wait() throws InterruptedException;

    protected void finalize() throws Throwable { }
```



## getClass方法 



```java
     * @return The {@code Class} object that represents the runtime
     *         class of this object.
    public final native Class<?> getClass();
```

从源码中可以看到 getClass 是 final 方法，无法被继承。同时是 native 方法。即其他语言例如 C 与 C++ 实现的方法。结果为对象的运行时 Class 对象。

举个例子

```java
package im.yfd.demo;
class A {
}

class B extends A {
}

class Test{
  public static void main(String[] args) {
    A a = new A();
    A b = new B();
    System.out.println(a.getClass());
    System.out.println(b.getClass());
    a = b;
    System.out.println(a.getClass());
  }
}
```

返回结果

```java
class im.yfd.demo.A
class im.yfd.demo.B
class im.yfd.demo.B
```

## hashCode 方法与 equals 方法

### equals

equals主要用于判断两个对象是否相等。约定 equals 有下列几个性质。

当object  object1 object2 均为非空时。

+ *自反性*：object.equals(object) 永远为 true
+ *对称性*：object1.equals(object) == object.equals(object1) 永远为 true
+ *传递性*：object.equals(object1) 为 true且object1.equals(object2) 为 true 时,object.equals(object2) 为 true。
+ *一致性*：当 object 与 object1 均未修改时候。object.equals(object1) 结果永远保持不变。
+ 对于非空对象 object。那个 object.equals(null) 永远返回 false。



Object类中的默认实现为比较两个地址是否相同。等价于 `==`

```java
public boolean equals(Object obj) {
        return (this == obj);
}
```

### hashCode

hashCode也是一个native方法。该方法返回对象的哈希码，通常用在哈希表中。例如常用的 HashMap。

对于hashCode，我们 **应该** 遵循如下规则：

+ 在一个应用程序执行期间，任何时间对同一个对象调用 hashCode 方法。都必须返回用一个整数。这个整数在两次对同一个应用程序的执行在**不需要**保持一致。
+ 如果两个对象通过 equals 比较相等，那么 hashCode 方法必须产生同样的结果。


- 如果两个对象通过 equals 比较不相等，那么 hashCode 方法产生的结果 **不需要** 向灯。但是如果不同对象产生不同的结果。那么有助于提高哈希表的效率

当重写 equals 时候 必须也要重写 hashcode 。否则在 HashMap 中就会出错。

```java
public class Person {
  Person(String name) {
    this.name = name;
  }
  private String name;
  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return false;
    }
    if (object == null || object.getClass() != this.getClass()) {
      return false;
    }
    Person p = (Person) object;
    if (p.name == null) {
      return this.name == null;
    }
    return p.name.equals(this.name);
  }
}


class Test {
  public static void main(String[] args) throws CloneNotSupportedException {
    Person a = new Person("name");
    Person b = new Person("name");
    Map<Person, String> map = new HashMap<>();
    map.put(a, "a");
    System.out.println(a.equals(b));
    System.out.println(map.get(a));
    System.out.println(map.get(b));
  }
}
```

例如上面的代码的返回结果就是

```
true
a
null
```

因为 HashMap 会先根据 hashcode 来决定对象在哪个桶中。再在同一个桶中根据 equals 判断 key 是否相同。



## clone方法

clone 会返回对象的拷贝。如果直接调用

```
class Test {
  public static void main(String[] args) throws CloneNotSupportedException {
    Test test = new Test();
    Test testClone = (Test) test.clone();
  }
}
```

会报错 `Exception in thread "main" java.lang.CloneNotSupportedException`。









## finalize方法

finalize 方法会在对象被回收时候调用。

```java
class Test {

  String name;

  @Override
  public void finalize() {
    System.out.println("GC: " + name);
  }

  public static void main(String[] args) throws CloneNotSupportedException {
    Test test = new Test();
    test.name = "1";
    System.out.println("test 1");
    System.gc();
    test = new Test();
    System.gc();
    System.out.println("test 2");
  }
}
```

例如上面的代码返回结果

```
test 1
test 2
GC: 1
```









