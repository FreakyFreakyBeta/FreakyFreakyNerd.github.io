function setupbasicnucelonplit(){
    player.nucleonstage.split = {};
    player.nucleonstage.split.neutrons = new Currency("neutron", "Neutrons", 0);
    player.nucleonstage.split.nucleondust = new Currency("nucleondust", "Nucleon Dust", 0);
    player.nucleonstage.split.protons = new Currency("proton", "Protons", 0);

    player.nucleonstage.split.protongenerator = new Producer("protongen", null, null,[new LinearProduction(player.nucleonstage.split.protons, 0, 0)], null,null,null);
    player.nucleonstage.split.protongenerator.bought = new Decimal(1);

    player.nucleonstage.split.neutrongenerator = new Producer("neutrongen", null, null,[new LinearProduction(player.nucleonstage.split.neutrons, 0, 0)], null,null,null);
    player.nucleonstage.split.neutrongenerator.bought = new Decimal(1);

    player.nucleonstage.split.gridinfo = {};
    player.nucleonstage.split.gridinfo.grid = new Board(10, 10, player.nucleonstage.split.nucleondust);
    player.nucleonstage.split.gridinfo.piecegenerator = new PieceGenerator("splitpiecegen", 1, 1, new ExponentialCost(getcurrency("neutron"), "10", "1.1"), {"width": new ExponentialCost(getcurrency("nucleondust"), "10", "10"),"height": new ExponentialCost(getcurrency("nucleondust"), "10", "10"),"effectmax": new ExponentialCost(getcurrency("nucleondust"), "10", "10"),"min0": new ExponentialCost(getcurrency("nucleondust"), "10", "10"),"max0": new ExponentialCost(getcurrency("nucleondust"), "10", "10"),"min1": new ExponentialCost(getcurrency("nucleondust"), "10", "10"),"max1": new ExponentialCost(getcurrency("nucleondust"), "10", "10"),"min2": new ExponentialCost(getcurrency("nucleondust"), "10", "10"),"max2": new ExponentialCost(getcurrency("nucleondust"), "10", "10")}, {}, [(level) => 1,(level) => 1,(level) => 1], [(level) => 1,(level) => 1,(level) => 1]);
}

function nucleonsplitsavedata(){
    var data = {};
    data.grid = player.nucleonstage.split.gridinfo.grid.savedata;
    return data;
}

function nucleonsplitload(data){
    if(data != undefined && data.grid != undefined)
        player.nucleonstage.split.gridinfo.grid.parse(data.grid);
}