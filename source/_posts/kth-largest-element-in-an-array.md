---
title: Leetcode 215 数组中的第K个最大元素
date: 2018-03-28 00:04:13
tags:
- 堆
categories:
- LeetCode/LintCode 刷题
---

## Leetcode 215 数组中的第K个最大元素

在未排序的数组中找到第 **k** 个最大的元素。请注意，它是数组有序排列后的第 k 个最大元素，而不是第 k 个不同元素。

例如，
给出 `[3,2,1,5,6,4]` 和 k = 2，返回 5。

**注意事项:**

你可以假设 k 总是有效的，1 ≤ k ≤ 数组的长度。

## 思路 1 堆

可以先取k个元素，放到一个数组中，然后把数组转换成最小堆。之后遍历剩下的全部元素，和最小堆的根进行比较。如果比根要大，则替换根，之后把数组重新转换成最小堆。遍历完成后，最小堆堆根即为第 k 大的元素。

```java
class Solution {

   public static int findKthLargest(int[] nums, int k) {
    int[] heap = new int[k];
    //首先取k个元素
    System.arraycopy(nums, 0, heap, 0, k);
    //从倒数k个节点开始 调整数组成为最小堆
    for (int i = k / 2 - 1; i >= 0; i--) {
      adjest(heap, i);
    }
    //如果元素小于最小堆 跳过。
    //如果元素大于最小堆 把元素放在堆顶 然后调整堆
    for (int i = k; i < nums.length; i++) {
      if (heap[0] < nums[i]) {
        heap[0] = nums[i];
        adjest(heap, 0);
      }
    }
    //返回堆顶堆元素
    return heap[0];
  }


  /**
   * 调整最小堆
   * @param heap 堆
   * @param i 从哪个 index 开始
   */
  private static void adjest(int[] heap, int i) {
    int temp = heap[i];
    int length = heap.length;
    for (int k = i * 2 + 1; k < length; k = 2 * k + 1) {
      if (k + 1 < length && heap[k + 1] < heap[k]) {
        k++;
      }
      if (temp <= heap[k]) {
        break;
      } else {
        heap[i] = heap[k];
        i = k;
      }
    }
    heap[i] = temp;
  }
}
```

## 题目链接

[Leetcode-cn](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/description/)
[Leetcode](https://leetcode.com/problems/kth-largest-element-in-an-array/description/)