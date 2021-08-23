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
}

function totalproducerbought(producers) {
  var amt = new Decimal();
  producers.forEach(prod => {
    amt = amt.add(prod.bought);
  });
  return amt;
}