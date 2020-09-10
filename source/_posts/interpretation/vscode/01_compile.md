---
title: '1. 编译与运行 VS Code'
date: 2019-08-14 14:49:02
tags:
- VS Code
categories:
- 源码解析
thumbnail: https://diamondyuan.oplinjie.cn/2019-09-10-vscode-screenshot.png
---


> 内容基于 1.37版本，可能与最新的源码不同
> 本人使用系统为 macOS ，其他系统可以查看 [官方指南](https://github.com/microsoft/vscode/wiki/How-to-Contribute) 

## 环境 [](https://github.com/microsoft/vscode/wiki/How-to-Contribute)

- [Git](https://git-scm.com/)
- [Node.JS](https://nodejs.org/en/), **x64**, 版本 `>= 10.16.0`, `< 11.0.0`
- [Yarn](https://yarnpkg.com/en/)
- [Python](https://www.python.org/downloads/release/python-2715/) 版本号大于 2.7（Python 3 不支持）
- C/C++ 的编译工具
  - **Mac**

Xcode 以及命令行工具(Command Line Tool)，安装后会自动安装 `gcc` 和 `make`

    - 运行 `xcode-select --install` 安装命令行工具(Command Line Tool)

安装完毕后，运行 yarn 命令来安装全部的依赖。

```javascript
cd vscode
yarn
```
<!-- more -->

## 构建和运行
### 获取源码
首选可以 fork VS Code 的仓库，然后 clode 到本地。

```bash
git clone https://github.com/<<<your-github-account>>>/vscode.git
```

如果需要同步上游的源码到自己的仓库，可以执行以下代码。

```bash
cd vscode
git checkout master
git pull https://github.com/microsoft/vscode.git master
```

解决完冲突后，再提交到自己的代码仓库。

### 构建
进入 `vscode` 然后运行构建命令。

```
cd vscode
yarn watch
```

👉 **Tip!**  每次代码修改后不需要重启，只需在命令控制台执行 `Reload Window` 命令就可以了。我们喜欢给这条命令绑定 CMD+R 快捷键。

### [](https://github.com/microsoft/vscode/wiki/How-to-Contribute#run)运行
为了测试代码修改后的效果，可以执行

```bash
./scripts/code.sh
```

开发版本的图标和发行版本的不同。

[![](https://cdn.nlark.com/yuque/0/2019/png/113971/1564629543988-0a5978b5-a857-4b0c-bf73-a848487c64b8.png#align=left&display=inline&height=106&originHeight=106&originWidth=277&size=0&status=done&width=277)](https://i.imgur.com/D2CeX0y.png)

### [](https://github.com/microsoft/vscode/wiki/How-to-Contribute#debugging)调试

Code 使用了多线程架构，代码会在多个不同的进程中执行。渲染(render) 进程在 shell 中运行了 UI 相关的代码。可以使用 VS Code 调试运行在渲染进程中的代码。

- 安装 [Debugger for Chrome](https://marketplace.visualstudio.com/items/msjsdiag.debugger-for-chrome) 扩展.扩展可以让你连接运行在 Chrome 的 debug 客户端。
- 用 VS Code 打开项目
- 选择 `Launch VS Code` 点击绿色小箭头，或者按 F5 启动。

![image.png](https://cdn.nlark.com/yuque/0/2019/png/113971/1564717944175-c1f8d127-c177-4394-ab5a-e0a07c5c1030.png#align=left&display=inline&height=160&name=image.png&originHeight=320&originWidth=700&size=20830&status=done&width=350)

扩展主机( **extension host** )进程运行由插件实现的代码。如果要调试运行在扩展主机中扩展(包括集成在 Vs Code）中，可以使用  VS Code 来调试。选择 `Attach to Extension Host` 然后点击 `F5` 启动。<br /> <br />搜索(**search**)进程也可以被调试，调试之前需要先启动它。在连接之前，点击 CMD+P 启动搜索线程，否则会连接失败。
