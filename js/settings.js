var settings = {
  tickspersecond: 10,
  logictickspersecond: 10,
  version: "v0.1",
  defaultoptions: {
    notation: "standard",
    notationdecimals: 3,
    theme: "dark",
    buyamounts: { qp: 1, qsp: 1, freep: 1, chargep: 1, gluonp: 1, upg: 1, special: 1, challengedifficulty: 1, applyelectronpower: 1, qbp: 1, splitupg: 1, pppbuy: 1 },
    toggleamounts: [1, 10, 25, 100, -1],
    currentscreen: "producers",
    currentstatscreen: "general",
    currentproducersscreen: "quark",
    currentupgradesscreen: "quark",
    hotkeysenabled: true,
    doofflineprogress: true,
    doconsoleoutput: false,
    confirmations: {
      electrify: true,
      nucleonize: true
    },
    gamespeedmodifier: 1
  },
  defaultstats: {
    times: { game: Date.now() },
    prestigeamounts: {},
    past10prestiges: {}
  }
}
function getrawbuyamount(type){
  if (type == undefined)
    return "type Undefined"
  var buyamount = player.options.buyamounts[type];
  if (buyamount == undefined) {
    player.options.buyamounts[type] = 1;
    return 1;
  }
  if (buyamount != -1)
    return buyamount;
  return 1;
}

function getbuyamount(type, object) {
  if (type == undefined)
    return "type Undefined"
  var buyamount = player.options.buyamounts[type];
  if (buyamount == undefined) {
    player.options.buyamounts[type] = 1;
    return new Decimal(1);
  }
  if (buyamount != -1)
    return new Decimal(buyamount);
  if (object == undefined)
    return "Max"
  return new Decimal(object.buyamount);
}

function setbuyamount(type, num) {
  player.options.buyamounts[type] = num;
  producerregistry.forEach((prod, i) => {
    prod.recalculatecosts();
  });
  upgraderegistry.forEach((upgr, i) => {
    upgr.recalculatecosts();
  });
}

function resetstats() {
  player.stats = {};
  player.stats = shallowcopy(settings.defaultstats);
}

function togglebuyamount(type) {
  var buyamount = getrawbuyamount(type);
  var ind = player.options.toggleamounts.indexOf(buyamount);
  if (ind == undefined || ind == player.options.toggleamounts.length - 1) {
    setbuyamount(type, player.options.toggleamounts[0]);
  }
  else {
    setbuyamount(type, player.options.toggleamounts[ind + 1])
  }
}

function log(obj) {
  if (player.options.doconsoleoutput) {
    console.log(obj);
  }
}
