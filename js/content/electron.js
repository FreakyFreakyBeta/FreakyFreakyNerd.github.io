//Most fundamental Elements Of The Elctron Stage
function setupbasicelectronstage() {
  player.electronstage.electrons = new Currency("electron", "Electrons", 0);
  var electrongain = (amount) => {
    if (amount.lessThan(new Decimal("1e16")))
      return new Decimal();
    if(getupgrade("eu42")?.ismaxbuyable)
      return Decimal.floor(Decimal.pow(amount.divide("1e16"), 1 / 4));
    return Decimal.floor(Decimal.pow(amount.divide("1e16"), 1 / 5));
  }
  var doelectrify = async (hadrequire, producedamounts, forced) => {
    if (!forced && player.options.confirmations.electrify) {
      var confirm = await confirmtest("Gain electrons but reset all quark producers and upgrades?");
      if (!confirm)
        return false;
    }
    if (hadrequire){
      player.stats.prestigeamounts.electrify += 1;
      player.stats.past10prestiges.electrify.unshift([Date.now() - player.stats.times.electrify, producedamounts[0]]);
      player.stats.past10prestiges.electrify.pop();
    }
    player.stats.times.electrify = Date.now();
    return true;
  }
  player.quarkstage.electrify = new Prestige("electrify", "Electrify", doelectrify, () => { resetQuarkStage(); }, new NumRequirement(player.quarkstage.quarks, "1e16"), new PrestigeReward(player.electronstage.electrons, player.quarkstage.quarks, electrongain));
}

//Everything to do with setting up Quark Spin Production
function setupquarkspinproducers() {
  var spinmult = (amount) => {
    if (amount.lessThanOrEqualTo(1))
      return new Decimal(1);
    upg = getupgrade("eu41");
    if(upg == undefined || !upg.ismaxbuyable)
      var num = Decimal.pow(amount, 1 / 4);
    else
      var num = Decimal.pow(amount, 1 / 2)
    return num;
  }
  player.electronstage.quarkspin = new Upgrade("quarkspin", "Quark Spin", 0, null, new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, spinmult, (obj) => "You have " + formatDecimalNormal(obj.amount) + " Quark Spin, providing a x" + formatDecimal(obj.value) + " production boost to Quark Producers."), null, null, {getsproduced : true});

  player.electronstage.quarkspinproducers = [];
  player.electronstage.quarkspinproducers.push(new Producer("qs1", "Green Quark", [new ExponentialCost(player.electronstage.electrons, "5", 2)], [new LinearProduction(player.electronstage.quarkspin, "10")], null, "qsp", new AchievementRequirement("infinityquarks")));
  player.electronstage.quarkspinproducers.push(new Producer("qs2", "Red Quark", [new ExponentialCost(player.electronstage.electrons, "100", 3)], [new LinearProduction(player.electronstage.quarkspin, "100")], new NumRequirement(player.electronstage.quarkspinproducers[0], 5), "qsp", new AchievementRequirement("infinityquarks")));
  player.electronstage.quarkspinproducers.push(new Producer("qs3", "Blue Quark", [new ExponentialCost(player.electronstage.electrons, "2500", 4)], [new LinearProduction(player.electronstage.quarkspin, "1000")], new NumRequirement(player.electronstage.quarkspinproducers[1], 5), "qsp", new AchievementRequirement("infinityquarks")));
  player.electronstage.quarkspinproducers.push(new Producer("qs4", "Antigreen Quark", [new ExponentialCost(player.electronstage.electrons, "1e7", 4)], [new LinearProduction(player.electronstage.quarkspin, "1e5")], new NumRequirement(player.electronstage.quarkspinproducers[2], 5), "qsp", new AchievementRequirement("infinityquarks")));
  player.electronstage.quarkspinproducers.push(new Producer("qs5", "Antired Quark", [new ExponentialCost(player.electronstage.electrons, "1e12", 4)], [new LinearProduction(player.electronstage.quarkspin, "1e7")], new NumRequirement(player.electronstage.quarkspinproducers[3], 5), "qsp", new AchievementRequirement("infinityquarks")));
  player.electronstage.quarkspinproducers.push(new Producer("qs6", "Antiblue Quark", [new ExponentialCost(player.electronstage.electrons, "1e24", 10)], [new LinearProduction(player.electronstage.quarkspin, "1e9")], new NumRequirement(player.electronstage.quarkspinproducers[4], 5), "qsp", new AchievementRequirement("infinityquarks")));
  player.electronstage.quarkspinproducers.push(new Producer("qs7", "Meson Quark", [new ExponentialCost(player.electronstage.electrons, "1e48", 100)], [new LinearProduction(player.electronstage.quarkspin, "1e12")], new NumRequirement(player.electronstage.quarkspinproducers[5], 5), "qsp", new AchievementRequirement("infinityquarks")));
  player.electronstage.quarkspinproducers.push(new Producer("qs8", "Baryon Quark", [new ExponentialCost(player.electronstage.electrons, "1e96", 1000)], [new LinearProduction(player.electronstage.quarkspin, "1e18")], new NumRequirement(player.electronstage.quarkspinproducers[6], 5), "qsp", new AchievementRequirement("infinityquarks")));
  player.electronstage.quarkspinproducers.push(new Producer("qs9", "Antibaryon Quark", [new ExponentialCost(player.electronstage.electrons, "1e200", 10000)], [new LinearProduction(player.electronstage.quarkspin, "1e25")], new NumRequirement(player.electronstage.quarkspinproducers[7], 5), "qsp", new AchievementRequirement("infinityquarks")));
  player.electronstage.quarkspinproducers.push(new Producer("qs10", "Metaphysical Quark", [new ExponentialCost(player.electronstage.electrons, "1e500", 100000)], [new LinearProduction(player.electronstage.quarkspin, "1e50")], new NumRequirement(player.electronstage.quarkspinproducers[8], 5), "qsp", new AchievementRequirement("infinityquarks")));
}

//Most basic electron upgrades that need to be done
function setupbasicelectronupgrades() {
  player.electronstage.upgrades = [];

  player.electronstage.upgrades.push(new Upgrade("eu0", "Twice The Quarks!", 1, null, [new StaticEffect(player.quarkstage.producers, 2, EffectTypes.ProducerMultiplierProduction, null, () => "Quark Gain x2")], [new StaticCost(player.electronstage.electrons, 1)], "upg", {tag : "e"}));

  player.electronstage.upgrades.push(new Upgrade("eu1", "Get 10 free Acelerons.", 1, null, [new StaticEffect(player.quarkstage.upgrades[0], 10, EffectTypes.UpgradeBonusLevels, null, () => "Helps expecially at the begining of a run")], [new StaticCost(player.electronstage.electrons, 10)], "upg", {tag : "e"}))
  player.electronstage.upgrades.push(new Upgrade("eu2", "Get 4 free Multors.", 1, null, [new StaticEffect(player.quarkstage.upgrades[5], 4, EffectTypes.UpgradeBonusLevels, null, () => "That is a base 1.46x to Quark Production")], [new StaticCost(player.electronstage.electrons, "50")], "upg", {tag : "e"}))
  player.electronstage.upgrades.push(new Upgrade("eu3", "Get 15 free Accelerons, and 3 free Multors.", 1, null, [new StaticEffect(player.quarkstage.upgrades[5], 3, EffectTypes.UpgradeBonusLevels, null, () => "Helps some more at the begining of a run and at least a 1.33x to Quark Production"), new StaticEffect(player.quarkstage.upgrades[0], 15, EffectTypes.UpgradeBonusLevels, null, null)], [new StaticCost(player.electronstage.electrons, "250")], "upg", {tag : "e"}))
  player.electronstage.upgrades.push(new Upgrade("eu4", "Get a free Accelerator per 100 Quark Producers bought.", 1, null, [new LinkedLinearEffect(player.quarkstage.upgrades[1], () => Decimal.floor(totalproducerbought(player.quarkstage.producers).divide(100)), 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => "Free Accelerators: " + formatDecimalNormal(obj.value))], [new StaticCost(player.electronstage.electrons, "1e3")], "upg", {tag : "e"}))

  var electronmult = () => Decimal.pow(Decimal.log(player.electronstage.electrons.amount, 10), 2);
  player.electronstage.upgrades.push(new Upgrade("eu5", "Gain production based on unspent Electrons", 1, null, [new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, electronmult, (obj) => "Quark Gain x" + formatDecimalOverride(obj.value, 2))], [new StaticCost(player.electronstage.electrons, "1e4")], "eupg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu6", "Quark producers cost scales slower.", 1, null, [new StaticEffect(player.quarkstage.producers, .95, EffectTypes.PriceScaling, null, () => "Cost scales 5% slower.")], [new StaticCost(player.electronstage.electrons, "2.5e4")], "upg", {tag : "e"}))
  var electrifymult = (amount) => {
    if(amount > 200){
      return (new Decimal(20000)).times(Decimal.pow(1.05, Decimal.log(amount, 10)));
    }
    return Decimal.pow(1.05, amount)
  }
  player.electronstage.upgrades.push(new Upgrade("eu7", "Boost quark production based on Electrified stat. (Uncapped but drops off significantly)", 1, null, [new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, () => electrifymult(player.stats.prestigeamounts.electrify), (obj) => "Quark production x" + formatDecimal(obj.value))], [new StaticCost(player.electronstage.electrons, "1e5")], "upg", {tag : "e"}))
  player.electronstage.upgrades.push(new Upgrade("eu8", "Get free Multors based on quarks gained this Electrify.", 1, null, [new FunctionEffect(player.quarkstage.upgrades[5], EffectTypes.UpgradeBonusLevels, () => Decimal.floor(Decimal.log(player.quarkstage.quarks.gained.add(1), 100)), (obj) => formatDecimalNormal(obj.value) + " Free Multors")], [new StaticCost(player.electronstage.electrons, "1e6")], "upg", {tag : "e"}))

  player.electronstage.upgrades.push(new Upgrade("eu9", "Time to make the quark spin production faster, x0(+10/Level)", 250, null, [new LinearEffect(player.electronstage.quarkspinproducers, 0, 10, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark spin production x" + formatDecimalOverride(obj.value, 2))], new LinearCost(player.electronstage.electrons, "1e7", "1e7"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu41", "Better Quark Spin Effect Equation", 1, null, [new FlavorEffect("Quark Spin Effect Value [Quark Spin]^.25 -> [Quark Spin]^.5")], new StaticCost(player.electronstage.electrons, "1e8"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu10", "Increases Quark Production, Electron Gain, and Multor/Acceleron Power", 100, null, [new LinearEffect(player.quarkstage.producers, 1, 1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark production x" + formatDecimalOverride(obj.value, 1) + "(+" + + formatDecimalOverride(obj.increase, 1) + ")"), new LinearEffect(player.quarkstage.electrify, 1, .1, EffectTypes.PrestigeMultiplicativeGain, null, (obj) => "Electrons x" + formatDecimalOverride(obj.value, 1) + "(+" + formatDecimalOverride(obj.increase, 1) + ")"), new LinearEffect([player.quarkstage.upgrades[1], player.quarkstage.upgrades[6]], 1, .001, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Accelerator/Multron Power x" + formatDecimalOverride(obj.value, 3) + "(+" + formatDecimalOverride(obj.increase, 3) + ")")], new ExponentialCost(player.electronstage.electrons, "1e10", 1.25), "upg", { "showall": true, tag : "e" }));

  var chargemultpow = () => { if (totalproducerbought(player.quarkstage.producers).equals(1)) return .1; else return .05; }
  var chargermult = () => Decimal.min(Decimal.pow(player.quarkstage.quarks.gained, chargemultpow()).add(1), 1e20);
  player.electronstage.upgrades.push(new Upgrade("eu11", "Charger production multiplier based on gained Quarks (Scaling increases with only 1 purchased quark buyer)", 1, null, [new FunctionEffect(player.quarkstage.producers[0], EffectTypes.ProducerMultiplierProduction, chargermult, (obj) => "Charger Production *" + formatDecimal(obj.value))], new StaticCost(player.electronstage.electrons, "1e11"), "upg", {tag : "e"}));

  var quarkspinmulti = () => Decimal.pow(1.01, totalproducerbought(player.electronstage.quarkspinproducers));
  player.electronstage.upgrades.push(new Upgrade("eu12", "Quark Spin production multiplier based on bought Quark Spin Producers", 1, null, [new FunctionEffect(player.electronstage.quarkspinproducers, EffectTypes.ProducerMultiplierProduction, quarkspinmulti, (obj) => "Quark Spin Producers *" + formatDecimal(obj.value))], new StaticCost(player.electronstage.electrons, "1e12"), "upg", {tag : "e"}));
}

function setupbasicelectronupgradesstage2() {
  player.electronstage.upgrades.push(new Upgrade("eu14", "Slightly Increase Electron Gain and Quark Gain", 50, null, [new ExponentialEffect(player.quarkstage.producers, 10, 1.05, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Production *" + formatDecimalOverride(obj.value, 2)), new ExponentialEffect(player.quarkstage.electrify, 5, 1.01, EffectTypes.PrestigeMultiplicativeGain, null, (obj) => "Electron Gain *" + formatDecimalOverride(obj.value, 2))], new ExponentialCost(player.electronstage.electrons, "1e14", 1.3), "upg", { "showall": true, tag : "e" }));
  player.electronstage.upgrades.push(new Upgrade("eu13", "Electron Power Amount Multiplier", 10, null, [new ExponentialEffect(player.electronstage.clouds.power, 1, 2, EffectTypes.UpgradeAmountMultiplier, null, (obj) => "Electron Power Amount *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")")], [new HyperExponentialCost(player.electronstage.electrons, "1e18", "10", "1.5")], "upg", {tag : "e"}));

  player.electronstage.upgrades.push(new Upgrade("eu42", "More Electrons?", 1, null, new FlavorEffect("Base Electron gain Quarks^.2 -> Quarks^.25"), new StaticCost(player.electronstage.electrons, "1e24"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu43", "Quark Recursion?", 1, null, new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, () => new Decimal(Decimal.log(player.quarkstage.quarks.amount.add(1), 10)), (obj) => "Quark Production Based On Quarks || Currently Quark Production *" + formatDecimalNormal(obj.value)), new StaticCost(player.electronstage.electrons, "1e28"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu44", "Orbitals Seem Kinda Weak No?", 10, null, new ExponentialEffect(getupgrades("1s", "2s", "2p", "3s", "3p", "4s", "3d"), 1, 1.1, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Orbital's 1S through 3D Effects *" + formatDecimal(obj.value, 2)), new ExponentialCost(player.electronstage.electrons, "1e30", 5), "upg", {tag : "e"}));
  var timeboost = () => {
    var dif = Date.now() - player.stats.times.electrify;
    return Decimal.pow(dif/1e4 * Decimal.log(dif, 10), Decimal.min(new Decimal(1).add(Decimal.log(dif, 10)/64), 1.25)).add(1);
  }
  player.electronstage.upgrades.push(new Upgrade("eu45", "Current Electrify Time Boosts Electron Gain", 1, null, new FunctionEffect(player.quarkstage.electrify, EffectTypes.PrestigeMultiplicativeGain, timeboost, (obj) => "Electron Gain *" + formatDecimal(obj.value, 2)), new StaticCost(player.electronstage.electrons, "1e64"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu46", "No More Reassigning Electron Power (Well at least for a few upgrades)", 1, null, new FunctionEffect(getupgrades("1s", "2s", "2p", "3s", "3p", "4s", "3d"), EffectTypes.ProducerStaticProduction, () => player.electronstage.clouds.power.amount.divide(10), (obj) => "Orbital's 1S through 3D produce progress equal to Electron Power/10 || Currently: " + formatDecimal(obj.value)), new ExponentialCost(player.electronstage.electrons, "1e70", 5), "upg", {tag : "e"}));

  player.electronstage.upgrades.push(new Upgrade("eu15", "I need dem quarks", 10, new AchievementRequirement("1nucleonize"), new ExponentialEffect(player.quarkstage.producers, 1, 2, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Production *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e120", "1e10"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu16", "I need the spin", 10, new AchievementRequirement("1nucleonize"), new ExponentialEffect(player.electronstage.quarkspinproducers, 1, 2, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Spin Production *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e150", "1e15"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu17", "Electrons make the world go round", 100, new AchievementRequirement("1nucleonize"), new ExponentialEffect(player.quarkstage.electrify, 1, 2, EffectTypes.PrestigeMultiplicativeGain, null, (obj) => "Electron Gain *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e250", "1e25"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu18", "Quarks!!", 1, new AchievementRequirement("1nucleonize"), new StaticEffect(player.quarkstage.producers, 1.1, EffectTypes.ProducerExponentialProduction, null, (obj) => "Quark Production ^" + formatDecimal(obj.value)), new StaticCost(player.electronstage.electrons, "1e300"), "upg"));
  player.electronstage.upgrades.push(new Upgrade("eu19", "Quark Spin!!", 1, new AchievementRequirement("1nucleonize"), new StaticEffect(player.electronstage.quarkspinproducers, 1.1, EffectTypes.ProducerExponentialProduction, null, (obj) => "Quark Spin Production ^" + formatDecimal(obj.value)), new StaticCost(player.electronstage.electrons, "1e400"), "upg"));
  player.electronstage.upgrades.push(new Upgrade("eu20", "Electrons!!", 1, new AchievementRequirement("1nucleonize"), new StaticEffect(player.quarkstage.electrify, 1.1, EffectTypes.PrestigeExponentialGain, null, (obj) => "Electron Gain ^" + formatDecimal(obj.value)), new StaticCost(player.electronstage.electrons, "1e500"), "upg"));
  player.electronstage.upgrades.push(new Upgrade("eu21", "The Power Creep", 100, new AchievementRequirement("1nucleonize"), new ExponentialEffect(player.electronstage.clouds.power, 1, 1.25, EffectTypes.UpgradeAmountMultiplier, null, (obj) => "Electron Power *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e650", "1e5"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu22", "Acceleron Power", 1000, new AchievementRequirement("1nucleonize"), new ExponentialEffect(player.quarkstage.upgrades[0], 1, 1.1, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Accelleron Power *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e800", "1e5"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu23", "Mutlor Power", 1000, new AchievementRequirement("1nucleonize"), new LinearEffect(player.quarkstage.upgrades[5], 1, .0001, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Multor Power *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e1000", "1e5"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu24", "Acceleration", 1000, new AchievementRequirement("1nucleonize"), new LinearEffect(player.quarkstage.upgrades[4], 0, 1, EffectTypes.UpgradeIncreaseAddition, null, (obj) => "Acceleration Boost Power +" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e1100", "1e5"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu25", "Multiplication", 25, new AchievementRequirement("1nucleonize"), new LinearEffect(player.quarkstage.upgrades[9], 0, 1, EffectTypes.UpgradeIncreaseAddition, null, (obj) => "Multiplication Boost Power +" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e1250", "1e5"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu26", "Score Increase", 100, new AchievementRequirement("1nucleonize"), new ExponentialEffect(getchallenges(0, 4), 1e10, 1.25, EffectTypes.UpgradeIncreaseAddition, null, (obj) => "Challenges 1-4 Score *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e1000", "1e10"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu27", "Another One", 100, new AchievementRequirement("1nucleonize"), new ExponentialEffect(getchallenges(4, 9), 1, 1.25, EffectTypes.UpgradeIncreaseAddition, null, (obj) => "Challenges 5-8 Score *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e1500", "1e10"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu28", "Multron Time", 1000, new AchievementRequirement("1nucleonize"), new LinearEffect(player.quarkstage.upgrades[5], 1, .0001, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Multron Power *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e1500", "1.5"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu29", "Acceleration Time", 500, new AchievementRequirement("1nucleonize"), new ExponentialEffect(player.quarkstage.upgrades[2], 1, 1.25, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Accelerator Power *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e1600", "1e10"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu30", "Free, the Boost", 25, new AchievementRequirement("1nucleonize"), new LinearEffect(player.nucleonstage.freeelectronproducers, 2.5, .1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Free Electron Production *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e2000", "1e10"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu31", "Gluon, the Boost", 25, new AchievementRequirement("1nucleonize"), new LinearEffect(player.nucleonstage.gluonproducers, 2.5, .1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Gluon Production *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e2500", "1e10"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu32", "Charge, the Boost", 25, new AchievementRequirement("1nucleonize"), new LinearEffect(player.nucleonstage.electronchargeproducers, 2.5, .1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Electron Charge Production *" + formatDecimal(obj.value) + "(*" + formatDecimal(obj.increase) + ")"), new ExponentialCost(player.electronstage.electrons, "1e3000", "1e10"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu33", "Free, Boost", 1, new AchievementRequirement("1nucleonize"), new StaticEffect(player.nucleonstage.freeelectrons, 1.5, EffectTypes.UpgradeValuePower, null, (obj) => "Free Electron Effect ^" + formatDecimal(obj.value)), new ExponentialCost(player.electronstage.electrons, "1e5000", "1e10"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu34", "Gluon, Boost", 1, new AchievementRequirement("1nucleonize"), new StaticEffect(player.nucleonstage.gluons, 1.5, EffectTypes.UpgradeValuePower, null, (obj) => "Gluon Effect ^" + formatDecimal(obj.value)), new ExponentialCost(player.electronstage.electrons, "1e7500", "1e10"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu35", "Charge, Boost", 1, new AchievementRequirement("1nucleonize"), new StaticEffect(player.nucleonstage.electroncharge, 1.5, EffectTypes.UpgradeValuePower, null, (obj) => "Electron Charge Effect ^" + formatDecimal(obj.value)), new ExponentialCost(player.electronstage.electrons, "1e10000", "1e10"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu36", "Quarks!!!!", 1, new AchievementRequirement("1nucleonize"), new StaticEffect(player.quarkstage.producers, 1e100, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Production *" + formatDecimal(obj.value)), new StaticCost(player.electronstage.electrons, "1e15000"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu37", "Quark Spin!!!!", 1, new AchievementRequirement("1nucleonize"), new StaticEffect(player.electronstage.quarkspinproducers, 1e100, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Spin Production *"), new StaticCost(player.electronstage.electrons, "1e20000"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu38", "Electrons!!!!", 1, new AchievementRequirement("1nucleonize"), new StaticEffect(player.quarkstage.electrify, 1e100, EffectTypes.PrestigeMultiplicativeGain, null, (obj) => "Electron Gain *" + formatDecimal(obj.value)), new StaticCost(player.electronstage.electrons, "1e25000"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu39", "Electrons!!!!", 1, new AchievementRequirement("1nucleonize"), new StaticEffect(player.electronstage.nucleonize, 100, EffectTypes.PrestigeMultiplicativeGain, null, (obj) => "Nucleon Gain *" + formatDecimal(obj.value)), new StaticCost(player.electronstage.electrons, "1e35000"), "upg", {tag : "e"}));
  player.electronstage.upgrades.push(new Upgrade("eu40", "Electrons!!!!", 1, new AchievementRequirement("1nucleonize"), new StaticEffect(player.electronstage.nucleonize,1.05, EffectTypes.PrestigeExponentialGain, null, (obj) => "Nucelon Gain ^" + formatDecimal(obj.value)), new StaticCost(player.electronstage.electrons, "1e50000"), "upg", {tag : "e"}));
}

//Setting up the basic quark spin upgrades
function setupbasicquarkspinupgrades() {
  player.electronstage.quarkspinupgrades = [];
  player.electronstage.quarkspinupgrades.push(new Upgrade("su1", "Respinner", -1, null, [new ExponentialEffect(player.electronstage.quarkspinproducers, 1, 1.1, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Respinner Power *" + formatDecimalOverride(obj.increase, 1) + " | Quark Spin Producers *" + formatDecimalOverride(obj.value, 2))], new CombinedCost([new ExponentialCost(player.electronstage.quarkspin, "1e3", 5),new HyperExponentialCost(player.electronstage.quarkspin, "1e150", "10", 2)], [100]), "qsp", new AchievementRequirement("infinityquarks")));
  player.electronstage.quarkspinupgrades.push(new Upgrade("su2", "Aceleron Plus", -1, null, [new LinearEffect(player.quarkstage.upgrades[0], 1, .5, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Acceleron Power +" + formatDecimalOverride(obj.increase, 1) + " | Acceleron power *" + formatDecimalOverride(obj.value, 1))], [new ExponentialCost(player.electronstage.quarkspin, "1e6", 10)], "qsp", new AchievementRequirement("infinityquarks")));
  player.electronstage.quarkspinupgrades.push(new DiminishingUpgrade("su3", "Multor Plus", -1, null, [new LinearEffect(player.quarkstage.upgrades[5], 1, .001, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Multor Power +" + formatDecimalOverride(obj.increase, 3) + " | Multor power *" + formatDecimalOverride(obj.value, 3))], new CombinedCost([new ExponentialCost(player.electronstage.quarkspin, "1e8", 10),new HyperExponentialCost(player.electronstage.quarkspin, "1e250", "100", 6)], [100]), "qsp", 100, (num) => Decimal.pow(num, .1), new AchievementRequirement("infinityquarks")));
  player.electronstage.quarkspinupgrades.push(new Upgrade("su4", "Better Challenges", -1, null, [new ExponentialEffect([player.challenges[0], player.challenges[1], player.challenges[2], player.challenges[3]], 1, 1.1, EffectTypes.ChallengeScoreMult, null, (obj) => "Challenge 1-4 Score *" + formatDecimalOverride(obj.value, 2))], new CombinedCost([new ExponentialCost(player.electronstage.quarkspin, "1e12", "100"), new HyperExponentialCost(player.electronstage.quarkspin, "1e600", "1e5", 5)], 100), "qsp", new AchievementRequirement("infinityquarks")));
}

//First basic setup of the electron cloud
function setupbasicelectroncloud() {
  player.electronstage.clouds = {};
  player.electronstage.clouds.power = new AppliableUpgrade("electronpower", "Electron Power", -1, null, null, new ExponentialCost(player.electronstage.electrons, "1e16", 10), "epower");

  player.electronstage.clouds.orbitals = [];
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("1s", "Orbital 1S", new ExponentialEffect(player.quarkstage.producers, 1, 2, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Production *" + formatDecimalNormal(obj.value) + "(*" + formatDecimal(obj.increase, 1) + ")"), new ExponentialCost(null, "10", "2.5"), player.electronstage.clouds.power));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("2s", "Orbital 2S", new ExponentialEffect(player.quarkstage.electrify, 1, 1.005, EffectTypes.PrestigeExponentialGain, null, (obj) => "Electron gain ^" + formatDecimalOverride(obj.value, 3) + " (*" + formatDecimalOverride(obj.increase, 3) + ")"), new ExponentialCost(null, "1e3", "5"), player.electronstage.clouds.power, new NumRequirement(player.electronstage.electrons, "1e18")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("2p", "Orbital 2P", new ExponentialEffect(player.challenges, 1, 1.05, EffectTypes.ChallengeScoreMult, null, (obj) => "All Challenges Score *" + formatDecimalOverride(obj.value, 2) + " (*" + formatDecimalOverride(obj.increase, 2) + ")"), new ExponentialCost(null, "1e3", "5"), player.electronstage.clouds.power, new ChallengeScoreRequirement(() => player.challenges[0], 1e30)));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("3s", "Orbital 3S", new ExponentialEffect(player.electronstage.quarkspinproducers, 1, 2, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Spin Production *" + formatDecimalNormal(obj.value) + " (*" + formatDecimal(obj.increase, 1) + ")"), new ExponentialCost(null, "500", "2.5"), player.electronstage.clouds.power, new NumRequirement(player.electronstage.quarkspinproducers[4], "10")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("3p", "Orbital 3P", new ExponentialEffect(player.electronstage.clouds.power, 1, 1.5, EffectTypes.UpgradeAmountMultiplier, null, (obj) => "Electron Power Amount *" + formatDecimalOverride(obj.value, 1) + "(*" + formatDecimal(obj.increase, 1) + ")"), new ExponentialCost(null, "1e2", "10"), player.electronstage.clouds.power, new TotalNumRequirement(player.electronstage.clouds.power, "10")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("4s", "Orbital 4S", new ExponentialEffect(player.quarkstage.upgrades[5], 1, 1.01, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Multor Power *" + formatDecimalOverride(obj.value, 2) + "(*" + formatDecimalOverride(obj.increase, 2) + ")"), new ExponentialCost(null, "1e2", "5"), player.electronstage.clouds.power, new NumRequirement(getupgrade("qu5"), "80")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("3d", "Orbital 3D", new LinearEffect(player.quarkstage.upgrades[5], 0, 5, EffectTypes.UpgradeBonusLevels, null, (obj) => "Free Multors " + formatDecimal(obj.value, 0) + "(+" + formatDecimal(obj.increase, 0) + ")"), new ExponentialCost(null, "1e3", "2.5"), player.electronstage.clouds.power, new NumRequirement(getupgrade("qu9"), "25")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("4p", "Orbital 4P", new ExponentialEffect(player.quarkstage.producers, 1, .99, EffectTypes.PriceScaling, null, (obj) => "Quark Producer Cost Scaling *" + formatDecimalOverride(obj.value, 2) + "(*" + formatDecimalOverride(obj.increase, 2) + ")"), new ExponentialCost(null, "1e3", "1e1"), player.electronstage.clouds.power, new AchievementRequirement("100multor")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("5s", "Orbital 5S", new ExponentialEffect(player.quarkstage.upgrades, 1, .99, EffectTypes.PriceScaling, null, (obj) => "Quark Producers Upgrades Cost Scaling *" + formatDecimalOverride(obj.value, 2) + "(*" + formatDecimalOverride(obj.increase, 2) + ")"), new ExponentialCost(null, "1e3", "1e1"), player.electronstage.clouds.power, new AchievementRequirement("100multor")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("4d", "Orbital 4D", new ExponentialEffect(player.electronstage.quarkspinproducers, 1, .99, EffectTypes.PriceScaling, null, (obj) => "Quark Spin Producers Cost Scaling *" + formatDecimalOverride(obj.value, 2) + "(*" + formatDecimalOverride(obj.increase, 2) + ")"), new ExponentialCost(null, "1e3", "1e1"), player.electronstage.clouds.power, new AchievementRequirement("100multor")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("5p", "Orbital 5P", new ExponentialEffect(player.electronstage.quarkspinupgrades, 1, .99, EffectTypes.PriceScaling, null, (obj) => "Quark Spin Upgrades Cost Scaling *" + formatDecimalOverride(obj.value, 2) + "(*" + formatDecimalOverride(obj.increase, 2) + ")"), new ExponentialCost(null, "1e3", "1e1"), player.electronstage.clouds.power, new AchievementRequirement("100multor")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("6s", "Orbital 6S", new ExponentialEffect(player.quarkstage.upgrades, 1, 1.01, EffectTypes.UpgradeAmountMultiplier, null, (obj) => "Quark Producers Upgrades Effective Amount *" + formatDecimalOverride(obj.value, 2) + "(*" + formatDecimalOverride(obj.increase, 2) + ")"), new ExponentialCost(null, "1e3", "1e1"), player.electronstage.clouds.power, new NumRequirement(getcurrency("electron"), "1e20")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("4f", "Orbital 4F", new LinearEffect(player.challenges, 1, .001, EffectTypes.ChallengeScoreMult, null, (obj) => "Challenge Score *" + formatDecimalOverride(obj.value, 3) + "(+" + formatDecimalOverride(obj.increase, 3) + ")"), new ExponentialCost(null, "1e9", "2"), player.electronstage.clouds.power, new AchievementRequirement("1nucleonize")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("5d", "Orbital 5D", new LinearEffect(player.electronstage.clouds.power, 1, .001, EffectTypes.ChallengeScoreMult, null, (obj) => "Electron Power Amount *" + formatDecimalOverride(obj.value, 3) + "(+" + formatDecimalOverride(obj.increase, 3) + ")"), new ExponentialCost(null, "1e9", "2"), player.electronstage.clouds.power, new AchievementRequirement("1nucleonize")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("6p", "Orbital 6P", new LinearEffect(player.quarkstage.producers, 1, .01, EffectTypes.ChallengeScoreMult, null, (obj) => "Quark Production *" + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) + ")"), new ExponentialCost(null, "1e9", "2"), player.electronstage.clouds.power, new AchievementRequirement("1nucleonize")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("7s", "Orbital 7S", new LinearEffect(player.electronstage.quarkspinproducers, 1, .01, EffectTypes.ProducerMultiplierProduction, null, (obj) => "Quark Spin Production *" + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) + ")"), new ExponentialCost(null, "1e3", "2"), player.electronstage.clouds.power, new AchievementRequirement("1nucleonize")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("5f", "Orbital 5F", new LinearEffect(player.quarkstage.electrify, 1, .01, EffectTypes.PrestigeMultiplicativeGain, null, (obj) => "Electron Gain *" + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) + ")"), new ExponentialCost(null, "1e9", "2"), player.electronstage.clouds.power, new AchievementRequirement("1nucleonize")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("6d", "Orbital 6D", new LinearEffect(player.quarkstage.upgrades[0], 1, 1, EffectTypes.UpgradeIncreaseMultiplier, null, (obj) => "Acceleron Power *" + formatDecimalOverride(obj.value, 0) + "(+" + formatDecimalOverride(obj.increase, 0) + ")"), new ExponentialCost(null, "1e9", "2"), player.electronstage.clouds.power, new AchievementRequirement("1nucleonize")));
  player.electronstage.clouds.orbitals.push(new AppliedToUpgrade("7p", "Orbital 7P", new LinearEffect(player.electronstage.nucleonize, 1, .1, EffectTypes.PrestigeMultiplicativeGain, null, (obj) => "Nucleon Gain *" + formatDecimalOverride(obj.value, 2) + "(+" + formatDecimalOverride(obj.increase, 2) + ")"), new ExponentialCost(null, "1e24", "100"), player.electronstage.clouds.power, new AchievementRequirement("1nucleonize")));
}

function resetElectronStage(hard) {
  player.electronstage.electrons.reset();
  player.electronstage.upgrades.forEach((upgrade, i) => {
    upgrade.reset();
  });
  player.electronstage.quarkspin.reset();
  player.electronstage.quarkspinproducers.forEach((prod, i) => {
    prod.reset(hard);
  });
  player.electronstage.quarkspinupgrades.forEach((prod, i) => {
    prod.reset(hard);
  });
  player.electronstage.clouds.power.reset();
  player.electronstage.clouds.orbitals.forEach((up, i) => {
    up.reset();
  });
  updateeffects();
}

function arrayexcluding(array, ...indexes) {
  var output = [];
  array.forEach((val, i) => {
    if (indexes.indexOf(i) == -1) {
      output.push(val);
    }
  });
  return output;
}