---
title: '[easy] First Bad Version'
categories:
  - LeetCode/LintCode 刷题
date: 2016-07-11 23:13:25
tags:
---

## 难度: 简单  标题：第一个坏版本

> You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.
>
> Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.
>
> You are given an API bool isBadVersion(version) which will return whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.
>
> 找出最先坏的版本。

### 思路

二分法查询。主要要注意的是mid = head + (tail - head)/2。假如使用head + tail 会越界。

### 代码

```java
/* The isBadVersion API is defined in the parent class VersionControl.
      boolean isBadVersion(int version); */

public class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        int head = 1;int tail = n;
        while(!isBadVersion(head) && head <= tail){
            int mid = head + (tail - head)/2;
            if(isBadVersion(mid)){
                tail = mid -1;
                
            }else{
                head = mid + 1;
            }
        }
        return head;
    }
}
```
### 链接

https://leetcode.com/problems/first-bad-version/