var WormFactory = artifacts.require("./WormFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(WormFactory);
};
