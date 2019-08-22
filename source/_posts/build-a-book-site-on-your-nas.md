---
title: 如何在自己电脑上搭建一个电子书网站
date: 2017-09-04 20:56:28
tags: 
- 群晖
- docker
- calibre
categories:
- 技术与折腾
---

## 搭建了一个个人的电子书网站

作为一个松鼠党，从高中逛[E-INK](https://www.hi-pda.com/forum/forumdisplay.php?fid=59)开始就收集各类电子书，这么多年下来也积攒了一大笔积蓄。下书入流水，看书如抽丝。那么这些书的管理就成了一个问题。最后选了半天还是决定用calibre来管理自己的电子书。

calibre虽然速度有些慢，不过应该是目前为止能找到的最好的电子书管理工具了。和kindle的结合也很好。考虑数据的备份，除了在自己的Mac上存放了书库以外，还利用Resilio Sync把书库存到了群晖上。这样就算是电脑被偷数据也不会丢了。不过calibre的数据库有一个缺点，他在电脑上储存文件的目录结构是/calibre/author/books

而且会把全部的汉字转换成拼音。直接用Mac上的calibre看的话挺方便的，但是远程用手机访问群晖的话看到的都是类似于拼音文件。找书很不方便。所以就想找一下有没有calibre的web版本。

搜了一下果然有人已经早好轮子了[**calibre-web**](https://github.com/janeczku/calibre-web/) 一个用Python写的一个Web app。

官方介绍是这样的：Calibre Web is a web app providing a clean interface for browsing, reading and downloading eBooks using an existing [Calibre](https://calibre-ebook.com/) database.

直接利用calibre的数据库，然后支持下载，上传，在线阅读，数据修改，发送到kindle。而且手机端和web端都支持，真是完美符合我的需求。不过要吐槽一点，这个源码居然不打tag，程序更新完全是靠git拉取来更新。真的是大开眼界。

![](https://ws2.sinaimg.cn/large/006tNc79gy1fj7uyffd3pj30go0aa759.jpg)



既然调研好了，那么就开始搭建吧。



### 网站搭建

#### 背景说明

+ 群晖216+Ⅱ
+ Calibre
+ Resilio
+ docker

其实上面啥都不需要，只需要一台能运行docker的设备就可以了。内存大约100m  不知道树莓派能不能撑得住。 Python的效率真低呀。

 

首先先是电脑上安装calibre，然后同步自己的书库到群晖。这一步网上教程太多，就不详细介绍了。

同步完之后，我们的群晖上就有了数据库。例如我的目录是 /Backup/书库 里面有一个数据库文件 metadata.db

数据库有了，就开始安装程序。程序安装很简单，只需要一个python环境就可以了。

```shell
# 1.下载源码
git clone https://github.com/janeczku/calibre-web/
# 2.利用pip安装依赖
pip install --target vendor -r requirements.txt
# 3.运行程序
python cps.py
```

执行命令以后你就把网站搭好了，访问http://localhost:8083就可以看到自己搭建的网站了。

不过妈妈说了，能用docker解决的问题都用docker解决。

Dockerfile如下。

```dockerfile

FROM python:2.7.13
MAINTAINER FandiYuan  <georgeyuan@diamondyuan.com>

RUN git clone https://github.com/janeczku/calibre-web/  && \
    cd calibre-web  && \
    pip install --target vendor -r requirements.txt

EXPOSE 8083

CMD ["python","/calibre-web/cps.py"]
```

项目的主页有一个[镜像](https://hub.docker.com/r/technosoft2000/calibre-web/)了，但是我个人有点没看懂，而且镜像里面是不带项目本身的，在第一次启动镜像的时候会从git上面拉取最新的源码，然后重启。其实挺符合这个开源项目的风格的，利用git进行版本更新。写得其实比我好。有需要的小伙伴可以自己研究安装。

### 安装说明

说了半天废话，那么图文教大家如何安装吧。

+ 首先安装群晖的docker 点开注册表 双击选择阿里云。

  ![](https://ws3.sinaimg.cn/large/006tNc79gy1fj7vrgl65kj30dz0e30sn.jpg)

  搜索calibre,找到我写好的的镜像后双击下载。因为在国内，所以挺快的。感谢阿里爸爸。

  ![](https://ws2.sinaimg.cn/large/006tNc79gy1fj7vuecs3ej30np047q2v.jpg)

  ​

安装完双击启动容器

![](https://ws4.sinaimg.cn/large/006tNc79gy1fj7vvdlaz3j30jg0dnmxg.jpg)
配置一下本地目录和装载目录。本地目录就是你电子说所在的位置。

如果你需要电子书编辑的功能，那么不要勾选只读。英文我只想浏览和下载，所以选择了只读。



![](https://ws2.sinaimg.cn/large/006tNc79gy1fj7vx0eaz1j30ia0flq35.jpg)

![](https://ws1.sinaimg.cn/large/006tNc79gy1fj7vyn5t7gj30i60f7mx9.jpg)

设置完成以后点击确认 应用。你的个人服务器就布置好了。
举个例子
例如我群晖的路由访问页面是192.168.3.101:6001，那么192.168.3.101:8083就可以看到自己部署的网站了。





