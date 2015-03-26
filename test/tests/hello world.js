module.exports = {
  "Hello World" : function (browser) {
    browser
      .useXpath()
      .url('http://helloworld:3000/')

      .waitForElementVisible('//input[@id="filenameAdd"]', 180000)
      .setValue('//input[@id="filenameAdd"]', "marmots")
      .setValue('//textarea[@id="input"]', "https://erisindustries.com/")
      .click('(//button)[1]')

      .waitForElementPresent('//div[@class="humane"]', 1000)
      .setValue('//input[@id="filenameGet"]', "marmots")
      .click('(//button)[2]')

      .assert.value('//textarea[@id="output"]', "https://erisindustries.com/")
      .end();
  }
};
