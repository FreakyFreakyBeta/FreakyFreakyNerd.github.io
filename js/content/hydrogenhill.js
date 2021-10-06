function setuphydrogenhill(){
    player.nucleonstage.hydrogenhill = {};
    player.nucleonstage.hydrogenhill.primedproton = new Currency("primedproton", "Primed Proton", 0);

    player.nucleonstage.hydrogenhill.primedprotonproducers = [];
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp1", "Prime Proton Producer 1", new ExponentialCost(player.nucleonstage.split.protons, "1e20", "1e40"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedproton, 1),new LinearProduction(player.nucleonstage.split.protons, -.01)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp2", "Prime Proton Producer 2", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e4", "10"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[0], .01)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp3", "Prime Proton Producer 3", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e24", "100"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[1], .01)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp4", "Prime Proton Producer 4", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e56", "1e4"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[2], .01)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp5", "Prime Proton Producer 5", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e120", "1e8"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[3], .01)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp6", "Prime Proton Producer 6", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e240", "1e12"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[4], .01)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp7", "Prime Proton Producer 7", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e240", "1e12"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[5], .01)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp8", "Prime Proton Producer 8", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e240", "1e12"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[6], .01)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp9", "Prime Proton Producer 9", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e240", "1e12"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[7], .01)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp10", "Prime Proton Producer 10", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e240", "1e12"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[8], .01)], null, "pppbuy", null));
    
    player.nucleonstage.hydrogenhill.hydrogen = new Currency("hydrogen", "Hydrogen", 0);

    player.nucleonstage.hydrogenhill.createprotons = new Prestige("protonfusion", "Proton Fusion", () => {}, () => {}, new NumRequirement(getcurrency("primedproton"), "1e120"));

    player.nucleonstage.hydrogenhill.primedprtonupgrades = [];

    player.nucleonstage.hydrogenhill.mound = [];

    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[0].currency = new ExponentialGrowingCappedCurrency("h2", "Dueterium (H-2)", 1, 1.1, 1000);
    player.nucleonstage.hydrogenhill.mound[0].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[0].upgrades.push(new Upgrade("h2cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h2"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h2"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[0].upgrades.push(new Upgrade("h2prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h2"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h2"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[1].currency = new ExponentialGrowingCappedCurrency("h3", "Tritium (H-3)", 1, 1.075, 1000);
    player.nucleonstage.hydrogenhill.mound[1].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[1].upgrades.push(new Upgrade("h3cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h3"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h3"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[1].upgrades.push(new Upgrade("h3prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h3"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h3"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[2].currency = new ExponentialGrowingCappedCurrency("h4", "Quatium (H-4)", 1, 1.06, 1000);
    player.nucleonstage.hydrogenhill.mound[2].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[2].upgrades.push(new Upgrade("h3cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h4"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h4"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[2].upgrades.push(new Upgrade("h3prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h4"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h4"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[3].currency = new ExponentialGrowingCappedCurrency("h5", "Qintium (H-5)", 1, 1.055, 1000);
    player.nucleonstage.hydrogenhill.mound[3].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[3].upgrades.push(new Upgrade("h3cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h5"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h5"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[3].upgrades.push(new Upgrade("h3prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h5"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h5"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[4].currency = new ExponentialGrowingCappedCurrency("h6", "Septium (H-6)", 1, 1.05, 1000);
    player.nucleonstage.hydrogenhill.mound[4].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[4].upgrades.push(new Upgrade("h3cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h6"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h6"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[4].upgrades.push(new Upgrade("h3prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h6"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h6"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[5].currency = new ExponentialGrowingCappedCurrency("h7", "Heptium (H-7)", 1, 1.045, 1000);
    player.nucleonstage.hydrogenhill.mound[5].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[5].upgrades.push(new Upgrade("h3cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h7"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h7"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[5].upgrades.push(new Upgrade("h3prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h7"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h7"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[6].currency = new ExponentialGrowingCappedCurrency("h8", "Octium (H-8)", 1, 1.04, 1000);
    player.nucleonstage.hydrogenhill.mound[6].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[6].upgrades.push(new Upgrade("h3cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h8"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h8"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[6].upgrades.push(new Upgrade("h3prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h8"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h8"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[7].currency = new ExponentialGrowingCappedCurrency("h9", "Nonium (H-9)", 1, 1.035, 1000);
    player.nucleonstage.hydrogenhill.mound[7].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[7].upgrades.push(new Upgrade("h3cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h9"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h9"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[7].upgrades.push(new Upgrade("h3prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h9"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h9"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[8].currency = new ExponentialGrowingCappedCurrency("h10", "Decium (H-10)", 1, 1.03, 1000);
    player.nucleonstage.hydrogenhill.mound[8].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[8].upgrades.push(new Upgrade("h3cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h10"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h10"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[8].upgrades.push(new Upgrade("h3prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h10"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h10"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[9].currency = new ExponentialGrowingCappedCurrency("h11", "Endium (H-11)", 1, 1.025, 1000);
    player.nucleonstage.hydrogenhill.mound[9].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[9].upgrades.push(new Upgrade("h3cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h11"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h11"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[9].upgrades.push(new Upgrade("h3prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h11"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h11"), (amt) => Decimal.pow(5, amt))));
}