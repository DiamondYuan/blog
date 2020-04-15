---
title: "使用 JavaScript 编写自定义 Github Action"
date: 2020-04-15 23:56:41
---

Github Action 有可以通过 JavaScript 和 docker 来编写。这篇文章讲的是如何使用 javascript 来编写 GitHub Action。
为了方便，我编写的是项目内置的 GitHub action。

### 编写描述文件

创建 action 的描述文件 `actions/release/action.yml`

```yaml
name: "Hello World"
description: "Greet someone and record the time"
inputs:
  who-to-greet: # id of input
    description: "Who to greet"
    required: true
    default: "World"
outputs:
  time: # id of output
    description: "The time we we greeted you"
runs:
  using: "node12"
  main: "src/index.js"
```

### 编写代码

代码的位置是 `actions/release/src/index.js`

```javascript
const core = require("@actions/core");
const github = require("@actions/github");

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, null, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
```

描述文件说明了 action 的 输入、输出、以及从哪开始运行 action。要注意的是, main 的路径是相对于 action.yml 文件，而不是相对根目录。

### 使用 action

在  `.github/workflows/main.yml`  创建一个 workflow

```yaml
on: [push]

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: A job to say hello
    steps:
      # To use this repository's private action, you must check out the repository
      - name: Checkout
        uses: actions/checkout@v2
      - name: Hello world action step
        uses: ./actions/release
        id: hello
        with:
          who-to-greet: "Mona the Octocat"
      # Use the output from the `hello` step
      - name: Get the output time
        run: echo "The time was ${{ steps.hello.outputs.time }}"
```

提交代码以后，我们就可以发现，~~成功~~（失败）了。

![运行结果](https://blog-staticfile.diamondyuan.com/2020-04-16-write_custom_github_action_using_javascript_01.png)

### 解决问题

查看  [官方 demo](https://github.com/actions/hello-world-javascript-action) ,发现他把 node_modules 上传到了 GitHub 🤦‍♂️。
继续看官方文档，提到了  `zeit/ncc` 。可以把依赖全部打包成一个文件。那就很简单了。

#### 1. 修改代码路径

```bash
actions/release/index.js → actions/release/src/index.js
```

#### 2.修改 package.json

```bash
{
   "main": "dist/main.bundle.js",
   "scripts": {
+    "build:action": "npm run ncc build actions/release/src/index.js -o actions/release/dist",
	 }
   "devDependencies":{
+    "@zeit/ncc": "^0.22.0",
	 }
}
```

#### 3. 修改入口

```bash
diff --git a/actions/release/action.yml b/actions/release/action.yml
-  main: 'index.js'
+  main: 'dist/index.js'
```

#### 4.成功运行

![运行成功](https://blog-staticfile.diamondyuan.com/2020-04-16-https-::blog-staticfile.diamondyuan.com:2020-04-16-write_custom_github_action_using_javascript_02.png)

### 参考文档

- demo 位置  [https://github.com/DiamondYuan/umi-electron-boilerplate/tree/c1f53e5944eb877b3546f936311a4c487ca43570](https://github.com/DiamondYuan/umi-electron-boilerplate/tree/c1f53e5944eb877b3546f936311a4c487ca43570)
- 官方文档  [https://help.github.com/cn/actions/building-actions/creating-a-javascript-action](https://help.github.com/cn/actions/building-actions/creating-a-javascript-action)
