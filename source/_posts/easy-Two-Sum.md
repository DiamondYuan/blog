---
title: '[easy]Two Sum'
categories:
  - LeetCode/LintCode 刷题
date: 2016-07-12 23:14:25
tags:
---

## 难度: 简单  标题：Two Sum 求和

> Given an array of integers, return indices of the two numbers such that they add up to a specific target.
>
> You may assume that each input would have exactly one solution.
>
> Example:
> Given nums = [2, 7, 11, 15], target = 9,
>
> Because nums[0] + nums[1] = 2 + 7 = 9,
> return [0, 1].

### 思路

方法1 :两层循环，先选定一个数，然后遍历它之后的数，假如符合条件则返回坐标。

方法2:把traget - nums[i]放入hashmap。然后查询 nums[i] 在不在hashmap里，假如在的话就说明他和之前的某个数字加起来等于traget;

### 代码

```java
//代码 1
public class Solution {
    public int[] twoSum(int[] nums, int target) {
        int a[] = new int[2];
        for(int i = 0;i < nums.length -1;i++){
            a[0] = i;
            for(int j = i + 1;j < nums.length;j++){
                a[1] = j;
                if((nums[a[0]] + nums[a[1]]) == target){
                    return a;
                }
            }
        }
        return a;
    }
}

//代码2
public class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer,Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (map.get(nums[i]) != null) {
                int[] result = {map.get(nums[i]), i};
                return result;
            }
            map.put(target - nums[i], i);
        }
        int[] result = {};
        return result;
    }
}
```
### 链接

https://leetcode.com/problems/two-sum/