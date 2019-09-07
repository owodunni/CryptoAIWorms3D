App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("WormFactory.json", function(wormFactory) {
      App.contracts.WormFactory = TruffleContract(wormFactory);
      // Connect provider to interact with contract
      App.contracts.WormFactory.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  render: function() {
    console.log("Render")
    var wormFactoryInstance;
    var loader = $("#loader");
    var content = $("#content");
  
    loader.show();
    content.hide();
  
    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      console.log("getCoinbase");
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

      // Load contract data
  App.contracts.WormFactory.deployed().then(function(instance) {
    wormFactoryInstance = instance;
    return wormFactoryInstance.wormCount();
  }).then(function(wormCount) {
    console.log("Rendering worms " + wormCount)
    var worms = $("#worms");
    worms.empty();

    for (var i = 0; i < wormCount; i++) {
      wormFactoryInstance.worms(i).then(function(worm) {
        console.log(JSON.stringify(worm));
        var id = worm[0];
        var name = worm[1];
        var dna = worm[2];

        // Render candidate Result
        var wormTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + dna + "</td></tr>";
        worms.append(wormTemplate);
      });
    }

    loader.hide();
    content.show();
  }).catch(function(error) {
    console.warn(error);
  });
  },
  createWorm: function() {
    var wormName = $('#wormName').val();
    App.contracts.WormFactory.deployed().then(function(instance) {
      return instance.createRandomWorm(wormName, { from: App.account });
    }).catch(function(err) {
      console.error(err);
    });
  },
  listenForEvents: function() {
    App.contracts.WormFactory.deployed().then(function(instance) {
      instance.NewWorm({}, {
        fromBlock: 'latest',
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
        App.render();
      });
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});