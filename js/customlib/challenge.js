class Challenge {
  constructor(id, displayname, description, inchallengeeffects, rewards, maxdifficulty, startfunc, endfunc, basescorefunc, chalcoe, challengesynergies, basescoretext, unlockrequirements) {
    this.id = id;
    this.displayname = displayname;
    this.description = description;
    this.difficultylevel = 1;
    this.maxdifficulty = maxdifficulty;
    this.score = new Decimal();
    this.basescorefunc = basescorefunc;
    this.active = false;
    this.chalcoe = chalcoe;
    this.index = player.challenges.length;
    this.challengesynergies = challengesynergies;
    this.unlockrequirements = unlockrequirements;
    if (Array.isArray(inchallengeeffects))
      this.inchaleffects = inchallengeeffects;
    else
      this.inchaleffects = [inchallengeeffects];
    if (Array.isArray(rewards))
      this.rewards = rewards;
    else
      this.rewards = [rewards];
    this.in = false;
    this.startfunc = startfunc;
    this.endfunc = endfunc;
    this.basescoretext = basescoretext;
    this.basescore = new Decimal();

    this.scoremultipliereffects = [];
    this.scoremultiplier = new Decimal(1);

    this.updateinchaleffects();
    this.updaterewards();
  }

  get unlocked() {
    var out = true;
    this.unlockrequirements?.forEach(elem => { if (!elem.hasrequirement) out = false; });
    return out;
  }

  get basescoredescription() {
    return this.basescoretext;
  }

  get synergyvalues() {
    var text = "";
    for (var i = 0; i < this.challengesynergies.length; i++) {
      if (i > 0)
        text += ", " + this.challengesynergies[i];
      else
        text += this.challengesynergies[0];
    }
    return text;
  }

  reset() {
    this.difficultylevel = 1;
    this.score = new Decimal();
    this.updateinchaleffects();
    this.updaterewards();
    this.removerewards();
  }

  raisescore(value) {
    this.score = Decimal.pow(this.score, value);
  }

  save() {
    return [this.score, this.in, this.active];
  }

  parse(data) {
    if (data == undefined)
      return;
    if (data[0] != undefined)
      this.score = new Decimal(data[0]);
    if (data[1] != undefined)
      this.in = data[1];
    if (data[2] != undefined)
      this.active = data[2];
    this.updateinchaleffects();
    log(this.score);
    if (this.in) {
      this.inchaleffects.forEach((eff, i) => {
        eff.apply();
      });
      updaterequiredregistry.push(this);
      runningchallenges.push(this);
    }
    if (this.score.greaterThan(0)) {
      this.updaterewards();
      this.applyrewards();
    }
  }

  get activetext() {
    if (this.active)
      return "Active"
    return "Inactive"
  }

  get entertext(){
    if(this.in)
      return "Exit";
    return "Enter"
  }

  toggleinchallenge(){
    if(!this.in) {// && runningchallenges.length == 0){
      this.start();
      return;
    }
    if(this.in)
      this.exit();
  }

  toggleactive() {
    if (runningchallenges.length > 0)
      return;
    else
      this.active = !this.active;
  }

  getsynergyvalue(chalind) {
    if (this.challengesynergies != undefined && this.challengesynergies.length > chalind) {
      return this.challengesynergies[chalind];
    }
    return 1;
  }

  updateinchaleffects() {
    this.inchaleffects.forEach((chal, i) => {
      chal.recalculatevalue(this.difficultylevel);
    });
  }

  updaterewards() {
    this.rewards.forEach((reward, i) => {
      if (reward.recalculatevalue != undefined)
        reward.recalculatevalue(this.score);
    });
  }

  applyrewards() {
    this.rewards.forEach((reward, i) => {
      if (reward.apply != undefined) {
        if (this.score.greaterThanOrEqualTo(this.rewards[i - 1].minus(1)))
          reward.apply();
      }
    });
  }

  removerewards() {
    this.rewards.forEach((reward, i) => {
      if (reward.remove != undefined)
        reward.remove();
    });
  }

  hasscore(score){
    return this.score.greaterThanOrEqualTo(score);
  }

  start() {
    if (this.startfunc != undefined)
      this.startfunc();
    this.inchaleffects.forEach((eff, i) => {
      eff.apply();
    });
    forceeffectsupdate();
    updaterequiredregistry.push(this);
    this.in = true;
    runningchallenges.push(this);
  }

  exit() {
    this.inchaleffects.forEach((eff, i) => {
      eff.remove();
    });
    var ind = updaterequiredregistry.indexOf(this);
    if (ind > -1)
      updaterequiredregistry.splice(ind, 1);
    var ind2 = runningchallenges.indexOf(this);
    if (ind2 > -1)
      runningchallenges.splice(ind2, 1);
    this.in = false;
    if (this.newscore.greaterThan(this.score))
      this.score = this.newscore;
    this.newscore = undefined;
    this.updaterewards();
    this.applyrewards();
    forceeffectsupdate();
    if (this.endfunc != undefined)
      this.endfunc();
  }

  get calculatescore() {
    if (this.basescorefunc != undefined)
      this.basescore = this.basescorefunc();
    var score = this.basescore;
    //score = score.times(this.difficultyscoremultiplier);
    //score = score.times(this.synergyscoremultiplier);
    score = score.times(this.scoremultiplier);
    return score;
  }

  get difficultyscoremultiplier() {
    return Decimal.pow(this.chalcoe, (this.difficultylevel - 1));
  }

  get synergyscoremultiplier() {
    var chalsyn = 1;
    var amountin = 0;
    player.challenges.forEach((chal) => {
      if (chal.active) {
        chalsyn *= this.getsynergyvalue(chal.index);
        amountin += 1;
      }
    });
    return Decimal.pow(chalsyn, amountin);
  }

  tick() {
    this.newscore = this.calculatescore;
  }

  recalculatescoremult() {
    this.scoremultiplier = new Decimal(1);
    this.scoremultipliereffects.forEach(effect => {
      this.scoremultiplier = this.scoremultiplier.times(effect.value);
    });
  }

  effectchanged() {
    if (effectneedsrecalculated.indexOf(this) == -1) {
      effectneedsrecalculated.push(this);
    }
  }

  updateeffects() {
    this.recalculatescoremult();
  }

  applyeffect(effect) {
    switch (effect.effecttype) {
      case EffectTypes.ChallengeScoreMult:
        this.scoremultipliereffects.push(effect);
        this.recalculatescoremult();
        break;
    }
  }

  removeeffect(effect) {
    switch (effect.effecttype) {
      case EffectTypes.ChallengeScoreMult:
        var ind = this.scoremultipliereffects.indexOf(effect);
        if (ind > -1) {
          this.scoremultipliereffects.splice(ind, 1);
          this.recalculatescoremult();
        }
        break;
    }
  }

  get difficultyinformation() {
    return this.difficultylevel.toString() + "/" + this.maxdifficulty.toString();
  }

  increasedifficulty() {
    if (this.in || runningchallenges.length > 0)
      return;
    var buyamount = getbuyamount("challengedifficulty");
    this.difficultylevel += buyamount;
    if (this.difficultylevel > this.maxdifficulty || buyamount == -1)
      this.difficultylevel = this.maxdifficulty;
    this.updateinchaleffects();
  }

  decreasedifficulty() {
    if (this.in || runningchallenges.length > 0)
      return;
    var buyamount = getbuyamount("challengedifficulty");
    this.difficultylevel -= buyamount;
    if (this.difficultylevel < 1 || buyamount == -1)
      this.difficultylevel = 1;
    this.updateinchaleffects();
  }

  get effectsdescription() {
    var effects = "";
    for (var i = 1; i < this.rewards.length; i += 2) {
      if (this.score.greaterThan(this.rewards[i - 1])) {
        effects += this.rewards[i].geteffect();
        if (i != this.rewards.length - 1)
          effects += "\n";
      } else {
        effects += "Next Bonus Unlocked at " + formatDecimalNormal(this.rewards[i - 1]);
        return effects;
      }
    }
    return effects;
  }
}