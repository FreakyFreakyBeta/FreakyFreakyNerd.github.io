function achievementlabel(row, upgrade, name){
  return "[a" + (row+1) + "x" + (upgrade+1) + "] " + name;
}

function setupachievements() {

  player.achievements.basic = [];
  var row = 0;
  //Bought Chargers
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("onequarkgenone", achievementlabel(row, player.achievements.basic[row].length, "Create A whopping 1 Charger"), [new NumRequirement(player.quarkstage.producers[0], 1)], null, null));
  player.achievements.basic[row].push(new Achievement("10quarkgenone", achievementlabel(row, player.achievements.basic[row].length, "A little better, now at 10 Chargers"), [new NumRequirement(player.quarkstage.producers[0], 10)], null, [new UnlockLogEffect("Spinner Quark Producer and an upgrade boosing Charger's")]));
  player.achievements.basic[row].push(new Achievement("100quarkgenone", achievementlabel(row, player.achievements.basic[row].length, "I need the powah!"), [new NumRequirement(player.quarkstage.producers[0], 100)], null, [new FlavorEffect("Unlocks Acceleron for purchase.")]));
  player.achievements.basic[row].push(new Achievement("1e3quarkgenone", achievementlabel(row, player.achievements.basic[row].length, "Wo! Calm down. ;)"), [new NumRequirement(player.quarkstage.producers[0], 1e3)], null, [new FlavorEffect("IDK a Charger Auto Buyer sound good?")]));
  player.achievements.basic[row].push(new Achievement("1e5quarkgenone", achievementlabel(row, player.achievements.basic[row].length, "Getting A large amount."), [new NumRequirement(player.quarkstage.producers[0], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e7quarkgenone", achievementlabel(row, player.achievements.basic[row].length, "Good Luck Buddy."), [new NumRequirement(player.quarkstage.producers[0], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e10quarkgenone", achievementlabel(row, player.achievements.basic[row].length, "Ok Ok. A for effort and effect."), [new NumRequirement(player.quarkstage.producers[0], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

  //Bought Spinners
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("onequarkgentwo", achievementlabel(row, player.achievements.basic[row].length, "The Spinner is better yah? Go ahead and purchase 1."), [new NumRequirement(player.quarkstage.producers[1], 1)], null, null));
  player.achievements.basic[row].push(new Achievement("10quarkgentwo", achievementlabel(row, player.achievements.basic[row].length, "Whats better than 1 spinner? 10 Spinners!"), [new NumRequirement(player.quarkstage.producers[1], 10)], null, [new UnlockLogEffect("Flipper Quark Producer and an upgrade boosting Spinner's")]));
  player.achievements.basic[row].push(new Achievement("100quarkgentwo", achievementlabel(row, player.achievements.basic[row].length, "Get in that spinning craze!"), [new NumRequirement(player.quarkstage.producers[1], 100)], null, [new FlavorEffect("Unlocks Multor for purchase.")]));
  player.achievements.basic[row].push(new Achievement("1e3quarkgentwo", achievementlabel(row, player.achievements.basic[row].length, "You spin me right round, right round!"), [new NumRequirement(player.quarkstage.producers[1], 1e3)], null, [new FlavorEffect("And now a Spinner autobuyer.")]));
  player.achievements.basic[row].push(new Achievement("1e5quarkgentwo", achievementlabel(row, player.achievements.basic[row].length, "Keep at it, eventually your brains will spin out."), [new NumRequirement(player.quarkstage.producers[1], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e7quarkgentwo", achievementlabel(row, player.achievements.basic[row].length, "Just kidding but keep on spinning!"), [new NumRequirement(player.quarkstage.producers[1], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e10quarkgentwo", achievementlabel(row, player.achievements.basic[row].length, "Like this will ever happen."), [new NumRequirement(player.quarkstage.producers[1], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

  //Bought Flipper
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("onequarkgenthree", achievementlabel(row, player.achievements.basic[row].length, "Go and flip some burgers, a Flipper will be useful."), [new NumRequirement(player.quarkstage.producers[2], 1)], null, null));
  player.achievements.basic[row].push(new Achievement("10quarkgenthree", achievementlabel(row, player.achievements.basic[row].length, "The business is growing, get 10 Flippers."), [new NumRequirement(player.quarkstage.producers[2], 10)], null, [new UnlockLogEffect("Charmer Quark Producer and an upgrade boosting Flipper's")]));
  player.achievements.basic[row].push(new Achievement("100quarkgenthree", achievementlabel(row, player.achievements.basic[row].length, "Flipping all day every day."), [new NumRequirement(player.quarkstage.producers[2], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[0], () => { return Decimal.floor(player.quarkstage.producers[2].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => { return "Get 1 free Acceleron per 100 Flippers bought." })]));
  player.achievements.basic[row].push(new Achievement("1e3quarkgenthree", achievementlabel(row, player.achievements.basic[row].length, "Flip it and slap it!"), [new NumRequirement(player.quarkstage.producers[2], 1e3)], null, [new FlavorEffect("Auto Flippin now.")]));
  player.achievements.basic[row].push(new Achievement("1e5quarkgenthree", achievementlabel(row, player.achievements.basic[row].length, "Uptown flip."), [new NumRequirement(player.quarkstage.producers[2], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e7quarkgenthree", achievementlabel(row, player.achievements.basic[row].length, "What about the opposite flip, flop?"), [new NumRequirement(player.quarkstage.producers[2], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e10quarkgenthree", achievementlabel(row, player.achievements.basic[row].length, "I no longer doubt your power."), [new NumRequirement(player.quarkstage.producers[2], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

  //Bought Charmer
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("onequarkgenfour", achievementlabel(row, player.achievements.basic[row].length, "Get that charmer going."), [new NumRequirement(player.quarkstage.producers[3], 1)], null, null));
  player.achievements.basic[row].push(new Achievement("10quarkgenfour", achievementlabel(row, player.achievements.basic[row].length, "So Many to charm, so little charmers."), [new NumRequirement(player.quarkstage.producers[3], 10)], null, [new UnlockLogEffect("Eightfold Way Quark Producer and an upgrade boosting Charmer's")]));
  player.achievements.basic[row].push(new Achievement("100quarkgenfour", achievementlabel(row, player.achievements.basic[row].length, "The charm king."), [new NumRequirement(player.quarkstage.producers[3], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[5], () => { return Decimal.floor(player.quarkstage.producers[3].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => { return "Get 1 free Multor per 100 Charmers bought." })]));
  player.achievements.basic[row].push(new Achievement("1e3quarkgenfour", achievementlabel(row, player.achievements.basic[row].length, "True loves kiss!"), [new NumRequirement(player.quarkstage.producers[3], 1e3)], null, [new FlavorEffect("Gotta automate that charm some how.")]));
  player.achievements.basic[row].push(new Achievement("1e5quarkgenfour", achievementlabel(row, player.achievements.basic[row].length, "Turn the frog!"), [new NumRequirement(player.quarkstage.producers[3], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e7quarkgenfour", achievementlabel(row, player.achievements.basic[row].length, "Turns out the kiss did not work, you still got a frog!"), [new NumRequirement(player.quarkstage.producers[3], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e10quarkgenfour", achievementlabel(row, player.achievements.basic[row].length, "Ok, ya got me drooling now."), [new NumRequirement(player.quarkstage.producers[3], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

  //Eightfold Way
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("onequarkgenfive", achievementlabel(row, player.achievements.basic[row].length, "Eightfold, more like Onefold"), [new NumRequirement(player.quarkstage.producers[4], 1)], null, null));
  player.achievements.basic[row].push(new Achievement("10quarkgenfive", achievementlabel(row, player.achievements.basic[row].length, "Twofold?"), [new NumRequirement(player.quarkstage.producers[4], 10)], null, [new UnlockLogEffect("George Quark Producer and an upgrade boosting Eightfold Way's")]));
  player.achievements.basic[row].push(new Achievement("100quarkgenfive", achievementlabel(row, player.achievements.basic[row].length, "The paper is the size of the milky way!"), [new NumRequirement(player.quarkstage.producers[4], 100)], null, [new FlavorEffect("Unlocks Acceleration Boost for purchase.")]));
  player.achievements.basic[row].push(new Achievement("1e3quarkgenfive", achievementlabel(row, player.achievements.basic[row].length, "Time to sloooow dooooowwwwwwwwn"), [new NumRequirement(player.quarkstage.producers[4], 1e3)], null, [new FlavorEffect("Always auto-folding.")]));
  player.achievements.basic[row].push(new Achievement("1e5quarkgenfive", achievementlabel(row, player.achievements.basic[row].length, "Too Many Folds!"), [new NumRequirement(player.quarkstage.producers[4], "1e5")], null, [new FlavorEffect("Something sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e7quarkgenfive", achievementlabel(row, player.achievements.basic[row].length, "Not enought Folds!"), [new NumRequirement(player.quarkstage.producers[4], "1e7")], null, [new FlavorEffect("Something sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e10quarkgenfive", achievementlabel(row, player.achievements.basic[row].length, "Jaw dropped."), [new NumRequirement(player.quarkstage.producers[4], "1e10")], null, [new FlavorEffect("Something sometime.")]));

  //Bought George
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("onequarkgensix", achievementlabel(row, player.achievements.basic[row].length, "Its a name"), [new NumRequirement(player.quarkstage.producers[5], 1)], null, null));
  player.achievements.basic[row].push(new Achievement("10quarkgensix", achievementlabel(row, player.achievements.basic[row].length, "10 George's must get confusing."), [new NumRequirement(player.quarkstage.producers[5], 10)], null, [new UnlockLogEffect("Murray Quark Producer and an upgrade boosting George's")]));
  player.achievements.basic[row].push(new Achievement("100quarkgensix", achievementlabel(row, player.achievements.basic[row].length, "A room full of Georges"), [new NumRequirement(player.quarkstage.producers[5], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[4], () => { return Decimal.floor(player.quarkstage.producers[5].bought.divide(100)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => { return "Get 1 free Acceleration Boost per 100 Georges bought." })]));
  player.achievements.basic[row].push(new Achievement("1e3quarkgensix", achievementlabel(row, player.achievements.basic[row].length, "A college of Georges"), [new NumRequirement(player.quarkstage.producers[5], 1e3)], null, [new FlavorEffect("Georges buy more Georges.")]));
  player.achievements.basic[row].push(new Achievement("1e5quarkgensix", achievementlabel(row, player.achievements.basic[row].length, "A town of Georges."), [new NumRequirement(player.quarkstage.producers[5], "1e5")], null, [new FlavorEffect("Something sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e7quarkgensix", achievementlabel(row, player.achievements.basic[row].length, "Whats better than 1e5 Georges, 1e7!"), [new NumRequirement(player.quarkstage.producers[5], "1e7")], null, [new FlavorEffect("Something sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e10quarkgensix", achievementlabel(row, player.achievements.basic[row].length, "More Georges than the earths population."), [new NumRequirement(player.quarkstage.producers[5], "1e10")], null, [new FlavorEffect("Something sometime.")]));

  //Bought Murray
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("onequarkgenseven", achievementlabel(row, player.achievements.basic[row].length, "MURRRAAAYYYY!!!"), [new NumRequirement(player.quarkstage.producers[6], 1)], null, null));
  player.achievements.basic[row].push(new Achievement("10quarkgenseven", achievementlabel(row, player.achievements.basic[row].length, "A dozen Murrays."), [new NumRequirement(player.quarkstage.producers[6], 10)], null, [new UnlockLogEffect("Epoch Quark Producer and an upgrade boosting Murray's")]));
  player.achievements.basic[row].push(new Achievement("100quarkgenseven", achievementlabel(row, player.achievements.basic[row].length, "A century of Murrays."), [new NumRequirement(player.quarkstage.producers[6], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[0], () => { return Decimal.floor(player.quarkstage.producers[6].bought.divide(50)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => { return "Get 1 free Aceleron per 50 Murrays bought." })]));
  player.achievements.basic[row].push(new Achievement("1e3quarkgenseven", achievementlabel(row, player.achievements.basic[row].length, "Should we mix the Murrays and Georges?"), [new NumRequirement(player.quarkstage.producers[6], 1e3)], null, [new FlavorEffect("The Murrays need some auto purchased friends.")]));
  player.achievements.basic[row].push(new Achievement("1e5quarkgenseven", achievementlabel(row, player.achievements.basic[row].length, "Timeless, memories."), [new NumRequirement(player.quarkstage.producers[6], "1e5")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements.basic[row].push(new Achievement("1e7quarkgenseven", achievementlabel(row, player.achievements.basic[row].length, "Just impractical."), [new NumRequirement(player.quarkstage.producers[6], "1e7")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements.basic[row].push(new Achievement("1e10quarkgenseven", achievementlabel(row, player.achievements.basic[row].length, "You must be a joker."), [new NumRequirement(player.quarkstage.producers[6], "1e10")], null, [new FlavorEffect("Something Sometime")]));

  //Bought Epoch
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("onequarkgeneight", achievementlabel(row, player.achievements.basic[row].length, "What even is an Epoch."), [new NumRequirement(player.quarkstage.producers[7], 1)], null, null));
  player.achievements.basic[row].push(new Achievement("10quarkgeneight", achievementlabel(row, player.achievements.basic[row].length, "Spoiler, Its a defining period of time."), [new NumRequirement(player.quarkstage.producers[7], 10)], null, [new UnlockLogEffect("Scattering Quark Producer and an upgrade boosting Epoch's")]));
  player.achievements.basic[row].push(new Achievement("100quarkgeneight", achievementlabel(row, player.achievements.basic[row].length, "The time be dragging."), [new NumRequirement(player.quarkstage.producers[7], 100)], null, [new LinkedLinearEffect(player.quarkstage.upgrades[0], () => { return Decimal.floor(player.quarkstage.producers[7].bought.divide(25)); }, 0, 1, EffectTypes.UpgradeBonusLevels, null, (obj) => { return "Get 1 free Aceleron per 25 Epochs bought." })]));
  player.achievements.basic[row].push(new Achievement("1e3quarkgeneight", achievementlabel(row, player.achievements.basic[row].length, "Time should speed up and slow down."), [new NumRequirement(player.quarkstage.producers[7], 1e3)], null, [new FlavorEffect("I think you get it, automates Epoch purchasing.")]));
  player.achievements.basic[row].push(new Achievement("1e5quarkgeneight", achievementlabel(row, player.achievements.basic[row].length, "Wait, there is relativity."), [new NumRequirement(player.quarkstage.producers[7], "1e5")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements.basic[row].push(new Achievement("1e7quarkgeneight", achievementlabel(row, player.achievements.basic[row].length, "Just leave the game running on a ship pc..."), [new NumRequirement(player.quarkstage.producers[7], "1e7")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements.basic[row].push(new Achievement("1e10quarkgeneight", achievementlabel(row, player.achievements.basic[row].length, "Then go to another ship and time dilate, PROFIT."), [new NumRequirement(player.quarkstage.producers[7], "1e10")], null, [new FlavorEffect("Something Sometime")]));

  //Bought Scattering
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("onequarkgennine", achievementlabel(row, player.achievements.basic[row].length, "Start the light Scattering"), [new NumRequirement(player.quarkstage.producers[8], 1)], null, null));
  player.achievements.basic[row].push(new Achievement("10quarkgennine", achievementlabel(row, player.achievements.basic[row].length, "Lets scatter some more."), [new NumRequirement(player.quarkstage.producers[8], 10)], null, [new UnlockLogEffect("Big Bang Quark Producer and an upgrade boosting Scattering's")]));
  player.achievements.basic[row].push(new Achievement("100quarkgennine", achievementlabel(row, player.achievements.basic[row].length, "Get some mirrors."), [new NumRequirement(player.quarkstage.producers[8], 100)], null, [new FlavorEffect("Unlocks Accelerator for purchase.")]));
  player.achievements.basic[row].push(new Achievement("1e3quarkgennine", achievementlabel(row, player.achievements.basic[row].length, "Lets try some color refraction."), [new NumRequirement(player.quarkstage.producers[8], 1e3)], null, [new FlavorEffect("Automatic Scattering purchaser.")]));
  player.achievements.basic[row].push(new Achievement("1e5quarkgennine", achievementlabel(row, player.achievements.basic[row].length, "You need some prisms."), [new NumRequirement(player.quarkstage.producers[8], "1e5")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements.basic[row].push(new Achievement("1e7quarkgennine", achievementlabel(row, player.achievements.basic[row].length, "Can I add more scatter?"), [new NumRequirement(player.quarkstage.producers[8], "1e7")], null, [new FlavorEffect("Something Sometime")]));
  player.achievements.basic[row].push(new Achievement("1e10quarkgennine", achievementlabel(row, player.achievements.basic[row].length, "Can you even scatter more?"), [new NumRequirement(player.quarkstage.producers[8], "1e10")], null, [new FlavorEffect("Something Sometime")]));

  //Bought Big Bang
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("onequarkgenten", achievementlabel(row, player.achievements.basic[row].length, "Such a Big Bang"), [new NumRequirement(player.quarkstage.producers[9], 1)], null, null));
  player.achievements.basic[row].push(new Achievement("10quarkgenten", achievementlabel(row, player.achievements.basic[row].length, "But, How?"), [new NumRequirement(player.quarkstage.producers[9], 10)], null, [new UnlockLogEffect("An upgrade boosting Big Bang's"), new StaticEffect(player.quarkstage.producers, 2, EffectTypes.ProducerMultiplierProduction, null, () => "Quark Production x2")]));
  player.achievements.basic[row].push(new Achievement("100quarkgenten", achievementlabel(row, player.achievements.basic[row].length, "Ok, 100 time deaths of the universe"), [new NumRequirement(player.quarkstage.producers[9], 100)], null, [new FlavorEffect("Unlocks Multiplication Boost for purchase.")]));
  player.achievements.basic[row].push(new Achievement("1e3quarkgenten", achievementlabel(row, player.achievements.basic[row].length, "Time flies."), [new NumRequirement(player.quarkstage.producers[9], 1e3)], null, [new FlavorEffect("Auto Big Banger.")]));
  player.achievements.basic[row].push(new Achievement("1e5quarkgenten", achievementlabel(row, player.achievements.basic[row].length, "It is on repeat."), [new NumRequirement(player.quarkstage.producers[9], "1e5")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e7quarkgenten", achievementlabel(row, player.achievements.basic[row].length, "On the edge of time."), [new NumRequirement(player.quarkstage.producers[9], "1e7")], null, [new FlavorEffect("Something Sometime.")]));
  player.achievements.basic[row].push(new Achievement("1e10quarkgenten", achievementlabel(row, player.achievements.basic[row].length, "COLLAPSE!"), [new NumRequirement(player.quarkstage.producers[9], "1e10")], null, [new FlavorEffect("Something Sometime.")]));

  //Multors/Acceleron Line Milestones
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("500acceleron", achievementlabel(row, player.achievements.basic[row].length, "Buy 500 Acceleron"), [new NumRequirement(player.quarkstage.upgrades[0], "500")], null, [new FlavorEffect("Unlocks some new orbitals")]));
  player.achievements.basic[row].push(new Achievement("100multor", achievementlabel(row, player.achievements.basic[row].length, "Buy 100 Multor"), [new NumRequirement(player.quarkstage.upgrades[5], "100")], null, [new FlavorEffect("Unlocks some new orbitals")]));
  player.achievements.basic[row].push(new Achievement("10multiplier", achievementlabel(row, player.achievements.basic[row].length, "Buy 10 Multiplier"), [new NumRequirement(player.quarkstage.upgrades[7], "10")], null, [new FlavorEffect("Unlocks a new orbital")]));


  //Quark Milestones
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("electrifyunlock", achievementlabel(row, player.achievements.basic[row].length, "Electrify"), [new NumRequirement(player.quarkstage.quarks, "1e16")], null, [new FlavorEffect("Unlocks electrify for all your wonderful electron needs!")]));
  player.achievements.basic[row].push(new Achievement("challengeunlock", achievementlabel(row, player.achievements.basic[row].length, "Your getting mightly powerful"), [new NumRequirement(player.quarkstage.quarks, "1e24")], null, [new FlavorEffect("Unlocks some challenges to test your power!")]));
  player.achievements.basic[row].push(new Achievement("multronunlock", achievementlabel(row, player.achievements.basic[row].length, "Might as well unlock another upgrade."), [new NumRequirement(player.quarkstage.quarks, "1e35")], null, [new FlavorEffect("Unlocks Multron for purchase!")]));
  player.achievements.basic[row].push(new Achievement("quarkupgradesauto", achievementlabel(row, player.achievements.basic[row].length, "Unlocks automation for all upgrades in quark producers tab."), [new NumRequirement(player.quarkstage.quarks, "1e60")], null, [new FlavorEffect("Auto purchase for days!")]));
  player.achievements.basic[row].push(new Achievement("quarkupgradesunlock", achievementlabel(row, player.achievements.basic[row].length, "Unlocks two new quark boosts tab."), [new NumRequirement(player.quarkstage.quarks, "1e100")], null, [new FlavorEffect("Two New Upgrades WHAT?")]));
  player.achievements.basic[row].push(new Achievement("infinityquarks", achievementlabel(row, player.achievements.basic[row].length, "What infinity give more automation, who could have known?"), [new NumRequirement(player.quarkstage.quarks, "1.8e308")], null, [new FlavorEffect("Even more automation, will greatly help when nucleonizing! (Recommended before nucleonizing for the first time)")]));
  player.achievements.basic[row].push(new Achievement("over9000quarks", achievementlabel(row, player.achievements.basic[row].length, "Its over 9000!!"), [new NumRequirement(player.quarkstage.quarks, "1e9001")], null, [new FlavorEffect("IDK Yet")]));

  //Challenge Milestones
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("1,4challenges", achievementlabel(row, player.achievements.basic[row].length, "Reach a large amount of quarks while being in challenges 1 and 4"), [new NumRequirement(player.quarkstage.quarks, "1e8"), new InChallengeRequirement(player.challenges[0]), new InChallengeRequirement(player.challenges[3])], null, [new StaticEffect([player.challenges[0], player.challenges[3]], 2, EffectTypes.ChallengeScoreMult, null, () => "Multiplies Challenge 1 and 4 Score by 2")]));
  player.achievements.basic[row].push(new Achievement("2,3challenges", achievementlabel(row, player.achievements.basic[row].length, "Reach a large amount of quarks while being in challenges 2 and 3"), [new NumRequirement(player.quarkstage.quarks, "1e16"), new InChallengeRequirement(player.challenges[1]), new InChallengeRequirement(player.challenges[2])], null, [new StaticEffect([player.challenges[1], player.challenges[2]], 2, EffectTypes.ChallengeScoreMult, null, () => "Multiplies Challenge 2 and 3 Score by 2")]));
  player.achievements.basic[row].push(new Achievement("1-4challenges", achievementlabel(row, player.achievements.basic[row].length, "Reach a large amount of quarks while being in challenges 1 through 4"), [new NumRequirement(player.quarkstage.quarks, "1e32"), new InChallengeRequirement(player.challenges[0]), new InChallengeRequirement(player.challenges[1]), new InChallengeRequirement(player.challenges[2]), new InChallengeRequirement(player.challenges[3])], null, [new StaticEffect([player.challenges[0], player.challenges[1], player.challenges[2], player.challenges[3]], 5, EffectTypes.ChallengeScoreMult, null, () => "Multiplies Challenge 1 through 4 Score by 5")]));
  player.achievements.basic[row].push(new Achievement("1-4challenges2", achievementlabel(row, player.achievements.basic[row].length, "Reach a even more quarks while being in challenges 1 through 4"), [new NumRequirement(player.quarkstage.quarks, "1e64"), new InChallengeRequirement(player.challenges[0]), new InChallengeRequirement(player.challenges[1]), new InChallengeRequirement(player.challenges[2]), new InChallengeRequirement(player.challenges[3])], null, [new StaticEffect([player.challenges[0], player.challenges[1], player.challenges[2], player.challenges[3]], 5, EffectTypes.ChallengeScoreMult, null, () => "Multiplies Challenge 1 through 4 Score by another 5")]));
  player.achievements.basic[row].push(new Achievement("1-4challenges3", achievementlabel(row, player.achievements.basic[row].length, "These requirements are getting insane.(Must be in challenges 1-4)"), [new NumRequirement(player.quarkstage.quarks, "1e256"), new InChallengeRequirement(player.challenges[0]), new InChallengeRequirement(player.challenges[1]), new InChallengeRequirement(player.challenges[2]), new InChallengeRequirement(player.challenges[3])], null, [new StaticEffect([player.challenges[0], player.challenges[1], player.challenges[2], player.challenges[3]], 10, EffectTypes.ChallengeScoreMult, null, () => "This time the multiplier is 10 times!")]));
  player.achievements.basic[row].push(new Achievement("1-4challenges4", achievementlabel(row, player.achievements.basic[row].length, "The score mult may be going up but so is the requirement.(Must be in challenges 1-4)"), [new NumRequirement(player.quarkstage.quarks, "1e2048"), new InChallengeRequirement(player.challenges[0]), new InChallengeRequirement(player.challenges[1]), new InChallengeRequirement(player.challenges[2]), new InChallengeRequirement(player.challenges[3])], null, [new StaticEffect([player.challenges[0], player.challenges[1], player.challenges[2], player.challenges[3]], 5e5, EffectTypes.ChallengeScoreMult, null, () => "The multiplier is getting larger, now " + formatDecimal(new Decimal(1e5)) + " times!")]));
  player.achievements.basic[row].push(new Achievement("1-4challenges5", achievementlabel(row, player.achievements.basic[row].length, "Time for the largest reward and requirement.(Must be in challenges 1-4)"), [new NumRequirement(player.quarkstage.quarks, "1e16384"), new InChallengeRequirement(player.challenges[0]), new InChallengeRequirement(player.challenges[1]), new InChallengeRequirement(player.challenges[2]), new InChallengeRequirement(player.challenges[3])], null, [new StaticEffect([player.challenges[0], player.challenges[1], player.challenges[2], player.challenges[3]], 5e15, EffectTypes.ChallengeScoreMult, null, () => "The largest multiplier, " + formatDecimal(new Decimal(1e15)) + " times!")]));

  //Electron Milestones
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("1e24electrons", achievementlabel(row, player.achievements.basic[row].length, "Alvocadros Number"), [new NumRequirement(player.electronstage.electrons, "6.022e23")], null, [new FlavorEffect("Unlocks orbitals mechanic.")]));
  player.achievements.basic[row].push(new Achievement("1e32electrons", achievementlabel(row, player.achievements.basic[row].length, "Electron Power?"), [new NumRequirement(player.electronstage.electrons, "1e32")], null, [new StaticEffect(player.electronstage.clouds.power, 2, EffectTypes.UpgradeAmountMultiplier, null, () => "Electron Power Amount *2")]));
  player.achievements.basic[row].push(new Achievement("nucleonizeunlock", achievementlabel(row, player.achievements.basic[row].length, "Nucleonize"), [new NumRequirement(player.electronstage.electrons, "1e100")], null, [new FlavorEffect("Unlocks a new prestige layer with added mechanics. (Coming Soonish)")]));
  player.achievements.basic[row].push(new Achievement("1e128electrons", achievementlabel(row, player.achievements.basic[row].length, "How about some bonus electrons?"), [new NumRequirement(player.electronstage.electrons, "1e128")], null, [new StaticEffect(player.quarkstage.electrify, 2, EffectTypes.PrestigeMultiplicativeGain, null, () => "Electron Gain *2")]));
  player.achievements.basic[row].push(new Achievement("1e512electrons", achievementlabel(row, player.achievements.basic[row].length, "Electron Power is to weak"), [new NumRequirement(player.electronstage.electrons, "1e512")], null, [new StaticEffect(player.electronstage.clouds.power, 100, EffectTypes.UpgradeAmountMultiplier, null, () => "Electron Power Amount *100")]));
  player.achievements.basic[row].push(new Achievement("1e16384electrons", achievementlabel(row, player.achievements.basic[row].length, "A Nucleon Boost"), [new NumRequirement(player.electronstage.electrons, "1e16384")], null, [new StaticEffect(player.electronstage.nucleonize, 2.5, EffectTypes.PrestigeMultiplicativeGain, null, () => "Nucelon Gain *2.5")]));
  player.achievements.basic[row].push(new Achievement("1e65536electrons", achievementlabel(row, player.achievements.basic[row].length, "Anti-Electrons For The Win"), [new NumRequirement(player.electronstage.electrons, "1e65536")], null, [new StaticEffect(player.electronstage.nucleonize,10, EffectTypes.UpgradeSoftCapMultiplier, null, () => "(WIP) Increases anti-electron softcap by 10 times")]));

  //Nucleonize Milestones
  player.achievements.basic.push([]);
  row = player.achievements.basic.length - 1;
  player.achievements.basic[row].push(new Achievement("1nucleonize", achievementlabel(row, player.achievements.basic[row].length, "You made it, Congrats!!"), [new FunctionRequirement(() => player.stats.prestigeamounts.nucleonize >= 1, "Nucleonize 1 Time")], null, [new FlavorEffect("Lots of new Electron and Quark Upgrades")]));
  //var antielectronreward = new PrestigeReward(player.nucleonstage.antiverse.positrons, player.electronstage.nucleonize.rewards[0], (num) => Decimal.pow(num, .5));
  player.achievements.basic[row].push(new Achievement("10nucleonize", achievementlabel(row, player.achievements.basic[row].length, "Buying electron upgrades is getting repetative no?"), [new FunctionRequirement(() => player.stats.prestigeamounts.nucleonize >= 10, "Nucleonize 10 Times")], null, [new FlavorEffect("Electron upgrade autobuyer, yay!")]));//, new FunctionalEffect(() => player.electronstage.nucleonize.addreward(antielectronreward),() => player.electronstage.nucleonize.removereward(antielectronreward))]));
  player.achievements.basic[row].push(new Achievement("100nucleonize", achievementlabel(row, player.achievements.basic[row].length, "Getting Up There"), [new FunctionRequirement(() => player.stats.prestigeamounts.nucleonize >= 100, "Nucleonize 100 Times")], null, [new FlavorEffect("Challenge scores are no longer effected by nucleonize!")]));
  player.achievements.basic[row].push(new Achievement("250nucleonize", achievementlabel(row, player.achievements.basic[row].length, "I want progress"), [new FunctionRequirement(() => player.stats.prestigeamounts.nucleonize >= 250, "Nucleonize 250 Times")], null, [new FlavorEffect("New Mechanic Nucleon Split (WIP very likely to change)!")]));
}

function resetachievements() {
  achievementregistry.forEach((achieve, i) => {
    achieve.reset();
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