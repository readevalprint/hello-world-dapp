module.exports = {
  "load page": function (browser) {
    browser
      .useXpath()
      .url('http://helloworldone:3000/')
      .waitForElementVisible('//input[@id="filenameGet"]', 1000);
  },

  "missing file": function (browser) {
    browser
      .setValue('//*[@id="filenameGet"]', "centralized")
      .click('(//button)[2]')
      .waitForElementVisible('//*[contains(@class, "alertify-log-error")]',
        1000)

      .assert.containsText('//*[contains(@class, "alertify-log-error")]',
        "File not found");
  },

  "add file to one": function (browser) {
    browser
      .setValue('//*[@id="filenameAdd"]', "marmots")
      .setValue('//*[@id="input"]', "http://www.marmotburrow.ucla.edu/index.html")
      .click('(//button)[1]')
      .waitForElementVisible('//*[contains(@class, "alertify-log-success")]',
        1000)

      .assert.containsText('//*[contains(@class, "alertify-log-success")]',
        "File sent! You can now get it by its name.");
  },

  "get file from one": function (browser) {
    browser
      .clearValue('//*[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', "marmots")
      .click('(//button)[2]')
      .assert.value('//*[@id="output"]', "http://www.marmotburrow.ucla.edu/index.html");
  },

  "get file from two": function (browser) {
    browser
      .url('http://helloworldtwo:3000/')
      .waitForElementVisible('//input[@id="filenameGet"]', 1000)
      .clearValue('//*[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', "marmots")
      .click('(//button)[2]')
      .assert.value('//*[@id="output"]', "http://www.marmotburrow.ucla.edu/index.html");
  },

  "change file on two": function (browser) {
    browser
      .setValue('//*[@id="filenameAdd"]', "marmots")
      .setValue('//*[@id="input"]', "https://erisindustries.com/")
      .click('(//button)[1]')
      .waitForElementVisible('//*[contains(@class, "alertify-log-success")]',
        1000)

      .assert.containsText('//*[contains(@class, "alertify-log-success")]',
        "File sent! You can now get it by its name.");
  },

  "get changed file from two": function (browser) {
    browser
      .url('http://helloworldtwo:3000/')
      .waitForElementVisible('//input[@id="filenameGet"]', 1000)
      .clearValue('//*[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', "marmots")
      .click('(//button)[2]')
      .assert.value('//*[@id="output"]', "https://erisindustries.com/");
  },

  "get changed file from one": function (browser) {
    browser
      .clearValue('//*[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', "marmots")
      .click('(//button)[2]')
      .assert.value('//*[@id="output"]', "https://erisindustries.com/");
  },

  after: function (browser) {
    browser.end();
  }
};
