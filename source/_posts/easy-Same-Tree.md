---
title: '[easy] Same Tree'
categories:
  - LeetCode/LintCode 刷题
date: 2016-07-11 01:41:13
tags:
 - 二叉树
---

## 难度: 简单  标题：相同二叉树

> Given two binary trees, write a function to check if they are equal or not.
>
> Two binary trees are considered equal if they are structurally identical and the nodes have the same value.
>
> 判断两颗二叉树是否相同。

### 思路

递归，当左子树相同，右子树相同，值相同时两棵树相同。

取子树之前判断一下是否为 null。否则null.left,null.right,null.val会报错。

### 代码

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if(p == null || q == null){
            if(p== null && q == null){
                return true;
            }else return false;
        }
        return p.val == q.val &&isSameTree(p.left,q.left)&&isSameTree(q.right,p.right);
    }
}
```
### 链接

https://leetcode.com/problems/same-tree/