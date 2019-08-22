---
title: '通过Gmail发送Alertmanager邮件'
date: 2017-06-05 11:41:41
tags:
- prometheus,
- Alertmanager
---

### 1 启用 IMAP

登录邮箱，点击[转发和 POP/IMAP](https://mail.google.com/mail/u/0/#settings/fwdandpop) 。

### 2 开启两步验证

### 3 生成应用密码 

可以看一下  [Google官方链接](https://support.google.com/accounts/answer/185833?hl=en) 。未开启两步验证不能生成应用密码。

### 4 更改Alertmanager的配置文件

````yaml
global:
  smtp_smarthost: 'smtp.gmail.com:587'
  smtp_from: 'GMAIL_ACCOUNT'
  smtp_auth_username: 'GMAIL_ACCOUNT'
  smtp_auth_password: 'GMAIL_AUTH_TOKEN'
````