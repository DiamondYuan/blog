---
title: '[easy]Move Zeroes'
date: 2016-07-09 14:49:02
tags: 
- 双指针
categories:
- LeetCode/LintCode 刷题

---

## 难度：简单 标题：移动零

> Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.
>
> For example, given nums = [0, 1, 0, 3, 12], after calling your function, nums should be [1, 3, 12, 0, 0].
>
> Note:
> You must do this in-place without making a copy of the array.
> Minimize the total number of operations.
>
> 把数组的零移动到末尾，不改变原有非零数字顺序。

## 思路

双指针，flag指向下一个非零数字存放的位置。i遍历整个数组，当遇到非零数字则复制到num[flag]的位置且flag++。遇到0则跳过。最后把num[flag]以后的所有数字都赋值为0;

## 代码

```java
public class Solution {
    public void moveZeroes(int[] nums) {
        int flag = 0;
        for(int i = 0;i<nums.length;i++){
            if(nums[i] != 0){
                nums[flag] = nums[i];
                flag++;
            }
        }
        for (int i = flag;i<nums.length;i++){
            nums[i] = 0;
        }
        return;
    }
}
```

### 链接

https://leetcode.com/problems/move-zeroes/