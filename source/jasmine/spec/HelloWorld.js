describe("Hello World", function () {
  it("should cause an error when getting a non-existent key", function (done) {
    HelloWorld.getItem("key").catch(done);
  });
  
  it("should be able to get an item after setting it", function (done) {
    HelloWorld.setItem("key", "value").then(function () {
      HelloWorld.getItem("key").then(function (value) {
        expect(value).toBe("value");
      }).then(done);
    });
  });
});
