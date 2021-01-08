const puppeteer = require('puppeteer');
const axios = require('axios');

//这里也可以使用其他的三方打码平台
function getEastCode(imageFile) {
    return new Promise(function(resolve, reject) {
        const fs = require('fs');
        const apiUrl = 'http://api.ttshitu.com/base64'; //要使用点选请将地址修改为 http://api.ttshitu.com/imageXYPlus
        let buff = fs.readFileSync(imageFile);
        let base64data = buff.toString('base64');
        axios.post(apiUrl, {
            'username': '*******', //用户名
            'password': '********', //密码
            'typeid': '1001', //验证码类型 1 纯数字1   1001 纯数字2
            'image': base64data
        }).then(function(response) {
            let d = response.data;
            if (d.success) {
                let {
                    id, result
                } = d.data;
                resolve(result);
            }
        }).
        catch (function(err) {
            resolve(0);
        })
    })
};

(async() => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'], // 不以此模式运行会有问题
        headless: true, //开启无头模式
    });
    const page = await browser.newPage();
    //目标地址
    await page.goto('https://jywg.18.cn/Login?el=1&clear=&returl=%2fTrade%2fBuy');

    //设置屏幕大小
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    const documentSize = await page.evaluate(() => {
        return {
            width: document.documentElement.clientWidth,
            height: document.body.clientHeight,
        }
    })

    //对验证码元素进行截图
    let[element] = await page.$x('//*[@id="imgValidCode"]');
    await element.screenshot({
        path: 'example.png'
    });

    //通过第三方打码平台进行验证码识别
    const imageFile = './example.png'; //填写自己的文件路径
    const code = await getEastCode(imageFile)
    if (code == 0) {
        //todo
        return 0;
    }

    //开始对输入框进行输入
    //资金账号
    var searchInput = await page.$("#txtZjzh");
    await searchInput.focus();
    await page.keyboard.type("540*******");
    //交易密码
    searchInput = await page.$("#txtPwd");
    await searchInput.focus();
    await page.keyboard.type("******");
    //验证码
    searchInput = await page.$("#txtValidCode");
    await searchInput.focus();
    await page.keyboard.type(code);
    //在线时间
    var onlineTimeButton = await page.$('#rdsc15');
    await onlineTimeButton.click();
    //输入完毕

    //创建 CDP 会话
    let cdpSession = await page.target().createCDPSession();
    //开启网络调试,监听 Chrome DevTools Protocol 中 Network 相关事件
    await cdpSession.send('Network.enable');

    var failedCount = 0;
    //监听 responseReceived 事件，获取对应的数据
    cdpSession.on('Network.responseReceived', async frame => {
        let strurl = frame.response.url;
        if (strurl.search("randNum") != -1) { //有这个说明验证码失败 页面刷新了新的验证码 需要重新去打码平台要 当然也需要重新截图
            failedCount++;
            if (failedCount >= 3) { //失败次数太多就关掉 
                process.exit();
            }
            console.log("验证码错误");
            //重新截图
            let[element] = await page.$x('//*[@id="imgValidCode"]');
            await element.screenshot({
                path: 'example.png'
            });
            //重新识别
            let imageFile = './example.png'; //填写自己的文件路径
            let code = await getEastCode(imageFile);
            //重新输入之前需要把之前输入的删掉 不然写不上
            searchInput = await page.$("#txtValidCode");
            await searchInput.focus();
            await page.keyboard.down('Shift'); //按下Shift键
            for (let i = 0; i < 5; i++)
                await page.keyboard.press('ArrowLeft');
            await page.keyboard.up('Shift'); //松开Shift键
            await page.keyboard.press('Backspace'); //选中区域全删了
            //重新输入
            await page.keyboard.type(code);

            //进行登录
            var loginButton = await page.$('#btnConfirm');
            await Promise.all([
                    loginButton.click(),
                    page.waitForNavigation()
            ]);


        }
        if (strurl.search("/Trade/Buy") != -1) {
            console.log("登录成功");
            //截图验证
            await page.screenshot({
                path: "haha.png",
                clip: {
                    x: 0,
                    y: 0,
                    width: 1920,
                    height: documentSize.height
                }
            });
            //这时候就可以去做你想做的事情了
            //.........
            process.exit();
        }
    });


    //进行登录
    var loginButton = await page.$('#btnConfirm');
    await Promise.all([
            loginButton.click(),
            page.waitForNavigation()
    ]);

    //开始对数据进行输入
    await browser.close();
})();
