function setupbasicnucelonplit(){
    player.nucleonstage.split = {};
    player.nucleonstage.split.neutrons = new Currency("neutron", "Neutrons", 0);
    player.nucleonstage.split.neutrondust = new Currency("neutrondust", "Neutron Dust", 0);
    player.nucleonstage.split.protons = new Currency("proton", "Protons", 0);

    player.nucleonstage.split.protongenerator = new Producer("protongen", null, null,[new LinearProduction(player.nucleonstage.split.protons, 0, 0)], null,null,null);
    player.nucleonstage.split.protongenerator.bought = new Decimal(1);

    player.nucleonstage.split.neutrongenerator = new Producer("neutrongen", null, null,[new LinearProduction(player.nucleonstage.split.neutrons, 0, 0)], null,null,null);
    player.nucleonstage.split.neutrongenerator.bought = new Decimal(1);

    player.nucleonstage.split.gridinfo = {};
    player.nucleonstage.split.gridinfo.grid = new Board(10, 10, player.nucleonstage.split.neutrondust);
    player.nucleonstage.split.gridinfo.piecegenerator = new PieceGenerator("splitpiecegen", 1, 1, new ExponentialCost(getcurrency("neutron"), "10", "1.1"), {"width": new HyperExponentialCost(getcurrency("neutrondust"), "10", "10", "3"),"height": new HyperExponentialCost(getcurrency("neutrondust"), "10", "10", 3),"effectmax": new HyperExponentialCost(getcurrency("neutrondust"), "10", "10", 1.5),"min0": new HyperExponentialCost(getcurrency("neutrondust"), "10", "10", 1.5),"max0": new HyperExponentialCost(getcurrency("neutrondust"), "10", "10", 2),"min1": new HyperExponentialCost(getcurrency("neutrondust"), "10", "10", 1.5),"max1": new HyperExponentialCost(getcurrency("neutrondust"), "10", "10", 2),"min2": new HyperExponentialCost(getcurrency("neutrondust"), "10", "10", 1.5),"max2": new HyperExponentialCost(getcurrency("neutrondust"), "10", "10", 2)}, {"width": 10, "height":10}, [(level) => 1 + level * .25,(level) => 1 + level * .05,(level) => 1 + level * .01], [(level) => 1 + level * .5,(level) => 1 + level * .1,(level) => 1 + level * .02], "splitupg");
}

function resetnucleonsplit(hard) {
    resetnucleonsplitgrid();
    player.nucleonstage.split.neutrons.reset(hard);
    player.nucleonstage.split.neutrondust.reset(hard);
    player.nucleonstage.split.protons.reset(hard);
}

function resetnucleonsplitgrid(){
    player.nucleonstage.split.gridinfo.grid.reset();
    setdefaultnucleonsplitpieces();
}

function setdefaultnucleonsplitpieces(){
    player.nucleonstage.split.gridinfo.grid.addpendingpiece(new EffectsBoardPiece([[1]],"key", {"neutrongenbase": [1,1,1]}));
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