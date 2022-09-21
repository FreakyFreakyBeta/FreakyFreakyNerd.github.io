function achievementlabel(row, upgrade, name){
  return "[a" + (row+1) + "x" + (upgrade+1) + "] " + name;
}

function setupachievements() {
  player.achievements.points = 0;

  player.achievements.basic = [];
  //Bought Chargers
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("onequarkgenone", "Create A whopping 1 Charger", [new NumRequirement(player.quarkstage.producers[0], 1)], null, null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("10quarkgenone", "A little better, now at 10 Chargers", [new NumRequirement(player.quarkstage.producers[0], 10)], new AchievementRequirement("onequarkgenone"), [new UnlockLogEffect("Spinner Quark Producer"), new UnlockLogEffect("Quark Upgrade that boosts Charger")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("100quarkgenone", "I need the powah!", [new NumRequirement(player.quarkstage.producers[0], 100)], new AchievementRequirement("10quarkgenone"), [new UnlockLogEffect("Acceleron Quark Boost")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e3quarkgenone", "Wo! Calm down. ;)", [new NumRequirement(player.quarkstage.producers[0], 1e3)], new AchievementRequirement("100quarkgenone"), new StaticEffect(player.quarkstage.producers[0], 10, EffectTypes.ProducerMultiplierProduction, null, "Charger Production x10"), null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e5quarkgenone", "Getting A large amount.", [new NumRequirement(player.quarkstage.producers[0], "1e5")], new AchievementRequirement("1e3quarkgenone"), [], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e7quarkgenone", "Good Luck Buddy.", [new NumRequirement(player.quarkstage.producers[0], "1e7")], new AchievementRequirement("1e5quarkgenone"), [new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, () => Decimal.pow(player.quarkstage.producers[0].amount, 2), (obj) => "Quark Production Multiplier Based on Bought Chargers | Currently *" + formatDecimalNormal(obj.value))], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e10quarkgenone", "Ok Ok. A for effort and effect.", [new NumRequirement(player.quarkstage.producers[0], "1e10")], new AchievementRequirement("1e7quarkgenone"), [new FunctionEffect(player.quarkstage.producers[0], EffectTypes.ProducerMultiplierProduction, () => Decimal.pow(player.achievements.points, Decimal.log(player.achievements.points, 2)), (obj) => "Charger Production Multiplier Based on Achievment Points | Currently *" + formatDecimalNormal(obj.value))], null, getbasictag(), 100));

  //Bought Spinners
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("onequarkgentwo", "The Spinner is better yah? Go ahead and purchase 1.", [new NumRequirement(player.quarkstage.producers[1], 1)], new AchievementRequirement("onequarkgenone"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("10quarkgentwo", "Whats better than 1 spinner? 10 Spinners!", [new NumRequirement(player.quarkstage.producers[1], 10)], new AchievementRequirement("onequarkgentwo"), [new UnlockLogEffect("Flipper Quark Producer"), new UnlockLogEffect("Quark Upgrade that boosting Spinner")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("100quarkgentwo", "Get in that spinning craze!", [new NumRequirement(player.quarkstage.producers[1], 100)], new AchievementRequirement("10quarkgentwo"), [new UnlockLogEffect("Multor Quark Boost")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e3quarkgentwo", "You spin me right round, right round!", [new NumRequirement(player.quarkstage.producers[1], 1e3)], new AchievementRequirement("100quarkgentwo"), new StaticEffect(player.quarkstage.producers[1], 10, EffectTypes.ProducerMultiplierProduction, null, "Spinner Production x10"), null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e5quarkgentwo", "Keep at it, eventually your brains will spin out.", [new NumRequirement(player.quarkstage.producers[1], "1e5")], new AchievementRequirement("1e3quarkgentwo"), [new FlavorEffect("Something Sometime.")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e7quarkgentwo", "Just kidding but keep on spinning!", [new NumRequirement(player.quarkstage.producers[1], "1e7")], new AchievementRequirement("1e5quarkgentwo"), [new FlavorEffect("Something Sometime.")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e10quarkgentwo", "Like this will ever happen.", [new NumRequirement(player.quarkstage.producers[1], "1e10")], new AchievementRequirement("1e7quarkgentwo"), [new FunctionEffect(player.quarkstage.producers[1], EffectTypes.ProducerMultiplierProduction, () => Decimal.pow(player.achievements.points, Decimal.log(player.achievements.points, 2)), (obj) => "Spinner Production Multiplier Based on Achievment Points | Currently *" + formatDecimalNormal(obj.value))], null, getbasictag(), 100));

  //Bought Flipper
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("onequarkgenthree", "Go and flip some burgers, a Flipper will be useful.", [new NumRequirement(player.quarkstage.producers[2], 1)], new AchievementRequirement("onequarkgentwo"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("10quarkgenthree", "The business is growing, get 10 Flippers.", [new NumRequirement(player.quarkstage.producers[2], 10)], new AchievementRequirement("onequarkgenthree"), [new UnlockLogEffect("Charmer Quark Producer"), new UnlockLogEffect("Quark Upgrade that boosting Flipper")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("100quarkgenthree", "Flipping all day every day.", [new NumRequirement(player.quarkstage.producers[2], 100)], new AchievementRequirement("10quarkgenthree"), [new LinkedLinearEffect(player.quarkstage.upgrades[0], () => { return Decimal.floor(player.quarkstage.producers[2].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => { return "Get 1 free Acceleron per 100 Flippers bought." })], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e3quarkgenthree", "Flip it and slap it!", [new NumRequirement(player.quarkstage.producers[2], 1e3)], new AchievementRequirement("100quarkgenthree"), [new UnlockLogEffect("Flipper Quark Proucer autobuyer")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e5quarkgenthree", "Uptown flip.", [new NumRequirement(player.quarkstage.producers[2], "1e5")], new AchievementRequirement("1e3quarkgenthree"), [new FlavorEffect("Something Sometime.")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e7quarkgenthree", "What about the opposite flip, flop?", [new NumRequirement(player.quarkstage.producers[2], "1e7")], new AchievementRequirement("1e5quarkgenthree"), [new FlavorEffect("Something Sometime.")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e10quarkgenthree", "I no longer doubt your power.", [new NumRequirement(player.quarkstage.producers[2], "1e10")], new AchievementRequirement("1e7quarkgenthree"), [new FunctionEffect(player.quarkstage.producers[2], EffectTypes.ProducerMultiplierProduction[2], () => Decimal.pow(player.achievements.points, Decimal.log(player.achievements.points, 2)), (obj) => "Flipper Production Multiplier Based on Achievment Points | Currently *" + formatDecimalNormal(obj.value))], null, getbasictag(), 100));

  //Bought Charmer
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("onequarkgenfour", "Get that charmer going.", [new NumRequirement(player.quarkstage.producers[3], 1)], new AchievementRequirement("onequarkgenthree"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("10quarkgenfour", "So Many to charm, so little charmers.", [new NumRequirement(player.quarkstage.producers[3], 10)], new AchievementRequirement("onequarkgenfour"), [new UnlockLogEffect("Eightfold Way Quark Producer"), new UnlockLogEffect("Quark Upgrade boosting Charmer")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("100quarkgenfour", "The charm king.", [new NumRequirement(player.quarkstage.producers[3], 100)], new AchievementRequirement("10quarkgenfour"), [new LinkedLinearEffect(player.quarkstage.upgrades[5], () => { return Decimal.floor(player.quarkstage.producers[3].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => { return "Get 1 free Multor per 100 Charmers bought." })], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e3quarkgenfour", "True loves kiss!", [new NumRequirement(player.quarkstage.producers[3], 1e3)], new AchievementRequirement("100quarkgenfour"), [new UnlockLogEffect("Charm Quark Producer autobuyer")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e5quarkgenfour", "Turn the frog!", [new NumRequirement(player.quarkstage.producers[3], "1e5")], new AchievementRequirement("1e3quarkgenfour"), [new FlavorEffect("Something Sometime.")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e7quarkgenfour", "Turns out the kiss did not work, you still got a frog!", [new NumRequirement(player.quarkstage.producers[3], "1e7")], new AchievementRequirement("1e5quarkgenfour"), [new FlavorEffect("Something Sometime.")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e10quarkgenfour", "Ok, ya got me drooling now.", [new NumRequirement(player.quarkstage.producers[3], "1e10")], new AchievementRequirement("1e7quarkgenfour"), [new FunctionEffect(player.quarkstage.producers[3], EffectTypes.ProducerMultiplierProduction, () => Decimal.pow(player.achievements.points, Decimal.log(player.achievements.points, 2)), (obj) => "Charmer Production Multiplier Based on Achievment Points | Currently *" + formatDecimalNormal(obj.value))], null, getbasictag(), 100));

  //Eightfold Way
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("onequarkgenfive", "Eightfold, more like Onefold", [new NumRequirement(player.quarkstage.producers[4], 1)], new AchievementRequirement("onequarkgenfour"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("10quarkgenfive", "Twofold?", [new NumRequirement(player.quarkstage.producers[4], 10)], new AchievementRequirement("onequarkgenfive"), [new UnlockLogEffect("George Quark Producer"), new UnlockLogEffect("Quark Upgrade boosting Eightfold Way")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("100quarkgenfive", "The paper is the size of the milky way!", [new NumRequirement(player.quarkstage.producers[4], 100)], new AchievementRequirement("10quarkgenfive"), [new UnlockLogEffect("Acceleration Boost Quark Boost")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e3quarkgenfive", "Time to sloooow dooooowwwwwwwwn", [new NumRequirement(player.quarkstage.producers[4], 1e3)], new AchievementRequirement("100quarkgenfive"), [new UnlockLogEffect("Eightfold Way Quark Procuer autobuyer")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e5quarkgenfive", "Too Many Folds!", [new NumRequirement(player.quarkstage.producers[4], "1e5")], new AchievementRequirement("1e3quarkgenfive"), [new FlavorEffect("Something sometime.")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e7quarkgenfive", "Not enought Folds!", [new NumRequirement(player.quarkstage.producers[4], "1e7")], new AchievementRequirement("1e5quarkgenfive"), [new FlavorEffect("Something sometime.")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e10quarkgenfive", "Jaw dropped.", [new NumRequirement(player.quarkstage.producers[4], "1e10")], new AchievementRequirement("1e7quarkgenfive"), [new FunctionEffect(player.quarkstage.producers[4], EffectTypes.ProducerMultiplierProduction, () => Decimal.pow(player.achievements.points, Decimal.log(player.achievements.points, 2)), (obj) => "Eightfold Way Production Multiplier Based on Achievment Points | Currently *" + formatDecimalNormal(obj.value))], null, getbasictag(), 100));

  //Bought George
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("onequarkgensix", "Its a name", [new NumRequirement(player.quarkstage.producers[5], 1)], new AchievementRequirement("onequarkgenfive"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("10quarkgensix", "10 George's must get confusing.", [new NumRequirement(player.quarkstage.producers[5], 10)], new AchievementRequirement("onequarkgensix"), [new UnlockLogEffect("Murray Quark Producer"), new UnlockLogEffect("Quark Upgrade boosting George")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("100quarkgensix", "A room full of Georges", [new NumRequirement(player.quarkstage.producers[5], 100)], new AchievementRequirement("10quarkgensix"), [new LinkedLinearEffect(player.quarkstage.upgrades[4], () => { return Decimal.floor(player.quarkstage.producers[5].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => { return "Get 1 free Acceleration Boost per 100 Georges bought." })], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e3quarkgensix", "A college of Georges", [new NumRequirement(player.quarkstage.producers[5], 1e3)], new AchievementRequirement("100quarkgensix"), [new UnlockLogEffect("George Quark Producer autobuyer")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e5quarkgensix", "A town of Georges.", [new NumRequirement(player.quarkstage.producers[5], "1e5")], new AchievementRequirement("1e3quarkgensix"), [new FlavorEffect("Something sometime.")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e7quarkgensix", "Whats better than 1e5 Georges, 1e7!", [new NumRequirement(player.quarkstage.producers[5], "1e7")], new AchievementRequirement("1e5quarkgensix"), [new FlavorEffect("Something sometime.")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e10quarkgensix", "More Georges than the earths population.", [new NumRequirement(player.quarkstage.producers[5], "1e10")], new AchievementRequirement("1e7quarkgensix"), [new FunctionEffect(player.quarkstage.producers[5], EffectTypes.ProducerMultiplierProduction, () => Decimal.pow(player.achievements.points, Decimal.log(player.achievements.points, 2)), (obj) => "George Production Multiplier Based on Achievment Points | Currently *" + formatDecimalNormal(obj.value))], null, getbasictag(), 100));

  //Bought Murray
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("onequarkgenseven", "MURRRAAAYYYY!!!", [new NumRequirement(player.quarkstage.producers[6], 1)], new AchievementRequirement("onequarkgensix"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("10quarkgenseven", "A dozen Murrays.", [new NumRequirement(player.quarkstage.producers[6], 10)], new AchievementRequirement("onequarkgenseven"), [new UnlockLogEffect("Epoch Quark Producer"), new UnlockLogEffect("Quark Upgrade boosting Murray")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("100quarkgenseven", "A century of Murrays.", [new NumRequirement(player.quarkstage.producers[6], 100)], new AchievementRequirement("10quarkgenseven"), [new LinkedLinearEffect(player.quarkstage.upgrades[0], () => { return Decimal.floor(player.quarkstage.producers[6].bought.divide(50)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => { return "Get 1 free Aceleron per 50 Murrays bought." })], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e3quarkgenseven", "Should we mix the Murrays and Georges?", [new NumRequirement(player.quarkstage.producers[6], 1e3)], new AchievementRequirement("100quarkgenseven"), [new UnlockLogEffect("Murray Quark Producer autobuyer")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e5quarkgenseven", "Timeless, memories.", [new NumRequirement(player.quarkstage.producers[6], "1e5")], new AchievementRequirement("1e3quarkgenseven"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e7quarkgenseven", "Just impractical.", [new NumRequirement(player.quarkstage.producers[6], "1e7")], new AchievementRequirement("1e5quarkgenseven"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e10quarkgenseven", "You must be a joker.", [new NumRequirement(player.quarkstage.producers[6], "1e10")], new AchievementRequirement("1e7quarkgenseven"), [new FunctionEffect(player.quarkstage.producers[6], EffectTypes.ProducerMultiplierProduction, () => Decimal.pow(player.achievements.points, Decimal.log(player.achievements.points, 2)), (obj) => "Murray Production Multiplier Based on Achievment Points | Currently *" + formatDecimalNormal(obj.value))], null, getbasictag(), 100));

  //Bought Epoch
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("onequarkgeneight", "What even is an Epoch.", [new NumRequirement(player.quarkstage.producers[7], 1)], new AchievementRequirement("onequarkgenseven"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("10quarkgeneight", "Spoiler, Its a defining period of time.", [new NumRequirement(player.quarkstage.producers[7], 10)], new AchievementRequirement("onequarkgeneight"), [new UnlockLogEffect("Scattering Quark Producer"), new UnlockLogEffect("Quark Upgrade boosting Epoch")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("100quarkgeneight", "The time be dragging.", [new NumRequirement(player.quarkstage.producers[7], 100)], new AchievementRequirement("10quarkgeneight"), [new LinkedLinearEffect(player.quarkstage.upgrades[0], () => { return Decimal.floor(player.quarkstage.producers[7].bought.divide(25)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => { return "Get 1 free Aceleron per 25 Epochs bought." })], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e3quarkgeneight", "Time should speed up and slow down.", [new NumRequirement(player.quarkstage.producers[7], 1e3)], new AchievementRequirement("100quarkgeneight"), [new UnlockLogEffect("Epoch Quark Producer autobuyer")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e5quarkgeneight", "Wait, there is relativity.", [new NumRequirement(player.quarkstage.producers[7], "1e5")], new AchievementRequirement("1e3quarkgeneight"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e7quarkgeneight", "Just leave the game running on a ship pc...", [new NumRequirement(player.quarkstage.producers[7], "1e7")], new AchievementRequirement("1e5quarkgeneight"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e10quarkgeneight", "Then go to another ship and time dilate, PROFIT.", [new NumRequirement(player.quarkstage.producers[7], "1e10")], new AchievementRequirement("1e7quarkgeneight"), [new FunctionEffect(player.quarkstage.producers[7], EffectTypes.ProducerMultiplierProduction, () => Decimal.pow(player.achievements.points, Decimal.log(player.achievements.points, 2)), (obj) => "Epoch Production Multiplier Based on Achievment Points | Currently *" + formatDecimalNormal(obj.value))], null, getbasictag(), 100));

  //Bought Scattering
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("onequarkgennine", "Start the light Scattering", [new NumRequirement(player.quarkstage.producers[8], 1)], new AchievementRequirement("onequarkgeneight"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("10quarkgennine", "Lets scatter some more.", [new NumRequirement(player.quarkstage.producers[8], 10)], new AchievementRequirement("onequarkgennine"), [new UnlockLogEffect("Big Bang Quark Producer"), new UnlockLogEffect("Quark Upgrade boosting Scattering")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("100quarkgennine", "Get some mirrors.", [new NumRequirement(player.quarkstage.producers[8], 100)], new AchievementRequirement("10quarkgennine"), [new UnlockLogEffect("Accelerator Quark Boost")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e3quarkgennine", "Lets try some color refraction.", [new NumRequirement(player.quarkstage.producers[8], 1e3)], new AchievementRequirement("100quarkgennine"), [new UnlockLogEffect("Scattering Quark Producer autobuyer")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e5quarkgennine", "You need some prisms.", [new NumRequirement(player.quarkstage.producers[8], "1e5")], new AchievementRequirement("1e3quarkgennine"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e7quarkgennine", "Can I add more scatter?", [new NumRequirement(player.quarkstage.producers[8], "1e7")], new AchievementRequirement("1e5quarkgennine"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e10quarkgennine", "Can you even scatter more?", [new NumRequirement(player.quarkstage.producers[8], "1e10")], new AchievementRequirement("1e7quarkgennine"), [new FunctionEffect(player.quarkstage.producers[8], EffectTypes.ProducerMultiplierProduction, () => Decimal.pow(player.achievements.points, Decimal.log(player.achievements.points, 2)), (obj) => "Scattering Production Multiplier Based on Achievment Points | Currently *" + formatDecimalNormal(obj.value))], null, getbasictag(), 100));

  //Bought Big Bang
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("onequarkgenten", "Such a Big Bang", [new NumRequirement(player.quarkstage.producers[9], 1)], new AchievementRequirement("onequarkgennine"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("10quarkgenten", "But, How?", [new NumRequirement(player.quarkstage.producers[9], 10)], new AchievementRequirement("onequarkgenten"), [new UnlockLogEffect("Quark Upgrade boosting Big Bang"), new UnlockLogEffect("More Quark Upgrades"), new StaticEffect(player.quarkstage.producers, 2, EffectTypes.ProducerMultiplierProduction, null, () => "Quark Production x2")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("100quarkgenten", "Ok, 100 time deaths of the universe", [new NumRequirement(player.quarkstage.producers[9], 100)], new AchievementRequirement("10quarkgenten"), [new UnlockLogEffect("Multiplication Boost Quark Producer")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e3quarkgenten", "Time flies.", [new NumRequirement(player.quarkstage.producers[9], 1e3)], new AchievementRequirement("100quarkgenten"), [new UnlockLogEffect("Big Banger Quark Producer autobuyer")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e5quarkgenten", "It is on repeat.", [new NumRequirement(player.quarkstage.producers[9], "1e5")], new AchievementRequirement("1e3quarkgenten"), [new FlavorEffect("Something Sometime.")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e7quarkgenten", "On the edge of time.", [new NumRequirement(player.quarkstage.producers[9], "1e7")], new AchievementRequirement("1e5quarkgenten"), [new FlavorEffect("Something Sometime.")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e10quarkgenten", "COLLAPSE!", [new NumRequirement(player.quarkstage.producers[9], "1e10")], new AchievementRequirement("1e7quarkgenten"), [new FunctionEffect(player.quarkstage.producers[9], EffectTypes.ProducerMultiplierProduction, () => Decimal.pow(player.achievements.points, Decimal.log(player.achievements.points, 2)), (obj) => "Big Bang Production Multiplier Based on Achievment Points | Currently *" + formatDecimalNormal(obj.value))], null, getbasictag(), 100));

  //Total Producer Bought
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("1000producers", "A lot of producers", new FunctionRequirement(() => totalproducerbought(player.quarkstage.producers).greaterThan(999), "1000 Quark Producers Bought"), new AchievementRequirement("10quarkgenone"), new StaticEffect(player.quarkstage.producers, 1.1, EffectTypes.ProducerMultiplierProduction, null, () => "Quark Production x1.1"), null, getbasictag(), 10));
  addbasicachievement(new Achievement("1e4producers", "A lot more producers", new FunctionRequirement(() => totalproducerbought(player.quarkstage.producers).greaterThanOrEqualTo(1e4), "1e4 Quark Producers Bought"), new AchievementRequirement("1000producers"), new FlavorEffect("Quark Producer Autobuyers"), null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e10producers", "This one helps", new FunctionRequirement(() => totalproducerbought(player.quarkstage.producers).greaterThanOrEqualTo(1e10), "1e10 Quark Producers Bought"), new AchievementRequirement("1e4producers"), new FlavorEffect("Bragging Rights"), null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e15producers", "A little but of producer", new FunctionRequirement(() => totalproducerbought(player.quarkstage.producers).greaterThanOrEqualTo(1e15), "1e15 Quark Producers Bought"), new AchievementRequirement("1e10producers"), new FlavorEffect("Bragging Rights"), null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e20producers", "You Got This Gamer", new FunctionRequirement(() => totalproducerbought(player.quarkstage.producers).greaterThanOrEqualTo(1e20), "1e20 Quark Producers Bought"), new AchievementRequirement("1e15producers"), new FlavorEffect("Bragging Rights"), null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e25producers", "Seriously?", new FunctionRequirement(() => totalproducerbought(player.quarkstage.producers).greaterThanOrEqualTo(1e25), "1e25 Quark Producers Bought"), new AchievementRequirement("1e20producers"), new FlavorEffect("Bragging Rights"), null, getbasictag(), 150));
  addbasicachievement(new Achievement("1e30producers", "HaHa Funny Mr Programmer", new FunctionRequirement(() => totalproducerbought(player.quarkstage.producers).greaterThanOrEqualTo(1e30), "1e30 Quark Producers Bought"), new AchievementRequirement("1e25producers"), new FlavorEffect("Bragging Rights"), null, getbasictag(), 250));

  //Quark Boosts
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("10boosts", "Buy 10 Quark Boosts", new FunctionRequirement(() => totalupgradebought(player.quarkstage.upgrades).greaterThan(9), "10 Quark Boosts Bought"), new AchievementRequirement("100quarkgenone"), [new FlavorEffect("To easy nothing for you")], null, getbasictag(), 5));
  addbasicachievement(new Achievement("100boosts", "Buy 100 Quark Boosts", new FunctionRequirement(() => totalupgradebought(player.quarkstage.upgrades).greaterThan(99), "100 Quark Boosts Bought"), new AchievementRequirement("10boosts"), null, null, getbasictag(), 25));
  addbasicachievement(new Achievement("1000boosts", "Buy 1000 Quark Boosts", new FunctionRequirement(() => totalupgradebought(player.quarkstage.upgrades).greaterThan(999), "1000 Quark Boosts Bought"), new AchievementRequirement("100boosts"), null, null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e5boosts", "Buy 1e5 Quark Boosts", new FunctionRequirement(() => totalupgradebought(player.quarkstage.upgrades).greaterThanOrEqualTo(1e5), "1e5 Quark Boosts Bought"), new AchievementRequirement("1000boosts"), new FlavorEffect("Bragging Rights"), null, getbasictag(), 75));
  addbasicachievement(new Achievement("1e7boosts", "Buy 1e7 Quark Boosts", new FunctionRequirement(() => totalupgradebought(player.quarkstage.upgrades).greaterThanOrEqualTo(1e7), "1e7 Quark Boosts Bought"), new AchievementRequirement("1e5boosts"), new FlavorEffect("Bragging Rights"), null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e10boosts", "Buy 1e10 Quark Boosts", new FunctionRequirement(() => totalupgradebought(player.quarkstage.upgrades).greaterThanOrEqualTo(1e10), "1e10 Quark Boosts Bought"), new AchievementRequirement("1e7boosts"), new FlavorEffect("Bragging Rights"), null, getbasictag(), 150));
  addbasicachievement(new Achievement("1e15boosts", "Buy 1e15 Quark Boosts", new FunctionRequirement(() => totalupgradebought(player.quarkstage.upgrades).greaterThanOrEqualTo(1e15), "1e15 Quark Boosts Bought"), new AchievementRequirement("1e10boosts"), new FlavorEffect("Bragging Rights"), null, getbasictag(), 250));


  //Quark Milestones
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("electrifyunlock", "Electrify", [new NumRequirement(player.quarkstage.quarks, "1e16")], null, [new UnlockLogEffect("Electrify!! Which is a prestige tier and opens up tons of new content, would recommend right away!")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("challengeunlock", "Your getting mightly powerful", [new NumRequirement(player.quarkstage.quarks, "1e16")], new AchievementRequirement("electrifyunlock"), [new UnlockLogEffect("Challenges to test your all mighty power")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("multronunlock", "Might as well unlock another upgrade.", [new NumRequirement(player.quarkstage.quarks, "1e35")], new AchievementRequirement("challengeunlock"), [new UnlockLogEffect("Multron Quark Boost")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("quarkupgradesauto", "Unlocks automation for all upgrades in the Quark Boost tab.", [new NumRequirement(player.quarkstage.quarks, "1e60")], new AchievementRequirement("multronunlock"), [new UnlockLogEffect("10? New Quark Boost autobuyers")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("quarkupgradesunlock", "Unlocks two new upgrades in the Quark Boost tab.", [new NumRequirement(player.quarkstage.quarks, "1e100")], new AchievementRequirement("quarkupgradesauto"), [new UnlockLogEffect("Acceleratron Quark Boost"), new UnlockLogEffect("Multiplier Quark Boost")], null, getbasictag(), 150));
  addbasicachievement(new Achievement("infinityquarks", "What infinity gives more automation, who could have known?", [new NumRequirement(player.quarkstage.quarks, "1.8e308")], new AchievementRequirement("quarkupgradesunlock"), [new UnlockLogEffect("Even more automation, will greatly help when nucleonizing! (Recommended before nucleonizing for the first time)")], null, getbasictag(), 250));
  addbasicachievement(new Achievement("over9000quarks", "Its over 9000!!", [new NumRequirement(player.quarkstage.quarks, "1e9001")], new AchievementRequirement("infinityquarks"), [new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, () => Decimal.pow(player.achievements.points, Decimal.log(player.achievements.points, 2)), (obj) => "Quark Production Multiplier Based on Achievment Points | Currently *" + formatDecimalNormal(obj.value))], null, getbasictag(), 1000));

  //Electrolize Milestone
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("1electrify", "You made it, Congrats!!", [new FunctionRequirement(() => player.stats.prestigeamounts.electrify >= 1, "Electrify 1 Time")], new AchievementRequirement("electrifyunlock"), [new FlavorEffect("Lots of new Upgrades that cost Electrons, along with some new producers")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("100electrify", "A few under your belt", [new FunctionRequirement(() => player.stats.prestigeamounts.electrify >= 100, "Electrify 100 Times")], new AchievementRequirement("1electrify"), [], null, getbasictag(),25));
  addbasicachievement(new Achievement("1000electrify", "Wow 1000 Clicks", [new FunctionRequirement(() => player.stats.prestigeamounts.electrify >= 1000, "Electrify 1000 Times")], new AchievementRequirement("100electrify"), [], null, getbasictag(), 50));
  addbasicachievement(new Achievement("10000electrify", "Something smart", [new FunctionRequirement(() => player.stats.prestigeamounts.electrify >= 10000, "Electrify 10000 Times")], new AchievementRequirement("1000electrify"), [], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e10electrify", "You overachiever", [new FunctionRequirement(() => player.stats.prestigeamounts.electrify >= 1e10, "Electrify 1e10 Times")], new AchievementRequirement("10000electrify"), [], null, getbasictag(), 1000));
  addbasicachievement(new Achievement("1e25electrify", "1/4 of the way there Logarithmically", [new FunctionRequirement(() => player.stats.prestigeamounts.electrify >= 1e25, "Electrify 1e25 Times")], new AchievementRequirement("1e10electrify"), [], null, getbasictag(), 2500));
  addbasicachievement(new Achievement("1e100electrify", "You arent actually gonna do this right?", [new FunctionRequirement(() => player.stats.prestigeamounts.electrify >= 1e100, "Electrify 1e100 Times")], new AchievementRequirement("1e25electrify"), [], null, getbasictag(), 10000));

  //Bought Green Quarks
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("5qsp0", "Gotta start somewhere", [new TotalNumRequirement(player.electronstage.quarkspinproducers[0], 5)], new AchievementRequirement("1electrify"), new UnlockLogEffect("New Quark Spin Producer"), null, getbasictag(), 5));
  addbasicachievement(new Achievement("25qsp0", "Slight upgrade", [new TotalNumRequirement(player.electronstage.quarkspinproducers[0], 25)], new AchievementRequirement("5qsp0"), [new StaticEffect(player.electronstage.quarkspinproducers[0], 1.5, EffectTypes.ProducerMultiplierProduction, null, () => "Green Quark Producer Production *1.5")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("250qsp0", "Whoa calm down horsey", [new TotalNumRequirement(player.electronstage.quarkspinproducers[0], 250)], new AchievementRequirement("25qsp0"), [new StaticEffect(player.electronstage.quarkspinproducers[0], 2, EffectTypes.ProducerMultiplierProduction, null, () => "Green Quark Producer Production *2")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e4qsp0", "Not even close to the next achievement", [new TotalNumRequirement(player.electronstage.quarkspinproducers[0], 1e4)], new AchievementRequirement("250qsp0"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e25qsp0", "An exponential quarter", [new TotalNumRequirement(player.electronstage.quarkspinproducers[0], "1e25")], new AchievementRequirement("1e4qsp0"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e250qsp0", "Impossible?", [new TotalNumRequirement(player.electronstage.quarkspinproducers[0], "1e250")], new AchievementRequirement("1e25qsp0"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e2500qsp0", "I guess not", [new TotalNumRequirement(player.electronstage.quarkspinproducers[0], "1e2500")], new AchievementRequirement("1e250qsp0"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 250));

  //Bought Red Quarks
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("5qsp1", "Gotta start somewhere", [new TotalNumRequirement(player.electronstage.quarkspinproducers[1], 5)], new AchievementRequirement("5qsp0"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("25qsp1", "Slight upgrade", [new TotalNumRequirement(player.electronstage.quarkspinproducers[1], 25)], new AchievementRequirement("5qsp1"), [new StaticEffect(player.electronstage.quarkspinproducers[1], 1.5, EffectTypes.ProducerMultiplierProduction, null, () => "Red Quark Producer Production *1.5")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("250qsp1", "Whoa calm down horsey", [new TotalNumRequirement(player.electronstage.quarkspinproducers[1], 250)], new AchievementRequirement("25qsp1"), [new StaticEffect(player.electronstage.quarkspinproducers[1], 2, EffectTypes.ProducerMultiplierProduction, null, () => "Red Quark Producer Production *2")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e4qsp1", "Not even close to the next achievement", [new TotalNumRequirement(player.electronstage.quarkspinproducers[1], 1e4)], new AchievementRequirement("250qsp1"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e25qsp1", "An exponential quarter", [new TotalNumRequirement(player.electronstage.quarkspinproducers[1], "1e25")], new AchievementRequirement("1e4qsp1"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e250qsp1", "Impossible?", [new TotalNumRequirement(player.electronstage.quarkspinproducers[1], "1e250")], new AchievementRequirement("1e25qsp1"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e2500qsp1", "I guess not", [new TotalNumRequirement(player.electronstage.quarkspinproducers[1], "1e2500")], new AchievementRequirement("1e250qsp1"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 250));

  //Bought Blue Quarks
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("5qsp2", "Gotta start somewhere", [new TotalNumRequirement(player.electronstage.quarkspinproducers[2], 5)], new AchievementRequirement("5qsp1"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("25qsp2", "Slight upgrade", [new TotalNumRequirement(player.electronstage.quarkspinproducers[2], 25)], new AchievementRequirement("5qsp2"), [new StaticEffect(player.electronstage.quarkspinproducers[2], 1.5, EffectTypes.ProducerMultiplierProduction, null, () => "Blue Quark Producer Production *1.5")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("250qsp2", "Whoa calm down horsey", [new TotalNumRequirement(player.electronstage.quarkspinproducers[2], 250)], new AchievementRequirement("25qsp2"), [new StaticEffect(player.electronstage.quarkspinproducers[2], 2, EffectTypes.ProducerMultiplierProduction, null, () => "Blue Quark Producer Production *2")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e4qsp2", "Not even close to the next achievement", [new TotalNumRequirement(player.electronstage.quarkspinproducers[2], 1e4)], new AchievementRequirement("250qsp2"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e25qsp2", "An exponential quarter", [new TotalNumRequirement(player.electronstage.quarkspinproducers[2], "1e25")], new AchievementRequirement("1e4qsp2"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e250qsp2", "Impossible?", [new TotalNumRequirement(player.electronstage.quarkspinproducers[2], "1e250")], new AchievementRequirement("1e25qsp2"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e2500qsp2", "I guess not", [new TotalNumRequirement(player.electronstage.quarkspinproducers[2], "1e2500")], new AchievementRequirement("1e250qsp2"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 250));

  //Bought Antigreen Quarks
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("5qsp3", "Gotta start somewhere", [new TotalNumRequirement(player.electronstage.quarkspinproducers[3], 5)], new AchievementRequirement("5qsp2"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("25qsp3", "Slight upgrade", [new TotalNumRequirement(player.electronstage.quarkspinproducers[3], 25)], new AchievementRequirement("5qsp3"), [new StaticEffect(player.electronstage.quarkspinproducers[3], 1.5, EffectTypes.ProducerMultiplierProduction, null, () => "Antigreen Quark Producer Production *1.5")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("250qsp3", "Whoa calm down horsey", [new TotalNumRequirement(player.electronstage.quarkspinproducers[3], 250)], new AchievementRequirement("25qsp3"), [new StaticEffect(player.electronstage.quarkspinproducers[3], 2, EffectTypes.ProducerMultiplierProduction, null, () => "Antigreen Quark Producer Production *2")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e4qsp3", "Not even close to the next achievement", [new TotalNumRequirement(player.electronstage.quarkspinproducers[3], 1e4)], new AchievementRequirement("250qsp3"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e25qsp3", "An exponential quarter", [new TotalNumRequirement(player.electronstage.quarkspinproducers[3], "1e25")], new AchievementRequirement("1e4qsp3"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e250qsp3", "Impossible?", [new TotalNumRequirement(player.electronstage.quarkspinproducers[3], "1e250")], new AchievementRequirement("1e25qsp3"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e2500qsp3", "I guess not", [new TotalNumRequirement(player.electronstage.quarkspinproducers[3], "1e2500")], new AchievementRequirement("1e250qsp3"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 250));

  //Bought Antired Quarks
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("5qsp4", "Gotta start somewhere", [new TotalNumRequirement(player.electronstage.quarkspinproducers[4], 5)], new AchievementRequirement("5qsp3"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("25qsp4", "Slight upgrade", [new TotalNumRequirement(player.electronstage.quarkspinproducers[4], 25)], new AchievementRequirement("5qsp4"), [new StaticEffect(player.electronstage.quarkspinproducers[4], 1.5, EffectTypes.ProducerMultiplierProduction, null, () => "Antired Quark Producer Production *1.5")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("250qsp4", "Whoa calm down horsey", [new TotalNumRequirement(player.electronstage.quarkspinproducers[4], 250)], new AchievementRequirement("25qsp4"), [new StaticEffect(player.electronstage.quarkspinproducers[4], 2, EffectTypes.ProducerMultiplierProduction, null, () => "Antired Quark Producer Production *2")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e4qsp4", "Not even close to the next achievement", [new TotalNumRequirement(player.electronstage.quarkspinproducers[0], 1e4)], new AchievementRequirement("250qsp4"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e25qsp4", "An exponential quarter", [new TotalNumRequirement(player.electronstage.quarkspinproducers[4], "1e25")], new AchievementRequirement("1e4qsp4"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e250qsp4", "Impossible?", [new TotalNumRequirement(player.electronstage.quarkspinproducers[4], "1e250")], new AchievementRequirement("1e25qsp4"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e2500qsp4", "I guess not", [new TotalNumRequirement(player.electronstage.quarkspinproducers[4], "1e2500")], new AchievementRequirement("1e250qsp4"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 250));

  //Bought Antiblue Quarks
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("5qsp5", "Gotta start somewhere", [new TotalNumRequirement(player.electronstage.quarkspinproducers[5], 5)], new AchievementRequirement("5qsp4"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("25qsp5", "Slight upgrade", [new TotalNumRequirement(player.electronstage.quarkspinproducers[5], 25)], new AchievementRequirement("5qsp5"), [new StaticEffect(player.electronstage.quarkspinproducers[5], 1.5, EffectTypes.ProducerMultiplierProduction, null, () => "Antiblue Quark Producer Production *1.5")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("250qsp5", "Whoa calm down horsey", [new TotalNumRequirement(player.electronstage.quarkspinproducers[5], 250)], new AchievementRequirement("25qsp5"), [new StaticEffect(player.electronstage.quarkspinproducers[5], 2, EffectTypes.ProducerMultiplierProduction, null, () => "Antiblue Quark Producer Production *2")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e4qsp5", "Not even close to the next achievement", [new TotalNumRequirement(player.electronstage.quarkspinproducers[5], 1e4)], new AchievementRequirement("250qsp5"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e25qsp5", "An exponential quarter", [new TotalNumRequirement(player.electronstage.quarkspinproducers[5], "1e25")], new AchievementRequirement("1e4qsp5"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e250qsp5", "Impossible?", [new TotalNumRequirement(player.electronstage.quarkspinproducers[5], "1e250")], new AchievementRequirement("1e25qsp5"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e2500qsp5", "I guess not", [new TotalNumRequirement(player.electronstage.quarkspinproducers[5], "1e2500")], new AchievementRequirement("1e250qsp5"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 250));

  //Bought Meson Quarks
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("5qsp6", "Gotta start somewhere", [new TotalNumRequirement(player.electronstage.quarkspinproducers[6], 5)], new AchievementRequirement("5qsp5"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("25qsp6", "Slight upgrade", [new TotalNumRequirement(player.electronstage.quarkspinproducers[6], 25)], new AchievementRequirement("5qsp6"), [new StaticEffect(player.electronstage.quarkspinproducers[6], 1.5, EffectTypes.ProducerMultiplierProduction, null, () => "Meson Quark Producer Production *1.5")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("250qsp6", "Whoa calm down horsey", [new TotalNumRequirement(player.electronstage.quarkspinproducers[6], 250)], new AchievementRequirement("25qsp6"), [new StaticEffect(player.electronstage.quarkspinproducers[6], 2, EffectTypes.ProducerMultiplierProduction, null, () => "Meson Quark Producer Production *2")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e4qsp6", "Not even close to the next achievement", [new TotalNumRequirement(player.electronstage.quarkspinproducers[6], 1e4)], new AchievementRequirement("250qsp6"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e25qsp6", "An exponential quarter", [new TotalNumRequirement(player.electronstage.quarkspinproducers[6], "1e25")], new AchievementRequirement("1e4qsp6"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e250qsp6", "Impossible?", [new TotalNumRequirement(player.electronstage.quarkspinproducers[6], "1e250")], new AchievementRequirement("1e25qsp6"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e2500qsp6", "I guess not", [new TotalNumRequirement(player.electronstage.quarkspinproducers[6], "1e2500")], new AchievementRequirement("1e250qsp6"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 250));

  //Bought Baryon Quarks
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("5qsp7", "Gotta start somewhere", [new TotalNumRequirement(player.electronstage.quarkspinproducers[7], 5)], new AchievementRequirement("5qsp6"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("25qsp7", "Slight upgrade", [new TotalNumRequirement(player.electronstage.quarkspinproducers[7], 25)], new AchievementRequirement("5qsp7"), [new StaticEffect(player.electronstage.quarkspinproducers[7], 1.5, EffectTypes.ProducerMultiplierProduction, null, () => "Baryon Quark Producer Production *1.5")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("250qsp7", "Whoa calm down horsey", [new TotalNumRequirement(player.electronstage.quarkspinproducers[7], 250)], new AchievementRequirement("25qsp7"), [new StaticEffect(player.electronstage.quarkspinproducers[7], 2, EffectTypes.ProducerMultiplierProduction, null, () => "Baryon Quark Producer Production *2")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e4qsp7", "Not even close to the next achievement", [new TotalNumRequirement(player.electronstage.quarkspinproducers[7], 1e4)], new AchievementRequirement("250qsp7"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e25qsp7", "An exponential quarter", [new TotalNumRequirement(player.electronstage.quarkspinproducers[7], "1e25")], new AchievementRequirement("1e4qsp7"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e250qsp7", "Impossible?", [new TotalNumRequirement(player.electronstage.quarkspinproducers[7], "1e250")], new AchievementRequirement("1e25qsp7"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e2500qsp7", "I guess not", [new TotalNumRequirement(player.electronstage.quarkspinproducers[7], "1e2500")], new AchievementRequirement("1e250qsp7"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 250));

  //Bought Antibaryon Quarks
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("5qsp8", "Gotta start somewhere", [new TotalNumRequirement(player.electronstage.quarkspinproducers[8], 5)], new AchievementRequirement("5qsp7"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("25qsp8", "Slight upgrade", [new TotalNumRequirement(player.electronstage.quarkspinproducers[8], 25)], new AchievementRequirement("5qsp8"), [new StaticEffect(player.electronstage.quarkspinproducers[8], 1.5, EffectTypes.ProducerMultiplierProduction, null, () => "Antibaryon Quark Producer Production *1.5")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("250qsp8", "Whoa calm down horsey", [new TotalNumRequirement(player.electronstage.quarkspinproducers[8], 250)], new AchievementRequirement("25qsp8"), [new StaticEffect(player.electronstage.quarkspinproducers[8], 2, EffectTypes.ProducerMultiplierProduction, null, () => "Antibaryon Quark Producer Production *2")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e4qsp8", "Not even close to the next achievement", [new TotalNumRequirement(player.electronstage.quarkspinproducers[8], 1e4)], new AchievementRequirement("250qsp8"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e25qsp8", "An exponential quarter", [new TotalNumRequirement(player.electronstage.quarkspinproducers[8], "1e25")], new AchievementRequirement("1e4qsp8"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e250qsp8", "Impossible?", [new TotalNumRequirement(player.electronstage.quarkspinproducers[8], "1e250")], new AchievementRequirement("1e25qsp8"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e2500qsp8", "I guess not", [new TotalNumRequirement(player.electronstage.quarkspinproducers[8], "1e2500")], new AchievementRequirement("1e250qsp8"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 250));

  //Bought Metaphysical Quarks
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("5qsp9", "Gotta start somewhere", [new TotalNumRequirement(player.electronstage.quarkspinproducers[9], 5)], new AchievementRequirement("5qsp8"), null, null, getbasictag(), 5));
  addbasicachievement(new Achievement("25qsp9", "Slight upgrade", [new TotalNumRequirement(player.electronstage.quarkspinproducers[9], 25)], new AchievementRequirement("5qsp9"), [new StaticEffect(player.electronstage.quarkspinproducers[9], 1.5, EffectTypes.ProducerMultiplierProduction, null, () => "Metaphysical Quark Producer Production *1.5")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("250qsp9", "Whoa calm down horsey", [new TotalNumRequirement(player.electronstage.quarkspinproducers[9], 250)], new AchievementRequirement("25qsp9"), [new StaticEffect(player.electronstage.quarkspinproducers[9], 2, EffectTypes.ProducerMultiplierProduction, null, () => "Metaphysical Quark Producer Production *2")], null, getbasictag(), 15));
  addbasicachievement(new Achievement("1e4qsp9", "Not even close to the next achievement", [new TotalNumRequirement(player.electronstage.quarkspinproducers[9], 1e4)], new AchievementRequirement("250qsp9"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1e25qsp9", "An exponential quarter", [new TotalNumRequirement(player.electronstage.quarkspinproducers[9], "1e25")], new AchievementRequirement("1e4qsp9"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e250qsp9", "Impossible?", [new TotalNumRequirement(player.electronstage.quarkspinproducers[9], "1e250")], new AchievementRequirement("1e25qsp9"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e2500qsp9", "I guess not", [new TotalNumRequirement(player.electronstage.quarkspinproducers[9], "1e2500")], new AchievementRequirement("1e250qsp9"), [new FlavorEffect("Something Sometime")], null, getbasictag(), 250));
  
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("1e25_quark_spin", "Some spinning is happening", new NumRequirement(player.electronstage.quarkspin, "1e25"), new AchievementRequirement("5qsp0"), new FlavorEffect("Autobuyer for Quark Spin Upgrades"), null, getbasictag(), 5));

  //Challenge Milestones
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("1,4challenges", "Reach a large amount of quarks while being in challenges 1 and 4", [new NumRequirement(player.quarkstage.quarks, "1e16"), new InChallengeRequirement(player.challenges[0]), new InChallengeRequirement(player.challenges[3])], new AchievementRequirement("challengeunlock"), [new StaticEffect([player.challenges[0], player.challenges[3]], 2, EffectTypes.ChallengeScoreMult, null, () => "Multiplies Challenge 1 and 4 Score by 2"), new StaticEffect(player.quarkstage.electrify, 2, EffectTypes.PrestigeMultiplicativeGain, null, () => "Electron gain *2")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("2,3challenges", "Reach a large amount of quarks while being in challenges 2 and 3", [new NumRequirement(player.quarkstage.quarks, "1e48"), new InChallengeRequirement(player.challenges[1]), new InChallengeRequirement(player.challenges[2])], new AchievementRequirement("challengeunlock"), [new StaticEffect([player.challenges[1], player.challenges[2]], 2, EffectTypes.ChallengeScoreMult, null, () => "Multiplies Challenge 2 and 3 Score by 2"), new StaticEffect(player.quarkstage.electrify, 2, EffectTypes.PrestigeMultiplicativeGain, null, () => "Electron gain *2")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("1-4challenges", "Reach a large amount of quarks while being in challenges 1 through 4", [new NumRequirement(player.quarkstage.quarks, "1e32"), new InChallengeRequirement(player.challenges[0]), new InChallengeRequirement(player.challenges[1]), new InChallengeRequirement(player.challenges[2]), new InChallengeRequirement(player.challenges[3])], [new AchievementRequirement("1,4challenges"), new AchievementRequirement("2,3challenges")], [new StaticEffect([player.challenges[0], player.challenges[1], player.challenges[2], player.challenges[3]], 5, EffectTypes.ChallengeScoreMult, null, () => "Multiplies Challenge 1 through 4 Score by 5"), new StaticEffect(player.quarkstage.electrify, 2, EffectTypes.PrestigeMultiplicativeGain, null, () => "Electron gain *2")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("1-4challenges2", "Reach a even more quarks while being in challenges 1 through 4", [new NumRequirement(player.quarkstage.quarks, "1e64"), new InChallengeRequirement(player.challenges[0]), new InChallengeRequirement(player.challenges[1]), new InChallengeRequirement(player.challenges[2]), new InChallengeRequirement(player.challenges[3])], new AchievementRequirement("1-4challenges"), [new StaticEffect([player.challenges[0], player.challenges[1], player.challenges[2], player.challenges[3]], 5, EffectTypes.ChallengeScoreMult, null, () => "Multiplies Challenge 1 through 4 Score by another 5"), new StaticEffect(player.quarkstage.electrify, 2, EffectTypes.PrestigeMultiplicativeGain, null, () => "Electron gain *2")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1-4challenges3", "These requirements are getting insane.(Must be in challenges 1-4)", [new NumRequirement(player.quarkstage.quarks, "1e256"), new InChallengeRequirement(player.challenges[0]), new InChallengeRequirement(player.challenges[1]), new InChallengeRequirement(player.challenges[2]), new InChallengeRequirement(player.challenges[3])], new AchievementRequirement("1-4challenges2"), [new StaticEffect([player.challenges[0], player.challenges[1], player.challenges[2], player.challenges[3]], 10, EffectTypes.ChallengeScoreMult, null, () => "This time the multiplier is 10 times!"), new StaticEffect(player.quarkstage.electrify, 2, EffectTypes.PrestigeMultiplicativeGain, null, () => "Electron gain *2")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1-4challenges4", "The score mult may be going up but so is the requirement.(Must be in challenges 1-4)", [new NumRequirement(player.quarkstage.quarks, "1e2048"), new InChallengeRequirement(player.challenges[0]), new InChallengeRequirement(player.challenges[1]), new InChallengeRequirement(player.challenges[2]), new InChallengeRequirement(player.challenges[3])], new AchievementRequirement("1-4challenges3"), [new StaticEffect([player.challenges[0], player.challenges[1], player.challenges[2], player.challenges[3]], 5e5, EffectTypes.ChallengeScoreMult, null, () => "The multiplier is getting larger, now " + formatDecimal(new Decimal(1e5)) + " times!"), new StaticEffect(player.quarkstage.electrify, 2, EffectTypes.PrestigeMultiplicativeGain, null, () => "Electron gain *2")], null, getbasictag(), 250));
  addbasicachievement(new Achievement("1-4challenges5", "Time for the largest reward and requirement.(Must be in challenges 1-4)", [new NumRequirement(player.quarkstage.quarks, "1e16384"), new InChallengeRequirement(player.challenges[0]), new InChallengeRequirement(player.challenges[1]), new InChallengeRequirement(player.challenges[2]), new InChallengeRequirement(player.challenges[3])], new AchievementRequirement("1-4challenges4"), [new StaticEffect([player.challenges[0], player.challenges[1], player.challenges[2], player.challenges[3]], 5e15, EffectTypes.ChallengeScoreMult, null, () => "The largest multiplier, " + formatDecimal(new Decimal(1e15)) + " times!"), new StaticEffect(player.quarkstage.electrify, 2, EffectTypes.PrestigeMultiplicativeGain, null, () => "Electron gain *2")], null, getbasictag(), 1000));

  //Electron Milestones
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("1e16electrons", "A Reasonable Number", [new NumRequirement(player.electronstage.electrons, "1e16")], new AchievementRequirement("1electrify"), [new UnlockLogEffect("Orbitals Mechanic"), new StaticEffect(player.quarkstage.electrify, 2, EffectTypes.PrestigeMultiplicativeGain, null, () => "Electron Gain *2")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("1e32electrons", "Electron Power?", [new NumRequirement(player.electronstage.electrons, "1e32")], new AchievementRequirement("1e16electrons"), [new StaticEffect(player.electronstage.clouds.power, 2, EffectTypes.UpgradeAmountMultiplier, null, () => "Electron Power Amount *2")], null, getbasictag(), 25));
  addbasicachievement(new Achievement("nucleonizeunlock", "Nucleonize", [new NumRequirement(player.electronstage.electrons, "1e100")], new AchievementRequirement("1e32electrons"), [new FlavorEffect("Unlocks a new prestige layer with added mechanics.")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("1e128electrons", "How about some bonus electrons?", [new NumRequirement(player.electronstage.electrons, "1e128")], new AchievementRequirement("nucleonizeunlock"), [new StaticEffect(player.quarkstage.electrify, 2, EffectTypes.PrestigeMultiplicativeGain, null, () => "Electron Gain *2")], null, getbasictag(), 100));
  addbasicachievement(new Achievement("1e512electrons", "Electron Power is to weak", [new NumRequirement(player.electronstage.electrons, "1e512")], new AchievementRequirement("1e128electrons"), [new StaticEffect(player.electronstage.clouds.power, 100, EffectTypes.UpgradeAmountMultiplier, null, () => "Electron Power Amount *100")], null, getbasictag(), 150));
  addbasicachievement(new Achievement("1e16384electrons", "A Nucleon Boost", [new NumRequirement(player.electronstage.electrons, "1e16384")], new AchievementRequirement("1e512electrons"), [new StaticEffect(player.electronstage.nucleonize, 2.5, EffectTypes.PrestigeMultiplicativeGain, null, () => "Nucelon Gain *2.5")], null, getbasictag(), 200));
  addbasicachievement(new Achievement("1e65536electrons", "Anti-Electrons For The Win", [new NumRequirement(player.electronstage.electrons, "1e65536")], new AchievementRequirement("1e16384electrons"), [new StaticEffect(player.electronstage.nucleonize,10, EffectTypes.UpgradeSoftCapMultiplier, null, () => "(WIP) Increases anti-electron softcap by 10 times")], null, getbasictag(), 500));

  //Nucleonize Milestones
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("1nucleonize", "You made it V2, Congrats!!", [new FunctionRequirement(() => player.stats.prestigeamounts.nucleonize >= 1, "Nucleonize 1 Time")], new AchievementRequirement("nucleonizeunlock"), [new FlavorEffect("Lots of new Electron and Quark Upgrades")], null, getbasictag(), 10));
  //var antielectronreward = new PrestigeReward(player.nucleonstage.antiverse.positrons, player.electronstage.nucleonize.rewards[0], (num) => Decimal.pow(num, .5));
  addbasicachievement(new Achievement("5nucleonize", "Buying electron upgrades is getting repetative no?", [new FunctionRequirement(() => player.stats.prestigeamounts.nucleonize >= 5, "Nucleonize 5 Times")], new AchievementRequirement("1nucleonize"), [new FlavorEffect("Electron upgrade autobuyer, yay!")], null, getbasictag(), 25));//, new FunctionalEffect(() => player.electronstage.nucleonize.addreward(antielectronreward),() => player.electronstage.nucleonize.removereward(antielectronreward))], null, getbasictag()));
  addbasicachievement(new Achievement("15nucleonize", "Getting Up There", [new FunctionRequirement(() => player.stats.prestigeamounts.nucleonize >= 15, "Nucleonize 15 Times")], new AchievementRequirement("5nucleonize"), [new UnlockLogEffect("Nucleon Gain Formula Much Better")], null, getbasictag(), 50));
  addbasicachievement(new Achievement("100nucleonize", "I want progress", [new FunctionRequirement(() => player.stats.prestigeamounts.nucleonize >= 100, "Nucleonize 100 Times")], new AchievementRequirement("15nucleonize"), [new UnlockLogEffect("Nucleon Split (New Mechanic)")], null, getbasictag(), 75));
  addbasicachievement(new Achievement("250nucleonize", "I want progress", [new FunctionRequirement(() => player.stats.prestigeamounts.nucleonize >= 250, "Nucleonize 250 Times")], new AchievementRequirement("100nucleonize"), [new StaticEffect(player.electronstage.nucleonize, EffectTypes.PrestigeMultiplicativeGain, 2, null, () => "Nucleon Gain *2")], null, getbasictag()), 100);
  addbasicachievement(new Achievement("1000nucleonize", "I want progress", [new FunctionRequirement(() => player.stats.prestigeamounts.nucleonize >= 1000, "Nucleonize 1000 Times")], new AchievementRequirement("250nucleonize"), [new FlavorEffect("")], null, getbasictag()), 200);
  addbasicachievement(new Achievement("1e100nucleonize", "Insane?", [new FunctionRequirement(() => player.stats.prestigeamounts.nucleonize >= 1e100, "Nucleonize 1e100 Times")], new AchievementRequirement("1000nucleonize"), [new FlavorEffect("")], null, getbasictag(), 10000));

  //On To Achievements Past Nucleonize
  //Nucleon Split
  split = player.nucleonstage.split.gridinfo;
  //Neutron Achievements (Mostly for unlocking split piece type, ect.)
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("1e3neutron", "A good jump start", new NumRequirement(getcurrency("neutron"), "1e3"), null, [new UnlockLogEffect("Piece Type: White, Effect + Nuetron Production Multiplier"), new FunctionalEffect(() => {split.piecegenerator.addpossibleeffect("white", "neutrongenmult")}, () => {split.piecegenerator.removepossibleeffect("white", "neutrongenmult")}, () => "Adds 1 Chance for white type to generate with nuetron multiplier")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("1e6neutron", "A better overall count", new NumRequirement(getcurrency("neutron"), "1e6"), null, [new UnlockLogEffect("Piece Type: White, Effect + Nuetron Production Power"), new FunctionalEffect(() => {split.piecegenerator.addpossibleeffect("white", "neutrongenpow")}, () => {split.piecegenerator.removepossibleeffect("white", "neutrongenpow")}, () => "Adds 1 Chance for white type to generate with nuetron multiplier")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("1e12neutron", "Time to unlock something new.", new NumRequirement(getcurrency("neutron"), "1e12"), null, [new UnlockLogEffect("Piece Type: Red"), new FunctionalEffect(() => {split.piecegenerator.addpossibleeffect("red", "protongenbase")}, () => {split.piecegenerator.removepossibleeffect("red", "protongen base")}, () => "Adds 1 Chance for white type to generate with nuetron multiplier")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("1e25neutron", "A new type of effect", new NumRequirement(getcurrency("neutron"), "1e25"), null, [new UnlockLogEffect("Piece Type: White, Effect + Nuetron Production Multiplier"), new FunctionalEffect(() => {split.piecegenerator.addpossibleeffect("white", "neutrongenmult")}, () => {split.piecegenerator.removepossibleeffect("white", "neutrongenmult")}, () => "Adds 1 Chance for white type to generate with nuetron multiplier")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("1e100neutron", "Yep, not broken at all", new NumRequirement(getcurrency("neutron"), "1e100"), null, [new UnlockLogEffect("Piece Type: White, Effect + Nuetron Production Multiplier"), new FunctionalEffect(() => {split.piecegenerator.addpossibleeffect("white", "neutrongenmult")}, () => {split.piecegenerator.removepossibleeffect("white", "neutrongenmult")}, () => "Adds 1 Chance for white type to generate with nuetron multiplier")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("1e1000neutron", "Better Dust Production", new NumRequirement(getcurrency("neutron"), "1e1000"), null, [new UnlockLogEffect("Piece Type: White, Effect + Nuetron Production Multiplier"), new FunctionalEffect(() => {split.piecegenerator.addpossibleeffect("white", "neutrongenmult")}, () => {split.piecegenerator.removepossibleeffect("white", "neutrongenmult")}, () => "Adds 1 Chance for white type to generate with nuetron multiplier")], null, getbasictag(), 10));
  addbasicachievement(new Achievement("1e1e5neutron", "Way to much, but someday", new NumRequirement(getcurrency("neutron"), "1e100000"), null, [new UnlockLogEffect("Piece Type: White, Effect + Nuetron Production Multiplier"), new FunctionalEffect(() => {split.piecegenerator.addpossibleeffect("white", "neutrongenmult")}, () => {split.piecegenerator.removepossibleeffect("white", "neutrongenmult")}, () => "Adds 1 Chance for white type to generate with nuetron multiplier")], null, getbasictag(), 10));

  //Proton Achievements
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("1e40proton", "Lots of protons", new NumRequirement(getcurrency("proton"), "1e40"), null, new UnlockLogEffect("Hydrogen Hill, A new mechanic"),null , getbasictag(), 10));

  //Starting Hydrogen Hill
  nextbasicachievementcolumn();
  addbasicachievement(new Achievement("1e40primedproton", "Why? Boosts of course", new NumRequirement(getcurrency("primedproton"), "1e40"), null, [new UnlockLogEffect("H-2 Replicator"), new UnlockLogEffect("Hydrogen Prestige")], null, getbasictag(), 10))

  //hydrogen Hill h-2
  nextbasicachievementcolumn();
  var baseh2boost = new FunctionEffect(getproducer("protongen"), EffectTypes.ProducerMultiplierProduction, () => new Decimal(Decimal.log(getproducer("h2").amount, 10)).add(1), (obj) => "Proton Production *" + formatDecimalOverride(obj.value, 2))
  addbasicachievement(new Achievement("10h2", "Thats a factor of 10", new NumRequirement(getproducer("h2"), "10"), null, new FunctionalEffect(() => {getproducer("h2").addbasedeffect(baseh2boost)}, () => {getproducer("h2").removebasedeffect(baseh2boost)}, () => "Replicator H-2 Now Has New Effect"), null, getbasictag(), 50))
  addbasicachievement(new Achievement("1e40h2", "That Is A Lot", new NumRequirement(getproducer("h2"), "1e40"), null, new UnlockLogEffect("H-3 Replicator"), null, getbasictag(), 100))
  var h2boost2 = new FunctionEffect(player.quarkstage.producers, EffectTypes.ProducerMultiplierProduction, () => Decimal.max(getproducer("h2").amount.divide("1e100"), 1), (obj) => "Quark Production *" + formatDecimalNormal(obj.value))
  addbasicachievement(new Achievement("1e100h2", "A Google!", new NumRequirement(getproducer("h2"), "1e100"), null, new FunctionalEffect(() => {getproducer("h2").addbasedeffect(h2boost2)}, () => {getproducer("h2").removebasedeffect(h2boost2)}, () => "Replicator H-2 Now Has New Effect"), null, getbasictag(), 250))
  addbasicachievement(new Achievement("1e500h2", "Still a long ways to go", new NumRequirement(getproducer("h2"), "1e500"), null, new FlavorEffect("ADD EFFECT DUMMY"), null, getbasictag(), 500))
  addbasicachievement(new Achievement("1e2500h2", "Having Fun?", new NumRequirement(getproducer("h2"), "1e2500"), null, new FlavorEffect("ADD EFFECT DUMMY"), null, getbasictag(), 1000))
  addbasicachievement(new Achievement("1e10000h2", "Now comes the grind", new NumRequirement(getproducer("h2"), "1e10000"), null, new FlavorEffect("ADD EFFECT DUMMY"), null, getbasictag(), 2500))
  addbasicachievement(new Achievement("1e1000000h2", "You Made It", new NumRequirement(getproducer("h2"), "1e10000"), null, new FlavorEffect("ADD EFFECT DUMMY"), null, getbasictag(), 10000))

  //Special Achievments
  player.achievements.special = [];
  nextspecialachievementcolumn();

  updateachievementpointmax();
}

function updateachievementpointmax(){
  player.achievements.maxpoints = 0;
  achievementregistry.forEach(a =>{
    if(a.value != undefined)
      player.achievements.maxpoints += a.value;
  });
}

function resetachievements() {
  achievementregistry.forEach((achieve, i) => {
    achieve.reset();
  });
}

function resetachievement(achieveid){
  achievementregistry.forEach((achieve, i) => {
    if (achieve.id == achieveid) {
      achieve.forcelock();
      return;
    }
  });
}

function hasachievement(achieveid) {
  var has = false
  achievementregistry.forEach((achieve, i) => {
    if (achieve.id == achieveid) {
      has = achieve.unlocked;
      return;
    }
  });
  return has;
}

function achievementtick() {
  achievementregistry.forEach((achieve, i) => {
    achieve.check();
  });
}

function unlockallachievements() {
  achievementregistry.forEach((achieve, i) => {
    achieve.forceunlock();
  });
}

function unlockachievement(achieveid){
  achievementregistry.forEach((achieve, i) => {
    if (achieve.id == achieveid) {
      achieve.forceunlock();
      return;
    }
  });
}

function nextbasicachievementcolumn(){
  player.achievements.basic.push([]);
}

function addbasicachievement(achievement){
  player.achievements.basic[player.achievements.basic.length - 1].push(achievement);
}

function nextspecialachievementcolumn(){
  player.achievements.basic.push([]);
}

function addspecialachievement(achievement){
  player.achievements.basic[player.achievements.basic.length - 1].push(achievement);
}

function getbasictag(){
  return "a" + player.achievements.basic.length;
}

function getspecialtag(){
  return "sa" + player.achievements.basic.length;
}