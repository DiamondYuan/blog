---
title: '利用Daocloud完成Hexo的持续部署 '
date: 2017-08-10 23:19:26
tags: 
- docker
- 持续集成
- blog
categories:
- 技术与折腾
---

本文不仅限于hexo，可以适用于任何项目。

因为买了阿里云的服务器，而且受不了[Github](http://diamondyuan.com/)的速度，就准备把自己的博客迁移到国内的[网站](http://blog.diamondyuan.com)。而且把网站放在docker里以后，无论在哪台服务器，只要安装了docker，都可以很快捷得部署自己的博客。之前先说一下

思路，一开始我是把blog的源码（不含node_modules）直接copy到hexo的镜像中，然后下载npm的模块，再执行generate。执行完以后把public目录下的文件全部复制到一个nginx的镜像下面。需要部署的时候，只需要拉取那个nginx镜像就可以了。

但是这样有一个缺点，每次更新博客，都要重新下载一遍node_modules。如果不换国内源的话，发布一次要等很久。于是就换了一个思路。因为博客的依赖基本上是不变的，package-lock.json与package.json基本上不更新，所以可以先把这两个文件复制到hexo里面，预先下载好，生成一个新的base镜像。每次发布的时候，都从这个镜像开始动手。只需要hexo g。然后就可以把public文件提取了。build速度从原来的7分钟提升到了40秒。等依赖或者插件更新的时候，可以手动更新一下base镜像。

思路有了，那就开始动手布置吧。详细文件可以看我的[Github](https://github.com/GeorgeYuen/blog/tree/master/Dockerfile) 希望大家喜欢的话可以star。

首先是base镜像，除非添加新的插件或者hexo更新，不然基本上不会替换。

````dockerfile
FROM emitting/hexo
MAINTAINER FandiYuan  <georgeyuan@diamondyuan.com>
ADD package-lock.json /temp/
ADD package.json /temp/
RUN cd /temp && \
    npm install
CMD ["bash"]
````

构建镜像，主要基于base镜像是把博客源码复制进去，然后生成public文件。

````dockerfile
FROM daocloud.io/diamondyuan/blog-base:latest
MAINTAINER FandiYuan  <georgeyuan@diamondyuan.com>
ADD / /blog
RUN mv /temp/node_modules /blog/node_modules && \
    hexo g
CMD ["bash"]
````

发布镜像 把博客的html文件复制到nginx镜像中。

如果是部署在github，那么可以把这个文件替换成一个有git的镜像，把代码提交到git中。

````dockerfile
FROM nginx:stable-alpine
MAINTAINER FandiYuan  <georgeyuan@diamondyuan.com>
copy /blog/public/ /usr/share/nginx/html/
````



本来这样就可以了，原本是准备自己造一套轮子的，但是后来实在是嫌麻烦，就直接用了daocloud的服务，反正也不要钱，还可以为自己服务器节约一些硬盘。如果用docker官方的hub，我不是很清楚提取文件和打包应该如何，可能需要自己在本机写一下脚本吧。其他的博客生成器使用思路都差不多，只需要改一下dockerfile的命令就好了。

窝在daocloud上建了两个项目。blog和blog-base。都关联了github。还有两个ymal文件，直接贴出来。



第一个是blog-base的流程，只有装新的插件而且打tag以后，才会触发这项目，更新base。

````yaml
version: 3
stages:
- 构建阶段
默认构建任务:
  label: release-image
  stage: 构建阶段
  job_type: image_build
  only:
    tags:
    - .*
  build_dir: /
  cache: true
  dockerfile_path: /Dockerfile/Dockerfile.base.build

````

第二个上blog项目，用了两个dockerfile。每次更新代码会先临时生成一个镜像，提取出public文件后复制到nginx的镜像中。这些操作都在daocloud的服务器上完成，不需要占用自己电脑的空间。我一个空的hexo博客+nginx大约是15mb。而一个node+hexo的镜像在700mb左右。

````yaml
version: 3
stages:
- build
lite-build:
  stage: build
  job_type: lite_image_build
  only:
    branches:
    - ^master$
  compile:
    build_dir: /
    dockerfile_path: /Dockerfile/Dockerfile.build
  extract:
  - /blog
  package:
    build_dir: /
    dockerfile_path: /Dockerfile/Dockerfile.deploy
````



最后只需要拉取最终生成的镜像，就可以在任何电脑上布置自己的博客了。更新博客的话只需要往hexo/source/_posts 里添加一篇文件并且push到github，就会自动触发daocloud,构建一个新的博客镜像。基于这个镜像，窝在daocloud上发布了一个应用，并且设置为自动更新。每次有新的镜像出来就会自动拉取镜像到我的阿里云上，并且发布。

这个思路可以用在任何的项目上，比如我司的JAVA项目，就是把源码拷贝到一个gradle的镜像里，构建好以后提取jar出来，再放到一个只有jre的镜像中。可以缩小最终生成的docker镜像的大小。
