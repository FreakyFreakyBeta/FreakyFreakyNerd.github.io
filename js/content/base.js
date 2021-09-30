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
  setuphydrogenhill();
  setupbasicantiverse();

  setupautobuyers();
  setpieceupgradeeffects();
  setdefaultnucleonsplitpieces();
}

function totalproducerbought(producers) {
  var amt = new Decimal();
  producers.forEach(prod => {
    amt = amt.add(prod.bought);
  });
  return amt;
}

function totalupgradebought(upgrades) {
  var amt = new Decimal();
  upgrades.forEach(upg => {
    amt = amt.add(upg.bought);
  });
  return amt;
}