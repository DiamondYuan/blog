---
title: git的各种常用操作
date: 2017-06-23 15:41:03
tags:
---

#### 远程分支删除后，本地依旧可以看到的解决方法

使用命令 `git branch -a`，可以看到很多本地和远程都删除了的分支。

使用命令 `git remote show origin`，可以查看remote地址，远程分支，还有本地分支与之相对应关系等信息。

使用命令 `git remote prune origin`，可以删除远程仓库已经不存在的分支。



#### Fix 线上bug的git流程

假如我们现在在develop分支开发，平时都是合并到dev。然后发布的时候合并到master发布。那么我们现在就有三个分支 dev develop master。这个时候线上出现了bug，需要紧急修复。

````
git satash --先保存自己现在在写的代码
git checkout master
git checkout -b fix
--然后修改代码之后合并到master发布。
git commit
git push

--发布后先切到master拉取最新代码
git checkout master
git pull

--然后切回之前开发的develop分支，把修改的代码合并到develop
git checkout develop
git stash pop
git merge master
git checkout -d fix

--develop开发完成后合并到dev就可以完成一次开发流程
````

