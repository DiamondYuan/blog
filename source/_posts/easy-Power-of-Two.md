---
title: '[easy]Power of Two'
categories:
  - LeetCode/LintCode 刷题
date: 2016-07-10 23:13:24
tags:
  - 位运算
---

## 难度:  简单 标题：2的冥

> Given an integer, write a function to determine if it is a power of two.
>
> 判断一个是否是2的幂。

### 思路

一个数转换成二进制后，假如此数为2的冥，则它的形式一定是100...000。

所以只要不断右移，计算1出现的次数。n & 1 ,假如 n 末尾为1，则结果为1.末尾为 0，结果为 0；

### 代码

```java
public class Solution {
    public boolean isPowerOfTwo(int n) {
        int ctz = 0;
        while(n > 0){
            ctz += (n & 1);
            n = n >> 1;
        }
        return ctz == 1;
    }
}
```

### 链接

https://leetcode.com/problems/power-of-two/