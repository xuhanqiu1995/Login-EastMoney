# Login-EastMoney


## 模拟登陆东方财富web交易客户端

主要基于部分Js的第三 library 

1. [puppeteer](https://www.npmjs.com/package/puppeteer) 模拟浏览器操作
2. [axios](https://www.npmjs.com/package/axios) 基于promise的HTTP 库
3. [ttshitu](http://www.ttshitu.com/test.html) 随便找的一个打码平台

## 环境

* 腾讯云2c4g+centos7.5 
* node@v9.3.0+puppeteer@v2.1.0+axios

## tips 

puppeteer的安装较为棘手，几点建议

1. 使用淘宝的镜像安装，cnpm install puppeteer@v2.1.0 -S 
1. puppeteer会运行Chromium，Chromium运行需要大量的库文件，系统上面可能没有，一般运行的时候会提示.so文件不存在，可以去[pkg](https://centos.pkgs.org/) 搜索该so文件，可以知道所属哪个rpm，然后进行yum安装

## Usage
Execute script on the command line

```bash
node loginEastMoney.js
```
登录效果图可见haha.jpg

