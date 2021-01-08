# Login-EastMoney


## 模拟登陆东方财富web交易客户端

主要基于以下的 Js 的第三 library 

1. [puppeteer](https://www.npmjs.com/package/puppeteer) 模拟浏览器操作
2. [axios](https://www.npmjs.com/package/axios) 基于promise的HTTP 库
3. [ttshitu](http://www.ttshitu.com/test.html) 随便找的一个打码平台

## Todolist
1. **重构代码，增加可扩展性**
1. 增加新浪微博网页版的登录 (已解决)
1. 增加 QQ 空间 和 QQ 邮箱的登录
1. 重新组织文件结构和代码风格，make it esay to read
1. 增加可扩展性，方便添加新的功能, 现在开发新功能的例子还很不优雅。

## tips 

puppeteer的安装较为棘手，几点建议

1. 使用淘宝的镜像安装，cnpm install puppeteer@v2.1.0 -S 
1. puppeteer会运行Chromium，Chromium运行需要大量的库文件，系统上面可能没有，一般运行的时候会提示.so文件不存在，可以去[pkg](https://centos.pkgs.org/) 搜索该so文件，可以知道所属哪个rpm，然后进行yum安装

## Usage
Execute script on the command line

```bash
node hn.js
```

## 捐赠

 - [微信捐赠](http://7xti71.com1.z0.glb.clouddn.com/wechat_pay.png)
 - [支付宝捐赠](http://7xti71.com1.z0.glb.clouddn.com/alipay-xchaoinfo.jpg)
 - [捐赠记录](https://github.com/xchaoinfo/fuck-login/wiki/donation)

如果本项目对你有用，欢迎对本项目进行捐赠，捐赠时候请留下你的github ID，当然您也可以匿名捐赠。



## something to add

1. 这个项目开始于 2016.2，有些网站改了规则，可能模拟登录不能使用了，授人以鱼不如授人以渔，后面会维护几个典型的模拟登录，并且会给出每个模拟登录的教程，初步考虑是视频，这样对于刚刚接触爬虫，对于抓包分析技术一脸懵逼的初学者来说比较友好，后面可能会更新图文的教程。教程目前制作中，我新注册了一个微信公众号 xchaoinfo, 教程的更新会在微信公众号提醒，欢迎关注


1. 项目写了一段时间后，发现代码的风格和程序的易用性，可扩展性，代码的可读性，都存在一定的问题，所以接下来最重要的是重构代码，让大家可以更容易的做出一些自己的小功能。
1. 如果你觉得某个网站的登录很有代表性，欢迎在 issue 中提出，
如果网站的登录很有意思，我会在后面的更新中加入
1. 网站的登录机制有可能经常的变动，所以当现在的模拟的登录的规则不能使用的时候，请在 issue 中提出
如果时间允许的话，我会更新。




