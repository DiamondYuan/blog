---
title: Golang学习之macaron与glide初体验
date: 2017-09-16 00:15:45
tags:
---



## 前情提要

周末在家无聊逛小草论坛，由于手机屏幕太小（SE），看达盖尔感觉有些不爽。就像去Github上找找看有没有前人写好的爬虫，光的过程中发现了一个爬种子的[Python 爬虫](https://github.com/chuxiuhong/spider1024)，试了一下，虽然有一些小bug，但是效率非常高，几分钟就能爬上千个。然后电脑上就多了一堆种子。种子有了，但是都是杂乱无章的文件名，不知道具体内容是什么。而且想到了之前写的golang服务器[**opendmm-service**](https://github.com/GeorgeYuen/opendmm-service)。脑洞大开，就准备写一个分析种子，然后根据种子里文件列表来为种子匹配小电影，并且把资料存入数据库的程序。



##  **opendmm-service**











利用glide把依赖都安装好以后，就开始构建程序了。执行go build以后发现出现了如下错误，而且报了好几页，全部在Vender中的源码编译都报错了。而且谷歌搜不到结果。

```shell
flag provided but not defined: -goversion
usage: compile [options] file.go...
```

![goole result](https://ws4.sinaimg.cn/large/006tKfTcgy1fjn05f603ej30lt0d074x.jpg)