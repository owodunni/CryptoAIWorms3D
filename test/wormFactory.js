var WormFactory = artifacts.require("./WormFactory.sol");

contract("WormFactory", function(accounts) {
  var wormFactoryInstance;

  it("Create Random Worm", function() {
    return WormFactory.deployed().then(function(instance) {
      instance.createRandomWorm("Hallo", { from: accounts[1] });
      return instance.wormCount();
    }).then(function(count) {
      assert.equal(count, 1);
    })
  });

  it("Create Random Worm2", function() {
    return WormFactory.deployed().then(function(instance) {
      instance.createRandomWorm("Hallo", { from: accounts[1] });
      return instance.worms(0);
    }).then(function(worm) {
      assert.equal(worm[0], 0);
      assert.equal(worm[1], "Hallo");
    })
  });
});