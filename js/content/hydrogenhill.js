function setuphydrogenhill(){
    player.nucleonstage.hydrogenhill = {};
    player.nucleonstage.hydrogenhill.primedproton = new Currency("primedproton", "Primed Proton", 0);

    player.nucleonstage.hydrogenhill.primedprotonproducers = [];
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp1", "Prime Proton Producer 1", new ExponentialCost(player.nucleonstage.split.protons, "1e20", "1e20"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedproton, 1),new LinearProduction(player.nucleonstage.split.protons, -1e40)], null, "pppbuy", null, true));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp2", "Prime Proton Producer 2", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e3", "5"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[0], 1)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp3", "Prime Proton Producer 3", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e6", "100"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[1], 1)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp4", "Prime Proton Producer 4", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e9", "1e3"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[2], 1)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp5", "Prime Proton Producer 5", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e12", "1e4"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[3], 1)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp6", "Prime Proton Producer 6", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e24", "1e6"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[4], 1)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp7", "Prime Proton Producer 7", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e48", "1e8"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[5], 1)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp8", "Prime Proton Producer 8", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e100", "1e10"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[6], 1)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp9", "Prime Proton Producer 9", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e250", "1e25"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[7], 1)], null, "pppbuy", null));
    player.nucleonstage.hydrogenhill.primedprotonproducers.push(new Producer("ppp10", "Prime Proton Producer 10", new ExponentialCost(player.nucleonstage.hydrogenhill.primedproton, "1e500", "1e50"), [new LinearProduction(player.nucleonstage.hydrogenhill.primedprotonproducers[8], 1)], null, "pppbuy", null));
    
    var hydmult = (amount) => {
        if (amount.lessThanOrEqualTo("1e40"))
            return new Decimal(1);
        var num = Decimal.pow(amount.divide("1e40"), 1 / 2).add(5);
        return num;
    }

    player.nucleonstage.hydrogenhill.hydrogen = new Upgrade("hydrogen", "Hydrogen", 0, null, new FunctionEffect(player.nucleonstage.hydrogenhill.primedprotonproducers, EffectTypes.ProducerMultiplierProduction, hydmult, (obj) => "You have " + formatDecimalNormal(obj.amount) + " Hydrogen, providing a x" + formatDecimal(obj.value) + " production boost to Primed Proton Producers."), null, null, {getsproduced : true});

    var hydrogengain = (amount) => {
        return amount;
    }

    player.nucleonstage.hydrogenhill.createprotons = new Prestige("protonfusion", "Proton Fusion", () => {}, () => {}, new NumRequirement(getcurrency("primedproton"), "1e40"), new PrestigeReward(player.nucleonstage.hydrogenhill.hydrogen, player.nucleonstage.hydrogenhill.primedproton, hydrogengain));

    player.nucleonstage.hydrogenhill.primedprtonupgrades = [];

    player.nucleonstage.hydrogenhill.mound = [];

    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[0].currency = new ExponentialGrowingCappedCurrency("h2", "Dueterium (H-2)", 1, 1.1, 1000, null, new AchievementRequirement("1e40hydrogen"));  
    h2dim = new FunctionEffect(getproducer("h2"), EffectTypes.ProductionMultiplier, () => {if(getproducer("h2").amount.lessThan(1e40)) return new Decimal(1); return new Decimal(1).divide(Decimal.pow(getproducer("h2").amount.divide("1e40"), 1/25))}, (obj) => "H-2 Replicator Power *" + formatDecimalOverride(obj.value, 2));
    h2dim.apply();
    getproducer("h2").addbasedeffect(h2dim);
    player.nucleonstage.hydrogenhill.mound[0].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[0].upgrades.push(new Upgrade("h2cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h2"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h2"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[0].upgrades.push(new Upgrade("h2prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h2"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new HyperExponentialCost(getproducer("h2"), "1e5", 10, 1.1)));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[1].currency = new ExponentialGrowingCappedCurrency("h3", "Tritium (H-3)", 1, 1.075, 1000, null, new AchievementRequirement("1e40h2"));  
    h3dim = new FunctionEffect(getproducer("h3"), EffectTypes.ProductionMultiplier, () => {if(getproducer("h3").amount.lessThan(1e40)) return new Decimal(1); return new Decimal(1).divide(Decimal.pow(getproducer("h3").amount.divide("1e40"), 1/25))}, (obj) => "H-3 Replicator Power *" + formatDecimalOverride(obj.value, 2));
    h3dim.apply();
    getproducer("h3").addbasedeffect(h3dim);
    player.nucleonstage.hydrogenhill.mound[1].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[1].upgrades.push(new Upgrade("h3cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h3"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h3"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[1].upgrades.push(new Upgrade("h3prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h3"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h3"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[2].currency = new ExponentialGrowingCappedCurrency("h4", "Quatium (H-4)", 1, 1.06, 1000, null, new AchievementRequirement("1e40h3"));
    h4dim = new FunctionEffect(getproducer("h4"), EffectTypes.ProductionMultiplier, () => {if(getproducer("h4").amount.lessThan(1e40)) return new Decimal(1); return new Decimal(1).divide(Decimal.pow(getproducer("h4").amount.divide("1e40"), 1/25))}, (obj) => "H-4 Replicator Power *" + formatDecimalOverride(obj.value, 2));
    h4dim.apply();
    getproducer("h4").addbasedeffect(h4dim);
    player.nucleonstage.hydrogenhill.mound[2].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[2].upgrades.push(new Upgrade("h4cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h4"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h4"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[2].upgrades.push(new Upgrade("h4prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h4"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h4"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[3].currency = new ExponentialGrowingCappedCurrency("h5", "Qintium (H-5)", 1, 1.055, 1000, null, new AchievementRequirement("1e40h4"));
    h5dim = new FunctionEffect(getproducer("h5"), EffectTypes.ProductionMultiplier, () => {if(getproducer("h5").amount.lessThan(1e40)) return new Decimal(1); return new Decimal(1).divide(Decimal.pow(getproducer("h5").amount.divide("1e40"), 1/25))}, (obj) => "H-5 Replicator Power *" + formatDecimalOverride(obj.value, 2));
    h5dim.apply();
    getproducer("h5").addbasedeffect(h5dim);
    player.nucleonstage.hydrogenhill.mound[3].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[3].upgrades.push(new Upgrade("h5cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h5"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h5"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[3].upgrades.push(new Upgrade("h5prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h5"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h5"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[4].currency = new ExponentialGrowingCappedCurrency("h6", "Septium (H-6)", 1, 1.05, 1000, null, new AchievementRequirement("1e40h5"));
    h6dim = new FunctionEffect(getproducer("h6"), EffectTypes.ProductionMultiplier, () => {if(getproducer("h6").amount.lessThan(1e40)) return new Decimal(1); return new Decimal(1).divide(Decimal.pow(getproducer("h6").amount.divide("1e40"), 1/25))}, (obj) => "H-6 Replicator Power *" + formatDecimalOverride(obj.value, 2));
    h6dim.apply();
    getproducer("h6").addbasedeffect(h6dim);
    player.nucleonstage.hydrogenhill.mound[4].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[4].upgrades.push(new Upgrade("h6cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h6"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h6"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[4].upgrades.push(new Upgrade("h6prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h6"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h6"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[5].currency = new ExponentialGrowingCappedCurrency("h7", "Heptium (H-7)", 1, 1.045, 1000, null, new AchievementRequirement("1e40h6"));
    h7dim = new FunctionEffect(getproducer("h7"), EffectTypes.ProductionMultiplier, () => {if(getproducer("h7").amount.lessThan(1e40)) return new Decimal(1); return new Decimal(1).divide(Decimal.pow(getproducer("h7").amount.divide("1e40"), 1/25))}, (obj) => "H-7 Replicator Power *" + formatDecimalOverride(obj.value, 2));
    h7dim.apply();
    getproducer("h7").addbasedeffect(h7dim);
    player.nucleonstage.hydrogenhill.mound[5].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[5].upgrades.push(new Upgrade("h7cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h7"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h7"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[5].upgrades.push(new Upgrade("h7prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h7"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h7"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[6].currency = new ExponentialGrowingCappedCurrency("h8", "Octium (H-8)", 1, 1.04, 1000, null, new AchievementRequirement("1e40h7"));
    h8dim = new FunctionEffect(getproducer("h8"), EffectTypes.ProductionMultiplier, () => {if(getproducer("h8").amount.lessThan(1e40)) return new Decimal(1); return new Decimal(1).divide(Decimal.pow(getproducer("h8").amount.divide("1e40"), 1/25))}, (obj) => "H-8 Replicator Power *" + formatDecimalOverride(obj.value, 2));
    h8dim.apply();
    getproducer("h8").addbasedeffect(h8dim);
    player.nucleonstage.hydrogenhill.mound[6].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[6].upgrades.push(new Upgrade("h8cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h8"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h8"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[6].upgrades.push(new Upgrade("h8prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h8"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h8"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[7].currency = new ExponentialGrowingCappedCurrency("h9", "Nonium (H-9)", 1, 1.035, 1000, null, new AchievementRequirement("1e40h8"));
    h9dim = new FunctionEffect(getproducer("h9"), EffectTypes.ProductionMultiplier, () => {if(getproducer("h9").amount.lessThan(1e40)) return new Decimal(1); return new Decimal(1).divide(Decimal.pow(getproducer("h9").amount.divide("1e40"), 1/25))}, (obj) => "H-9 Replicator Power *" + formatDecimalOverride(obj.value, 2));
    h9dim.apply();
    getproducer("h9").addbasedeffect(h9dim);
    player.nucleonstage.hydrogenhill.mound[7].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[7].upgrades.push(new Upgrade("h9cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h9"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h9"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[7].upgrades.push(new Upgrade("h9prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h9"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h9"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[8].currency = new ExponentialGrowingCappedCurrency("h10", "Decium (H-10)", 1, 1.03, 1000, null, new AchievementRequirement("1e40h9"));
    h10dim = new FunctionEffect(getproducer("h10"), EffectTypes.ProductionMultiplier, () => {if(getproducer("h10").amount.lessThan(1e40)) return new Decimal(1); return new Decimal(1).divide(Decimal.pow(getproducer("h10").amount.divide("1e40"), 1/25))}, (obj) => "H-10 Replicator Power *" + formatDecimalOverride(obj.value, 2));
    h10dim.apply();
    getproducer("h10").addbasedeffect(h10dim);
    player.nucleonstage.hydrogenhill.mound[8].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[8].upgrades.push(new Upgrade("h10cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h10"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h10"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[8].upgrades.push(new Upgrade("h10prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h10"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h10"), (amt) => Decimal.pow(5, amt))));
    
    player.nucleonstage.hydrogenhill.mound.push({});
    player.nucleonstage.hydrogenhill.mound[9].currency = new ExponentialGrowingCappedCurrency("h11", "Endium (H-11)", 1, 1.025, 1000, null, new AchievementRequirement("1e40h10"));
    h11dim = new FunctionEffect(getproducer("h11"), EffectTypes.ProductionMultiplier, () => {if(getproducer("h11").amount.lessThan(1e40)) return new Decimal(1); return new Decimal(1).divide(Decimal.pow(getproducer("h11").amount.divide("1e40"), 1/25))}, (obj) => "H-11 Replicator Power *" + formatDecimalOverride(obj.value, 2));
    h11dim.apply();
    getproducer("h11").addbasedeffect(h11dim);
    player.nucleonstage.hydrogenhill.mound[9].upgrades = [];
    player.nucleonstage.hydrogenhill.mound[9].upgrades.push(new Upgrade("h3cap", "Increase Cap", -1, null, new FunctionEffect(getproducer("h11"), EffectTypes.CapacityMultiplier, (lvl) => Decimal.pow(10, 2*lvl), () => "Cap Increase" ), new FunctionCost(getproducer("h11"), (amt) => Decimal.pow(10, amt*2).times(1e3))));
    player.nucleonstage.hydrogenhill.mound[9].upgrades.push(new Upgrade("h3prod", "Increase Production", -1, null, new FunctionEffect(getproducer("h11"), EffectTypes.ProductionMultiplier, (lvl) => Decimal.pow(lvl, 1/2), () => "Prod Increase" ), new FunctionCost(getproducer("h11"), (amt) => Decimal.pow(5, amt))));
}

function resethydrogenmounds(hard){
    player.nucleonstage.hydrogenhill.mound.forEach(elem => {
        elem.currency.reset(hard);
        elem.upgrades.forEach(el =>{
            el.reset(hard);
        });
    });
}