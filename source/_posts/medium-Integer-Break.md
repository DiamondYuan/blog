---
title: '[medium]Integer Break'
categories:
  - LeetCode/LintCode 刷题
date: 2016-07-12 20:26:52
tags:
---

## 难度:  中等 标题：整数拆分

> Given a positive integer n, break it into the sum of at least two positive integers and maximize the product of those integers. Return the maximum product you can get.
>
> For example, given n = 2, return 1 (2 = 1 + 1); given n = 10, return 36 (10 = 3 + 3 + 4).
>
> Note: You may assume that n is not less than 2 and not larger than 58.
>
> Hint:
>
> There is a simple O(n) solution to this problem.
> You may check the breaking results of n ranging from 7 to 10 to discover the regularities.
>
> 把一个整数拆分成几个数字，使得他们的积最大。

### 思路

可以把1-10的拆分结果都列出来，发现当 n > 6 以后，(n - 3) = 3 * n。所以可以吧n  = 2 - 6的结果先列出来，然后把6以上的数拆掉若干个3，直到能在表中查到。

开始用的是switch，发现语句太繁琐了，就使用一维数组。

### 代码

```java
//递归
public class Solution {
    public int integerBreak(int n) {
        int a[] = {1,2,4,6,9};
        if(n < 7){
            return a[n-2];
        }
        else return 3 * integerBreak(n-3);
    }
}

//非递归
public class Solution {
    public int integerBreak(int n) {
        int a[] = {1,2,4,6,9};
        if(n < 7){
            return a[n-2];
        }
        int val = 1;
        while(n >= 7){
            val = 3 * val;
            n = n-3;
        }
        return a[n-2] * val;
    }
}
```
### 链接

https://leetcode.com/problems/integer-break/