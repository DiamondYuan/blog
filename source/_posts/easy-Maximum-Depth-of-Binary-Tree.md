---
title: '[easy] Maximum Depth of Binary Tree'
date: 2016-07-09 13:43:33
tags: 
- 二叉树
categories:
- LeetCode/LintCode 刷题
---

## 难度:  简单 标题：二叉树最大深度

> Given a binary tree, find its maximum depth.
>
> The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

### 思路

root == null时深度为0;最大深度为左/右的最大深度+1;

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
    public int maxDepth(TreeNode root) {
        if(root == null) return 0;
        if(root.left == null && root.right == null) return 1;
        int DL = maxDepth(root.left);
        int DR = maxDepth(root.right);
        return (DL>DR?DL:DR)+1;
        
    }
}
```

### 链接

https://leetcode.com/problems/maximum-depth-of-binary-tree/