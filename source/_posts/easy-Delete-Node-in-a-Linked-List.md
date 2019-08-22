---
title: '[easy] Delete Node in a Linked List'
categories:
  - LeetCode/LintCode 刷题
date: 2016-07-12 21:19:51
tags:
---

## 难度:  简单 标题：Delete Node in a Linked List 删除链表的节点

> Write a function to delete a node (except the tail) in a singly linked list, given only access to that node.
>
> Supposed the linked list is 1 -> 2 -> 3 -> 4 and you are given the third node with value 3, the linked list should become 1 -> 2 -> 4 after calling your function.

### 思路

A->B->C->D

原本要删除B，知道A，只需要A.next= B.next;

现在只提供B，无法提供 A 时只能把 C 复制到 B，然后删除 C 即可。



### 代码

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public void deleteNode(ListNode node) {
        node.val = node.next.val;
        node.next = node.next.next;
    }
}
```
### 链接

https://leetcode.com/problems/delete-node-in-a-linked-list/