function setupautobuyers() {
    player.autobuyers.push(new AutoBuyer("quark_prod_autobuy", player.quarkstage.producers, new AchievementRequirement("1000producers"), "Quark Producers"));
    player.autobuyers.push(new AutoBuyer("quark_boost_auto", player.quarkstage.upgrades, new AchievementRequirement("1000boosts"), "Quark Boosts"));
    player.autobuyers.push(new AutoBuyer("quarkauto", player.quarkstage.singletonupgrades, new AchievementRequirement("infinityquarks"), "Quark Upgrades"));
    player.autobuyers.push(new AutoBuyer("quarkspin_upgrades", player.electronstage.quarkspinupgrades, new AchievementRequirement("1e25_quark_spin"), "Quark Spin Boosts"));

    player.autobuyers.push(new AutoBuyer("electronauto", player.electronstage.upgrades, new AchievementRequirement("5nucleonize"), "Electron Upgrades"));
    player.autobuyers.push(new AutoBuyer("quark_spin_producer_auto", player.electronstage.quarkspinproducers, new AchievementRequirement("1000electrify"), "Quark Spin Producers"));

    
}