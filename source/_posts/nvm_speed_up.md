---
title: "zsh (nvm) 启动时间优化"
date: 2020-03-13 00:01
tags:
  - nvm
  - zsh
---

> 这个是困扰了我好几年的问题。

使用 `time zsh -i -c exit` 可以看到 zsh 的启动时间。
本来都已经习惯了，今天突发奇想研究了一下，发现是 nvm 拖慢了我的 zsh。

### 解决方案

搜了一下 nvm 的 issue，找到了  [解决方案](https://github.com/nvm-sh/nvm/issues/539#issuecomment-403661578) 。

1. 编辑原先的 `.zshrc`，把 下方 nvm 启动的代码删除。

```shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
```

2. 添加下方代码

```shell
if [[ ! -a ~/.zsh-async ]]; then
  git clone git@github.com:mafredri/zsh-async.git ~/.zsh-async
fi
source ~/.zsh-async/async.zsh

export NVM_DIR="$HOME/.nvm"
function load_nvm() {
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
}

# Initialize worker
async_start_worker nvm_worker -n
async_register_callback nvm_worker load_nvm
async_job nvm_worker sleep 0.1
```

### 效果

```shell
time zsh -i -c exit
zsh -i -c exit  0.07s user 0.09s system 75% cpu 0.215 total
```
