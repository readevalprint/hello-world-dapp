module.exports = {
  "load page": function (browser) {
    browser
      .useXpath()
      .url('http://helloworld:3000/')
      .waitForElementVisible('//input[@id="filenameGet"]', 180000);
  },

  "missing file": function (browser) {
    browser
      .setValue('//*[@id="filenameGet"]', "centralized")
      .click('(//button)[2]')
      .waitForElementVisible('//*[contains(@class, "alertify-log-error")]', 1000)
      .assert.containsText('//*[contains(@class, "alertify-log-error")]', "File not found");
  },

  "add marmots (file)": function (browser) {
    browser
      .setValue('//*[@id="filenameAdd"]', "marmots")
      .setValue('//*[@id="input"]', "https://erisindustries.com/")
      .click('(//button)[1]')
      .waitForElementVisible('//*[contains(@class, "alertify-log-success")]', 1000)
      .assert.containsText('//*[contains(@class, "alertify-log-success")]', "File sent! You can now get it by its name.")

      .clearValue('//*[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', "marmots")
      .click('(//button)[2]')
      .assert.value('//*[@id="output"]', "https://erisindustries.com/")
      browser.end();
  }
};
