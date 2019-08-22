---
title: '[easy]Sum of Two Integers'
date: 2016-07-09 12:57:50
tags:
- 位运算
categories:
- LeetCode/LintCode 刷题
---

## 难度： 中等 标题：两数求和

> leetcode Sum of Two Integers
>
> Calculate the sum of two integers a and b, but you are not allowed to use the operator + and -.
>
> Example:
> Given a = 1 and b = 2, return 3.
>
> 求两数只和，不能用加法和减法。

### 思路

a ^ b 表示求和且不进位。a & b 表示按位求与,(a & b) * 2 即为进位。

所以 a + b = ((a & b)<<1) + a ^ b;直到进位为0时。结果就是我们所需要的结果。

### 代码

```java
public class Solution {
    public int getSum(int a, int b) {
        while(b!=0){
            int c = a & b;
            a = a ^ b;
            b = c << 1;
        }
        return a;
    }
}
```

### 链接

https://leetcode.com/problems/sum-of-two-integers/