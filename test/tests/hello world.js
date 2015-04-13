var
  name;

// Choose a non-deterministic name because the keys persist in IPFS
// between tests.
name = String(Math.random());

module.exports = {
  "load page": function (browser) {
    browser
      .useXpath()
      .url('http://helloworldone:3000/')
      .waitForElementVisible('//input[@id="filenameGet"]', 10000);
  },

  "missing file": function (browser) {
    browser
      .setValue('//*[@id="filenameGet"]', "centralized")
      .click('(//button)[2]')
      .waitForElementVisible('//*[contains(@class, "ajs-error")]', 10000)

      .assert.containsText('//*[contains(@class, "ajs-error")]',
        "File not found");
  },

  "add file to one": function (browser) {
    browser
      .setValue('//*[@id="filenameAdd"]', name)
      .setValue('//*[@id="input"]', "http://www.marmotburrow.ucla.edu/index.html")
      .click('(//button)[1]')
      .waitForElementVisible('//*[contains(@class, "ajs-success")]', 30000)

      .assert.containsText('//*[contains(@class, "ajs-success")]',
        "File sent! You can now get it by its name.")

      .waitForElementNotPresent('//*[contains(@class, "ajs-success")]', 10000);
  },

  "get file from one": function (browser) {
    browser
      .clearValue('//*[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', name)
      .click('(//button)[2]')
      .waitForElementVisible('//*[contains(@class, "ajs-success")]', 30000)

      .assert.containsText('//*[contains(@class, "ajs-success")]',
        "Got file.")

      .assert.value('//*[@id="output"]', "http://www.marmotburrow.ucla.edu/index.html");
  },

  "get file from two": function (browser) {
    browser
      .url('http://helloworldtwo:3000/')
      .waitForElementVisible('//input[@id="filenameGet"]', 1000)
      .clearValue('//*[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', name)
      .click('(//button)[2]')
      .waitForElementVisible('//*[contains(@class, "ajs-success")]', 60000)

      .assert.containsText('//*[contains(@class, "ajs-success")]',
        "Got file.")

      .assert.value('//*[@id="output"]', "http://www.marmotburrow.ucla.edu/index.html");
  },

  "change file on two": function (browser) {
    browser
      .setValue('//*[@id="filenameAdd"]', name)
      .setValue('//*[@id="input"]', "https://erisindustries.com/")
      .click('(//button)[1]')
      .waitForElementVisible('//*[contains(@class, "ajs-success")]',
        1000)

      .assert.containsText('//*[contains(@class, "ajs-success")]',
        "File sent! You can now get it by its name.")

      .waitForElementNotPresent('//*[contains(@class, "ajs-success")]', 10000);
  },

  "get changed file from two": function (browser) {
    browser
      .url('http://helloworldtwo:3000/')
      .waitForElementVisible('//input[@id="filenameGet"]', 1000)
      .clearValue('//*[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', name)
      .click('(//button)[2]')
      .waitForElementVisible('//*[contains(@class, "ajs-success")]', 30000)

      .assert.containsText('//*[contains(@class, "ajs-success")]',
        "Got file.")

      .assert.value('//*[@id="output"]', "https://erisindustries.com/");
  },

  "get changed file from one": function (browser) {
    browser
      .clearValue('//*[@id="filenameGet"]')
      .setValue('//*[@id="filenameGet"]', name)
      .click('(//button)[2]')
      .waitForElementVisible('//*[contains(@class, "ajs-success")]', 30000)

      .assert.containsText('//*[contains(@class, "ajs-success")]',
        "Got file.")

      .assert.value('//*[@id="output"]', "https://erisindustries.com/");
  },

  after: function (browser) {
    browser.end();
  }
};
