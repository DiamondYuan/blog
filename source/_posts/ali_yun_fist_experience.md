---
title: 阿里云折腾记
date: 2017-09-25 11:33:24
tags: 
- docker
categories:
- 技术与折腾
---

### 起源

博客挂在Github上不要钱，但是总感觉访问有些慢。而且有时候会想跑一些脚本和服务，就一直考虑过买一台服务器。在大学里对Linux用的不多，唯一一次就是在阿里云上买了一个学生主机，玩了几天以后感觉没什么用不会玩，就没有再续费了。前几天逛阿里云的时候，居然看到了一个叫云上浙江的活动。西湖区的公司，没用过阿里云的话可以免费领2000无任何限制的代金券。简直是天上掉了馅饼。因为我刚好有一个杭州的公司，所以就新注册了一个账户。中间虽然有一些小波折，但是最终还是成功领到了钱。千挑万选之下选了ECS香港 2核4G 1M 带宽 100G 硬盘。虽然带宽1M有点小，不过只需要1980就能买这个配置的服务器三年。还是非常划算的。更何况也不需要我自己出钱。

### SSH相关设定 

为了不用输入密码和安全考虑，肯定是要用SHH key登录，阿里云控制面板的云服务器 ECS-绑定密钥对-创建密钥,输入名字例如test就可以直接生成密钥对,生成完成以后会自动下载一个test.pem的私钥,然后选择之前已经买好的ECS。绑定之后不需要重启就可以利用这个私钥登录了。用阿里云的服务生成和绑定只要是和自己写的项目[FastAirport](https://github.com/GeorgeYuen/FastAriport) 有关。

### 安装docker

假如我们服务的IP是aaa.bbb.ccc.ddd SSH的接口是1234

````shell
ssh root@aaa.bbb.ccc.ddd -i test.pem -p 1234
````



### 部署hexo

原先的博客是放在Github pages上的。分成了[blog](https://github.com/GeorgeYuen/blog)和[GeorgeYuen.github.io](https://github.com/GeorgeYuen/GeorgeYuen.github.io),虽然这样不要钱，也比较方便,不过既然搬家到了自己的服务器上，那肯定是要折腾一下的。后来用 Daocloud 做了持续部署。

其他放在另外的文章里面说吧，一下子也说不完。









