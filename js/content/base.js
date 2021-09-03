function setupGame() {
  setupbasicquarkstage();
  setupbasicelectronstage();
  setupbasicnucleonstage();

  setupquarkproducers();
  setupbasicquarkupgrades();
  setupbasicquarksingletonupgrades();

  setupquarkspinproducers();
  setupbasicelectronupgrades();

  setupbasicelectroncloud();
  
  setupchallenges();
  setupbasicquarkspinupgrades();

  setupstage2quarksingletonupgrades();

  setupbasicelectronupgradesstage2();

  //Post Nucleonize
  setupnucleonproducers();
  setupbasicnucleonupgrades();

  setupbasicnucleonsingletonupgrades();

  setupbasicnucelonplit();
  setupbasicantiverse();

  setupautobuyers();
  setpieceupgradeeffects();
  player.nucleonstage.split.gridinfo.grid.addpendingpiece(new EffectsBoardPiece([[1]],"key", ["neutrongenbase"], [[1,1,1]]));
}

function totalproducerbought(producers) {
  var amt = new Decimal();
  producers.forEach(prod => {
    amt = amt.add(prod.bought);
  });
  return amt;
}