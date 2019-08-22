---
title: '[easy]链表倒数第n个节点'
date: 2016-07-05 01:04:24
tags: 
- 链表
categories:
- LeetCode/LintCode 刷题
---

## 难度： 简单 标题:链表倒数第n个节点

找到单链表倒数第n个节点，保证链表中节点的最少数量为n。

### 思路

可以选择两个指针，指向第一个(first)和第N个(end)。然后每次first前进一格，则end也前进一格，知道end == null时，first指向的就是倒数第n个。

### 代码

```java
public class Solution {
    ListNode nthToLast(ListNode head, int n) {
       ListNode first = head;
       ListNode end = head;
       for (int i=0;i<n;i++){
           end = end.next;
       }
       while(end != null){
           end =  end.next;
           first = first.next;
       }
       return first;
    }
}
```

### 链接

http://www.lintcode.com/zh-cn/problem/nth-to-last-node-in-list/