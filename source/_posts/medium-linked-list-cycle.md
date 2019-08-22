---
title: '[medium] linked list cycle'
categories:
  - LeetCode/LintCode 刷题
date: 2017-03-06 00:07:12
tags:
- 链表
---

## 难度:  中等 标题：带环链表

给定一个链表，判断它是否有环。

### 思路

一开始想到的思路是放到hashmap里，每次前进一格就查询在hashmap中是否存在。存在则返回true，遇到null就返回false。但是这样需要额外空间。

后来的思路是两个指针first和second。second每次前进两格，first前进一格。若有环，second必定追上first。

思路想到后调试了很久，总是超出内存范围。



### 代码

```java
/**
 * Definition for ListNode.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int val) {
 *         this.val = val;
 *         this.next = null;
 *     }
 * }
 */
public class Solution {
    /**
     * @param head: The first node of linked list.
     * @return: True if it has a cycle, or false
     */
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null){
            return false;
        }
        ListNode first = head;
        ListNode second = head;
        while (first != null && second != null && second.next != null){
            second = second.next.next;
            first = first.next;
            if (first == second){
                return true;
            }
        }
        return false;
    }
}

```
### 链接

https://www.lintcode.com/zh-cn/problem/linked-list-cycle/