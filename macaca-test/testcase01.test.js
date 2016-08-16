'use strict';

var path = require('path');
var _ = require('macaca-utils');
var xml2map = require('xml2map');

var platform = process.env.platform || 'iOS';
platform = platform.toLowerCase();

var iOSOpts = {
  platformVersion: '9.3',
  deviceName: 'iPhone 5s',
  platformName: 'iOS',
  app: path.join(__dirname, '..', 'app', `${platform}-huajiaovr.zip`)
};

var androidOpts = {
  //udid : '4d006a744bd84177',
  platformName: 'Android',
  //package: 'com.github.android_app_bootstrap',
  //activity: 'com.github.android_app_bootstrap.activity.WelcomeActivity',
  app:'http://pkg3.fir.im/120ff02dbabc2899ee9dc1b1f510972045658c26.apk'
  //app: path.join(__dirname, '..', 'app', `${platform}-huajiaovr.zip`)
};

if (process.env.UDID){
    androidOpts.udid=process.env.UDID;
    iOSOpts.udid=process.env.UDID;
};

var wd = require('webdriver-client')(_.merge({}, platform === 'ios' ? iOSOpts : androidOpts));

// override back for ios
wd.addPromiseChainMethod('customback', function() {
  if (platform === 'ios') {
    return this;
  }

  return this
    .back();
});

describe('macaca zz',function(){
    this.timeout(5*60*1000);
    var driver=wd.initPromiseChain();

    before(function(){return driver.initDriver();
    });

    after(function(){return driver.sleep(1000).quit();
    });

    it('#0 login',function(){
        return driver
                   .elementByIdOrNull('com.huajiao:id/goto_qihoo_btn')
                   .then(function(el){
                       if(el){
                          return driver.elementById('com.huajiao:id/goto_qihoo_btn')
                                       .click().webview().source().then(function(html){
                                                             //console.log(html)
                                                             html.should.containEql('360账号 登录');
                                                         })
                                       .waitForElementByXPath('//*[@id="username"]')
                                       .sendKeys('zhangzhaozyp1234@126.com')
                                       .waitForElementByXPath('//*[@id="password"]')
                                       .sendKeys('ZZzz123456')
                                       .waitForElementByXPath('//*[@id="button"]')
                                       .click()
                                       .native().waitForElementById('com.huajiao:id/tab_user_tv','3000','100').tap();
                                       //.sleep(5000);
                       }
                       else{
                          return driver.waitForElementById('com.huajiao:id/tab_user_tv','3000','100').tap();
                       }
                   });
    });
    //it('#1 should display home',function(){
        //return driver.native().waitForElementById('com.huajiao:id/tab_user_tv','3000','100').tap();
    //});
    it('#2 should display follow',function(){
        return driver.waitForElementById('com.huajiao:id/follow_num_tv','3000','100').tap();
    });
    
    it('#3 search user zhangzhaoa',function(){
       //return driver.waitForElement("new UISelector().text",'snowan').tap();
       //return driver.waitForElementByXPath("//android.widget.TextView[contains(@text,'snowan')]").tap();
       return driver.waitForElementByName('张钊啊','3000','100').tap();
    });

    it('#4 enter vr room',function(){
         return driver.waitForElementById('com.huajiao:id/left_img','3000','100').tap();
    });

});
