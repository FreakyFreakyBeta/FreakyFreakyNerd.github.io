class LinearProduction {
  constructor(productionobject, productionper, startingproduction) {
    if (typeof productionobject === 'function') {
      afterGameSetup.push(() => this.productionobject = productionobject())
    } else {
      this.productionobject = productionobject;
    }
    if (startingproduction != undefined)
      this.startingproduction = new Decimal(startingproduction);
    else
      this.startingproduction = new Decimal(0);
    this.productionincrease = new Decimal(productionper);
    this.production = new Decimal(startingproduction);
    this.additioneffects = [];
    this.multipliereffects = [];
    this.exponentialeffects = [];
    this.staticeffects = [];
    this.additionproduction = new Decimal(0);
    this.multiplier = new Decimal(1);
    this.exponent = new Decimal(1);
    this.staticproduction = new Decimal(0);
    this.queuedamount = new Decimal();
  }

  getalleffects(){
    var out = [];
    out.push(this.additioneffects);
    out.push(this.multipliereffects);
    out.push(this.exponentialeffects);
    out.push(this.staticeffects);
    return out;
  }

  removealleffects(){
    this.multipliereffects = [];
    this.additioneffects = [];
    this.exponentialeffects = [];
    this.staticeffects = [];
    this.recalculateeffectvalues();
  }

  recalculateproductionaddition() {
    this.additionproduction = new Decimal(0);
    this.additioneffects.forEach((effect, i) => {
      this.additionproduction = this.additionproduction.add(effect.value);
    });
  }

  recalculateproductionexponential() {
    this.exponent = new Decimal(1);
    this.exponentialeffects.forEach((effect, i) => {
      this.exponent = this.exponent.times(effect.value);
    });
  }

  recalculateproductionmultiplier() {
    this.multiplier = new Decimal(1);
    this.multipliereffects.forEach((effect, i) => {
      this.multiplier = this.multiplier.times(effect.value);
    });
  }
  
  recalculatestaticproduction(){
    this.staticproduction = new Decimal();
    this.staticeffects.forEach(effect => {
      this.staticproduction = this.staticproduction.add(effect.value);
    });
  }

  recalculateeffectvalues() {
    this.recalculateproductionaddition();
    this.recalculateproductionmultiplier();
    this.recalculateproductionexponential();
    this.recalculatestaticproduction();
    this.recalculateproduction(this.queuedamount);
  }

  recalculateproduction(amount) {
    this.queuedamount = amount;
    this.production = this.startingproduction.add(this.staticproduction).add(this.productionper.times(amount));
  }

  produce(prodratio) {
    this.productionobject.add(this.production.times(prodratio));
  }

  getbestprodratio(ratio){
    if(this.productionper.greaterThan(0))
      return ratio;
    if(this.productionobject.amount.lessThanOrEqualTo(0))
      return 0;
    var temp = this.productionobject.amount.divide(this.production).times(-1);
    if(temp.lessThan(ratio))
      return temp;
  }

  get productionper() {
    return Decimal.pow((this.productionincrease.add(this.additionproduction)).times(this.multiplier), this.exponent);
  }

  applyeffect(effect) {
    if (effect.effecttype == EffectTypes.ProducerBaseProduction) {
      this.additioneffects.push(effect);
      this.recalculateproductionaddition();
    }
    if (effect.effecttype == EffectTypes.ProducerMultiplierProduction) {
      this.multipliereffects.push(effect);
      this.recalculateproductionmultiplier();
    }
    if (effect.effecttype == EffectTypes.ProducerExponentialProduction) {
      this.exponentialeffects.push(effect);
      this.recalculateproductionexponential();
    }
    if (effect.effecttype == EffectTypes.ProducerStaticProduction) {
      this.staticeffects.push(effect);
      this.recalculatestaticproduction();
    }
    this.recalculateproduction(this.queuedamount);
  }


  removeeffect(effect) {
    if (effect.effecttype == EffectTypes.ProducerBaseProduction) {
      var ind = this.additioneffects.indexOf(effect);
      if (ind > -1) {
        this.additioneffects.splice(ind, 1);
        this.recalculateproductionaddition();
        console.log("Remove", ind, this.additionproduction);
      }
    }
    if (effect.effecttype == EffectTypes.ProducerMultiplierProduction) {
      var ind = this.multipliereffects.indexOf(effect);
      if (ind > -1) {
        this.multipliereffects.splice(ind, 1);
        this.recalculateproductionmultiplier();
      }
    }
    if (effect.effecttype == EffectTypes.ProducerExponentialProduction) {
      var ind2 = this.exponentialeffects.indexOf(effect);
      if (ind2 > -1) {
        this.exponentialeffects.splice(ind2, 1);
        this.recalculateproductionexponential();
      }
    }
    if (effect.effecttype == EffectTypes.ProducerStaticProduction) {
      var ind2 = this.staticeffects.indexOf(effect);
      if (ind2 > -1) {
        this.staticeffects.splice(ind2, 1);
        this.recalculatestaticproduction();
      }
    }
    this.recalculateproduction(this.queuedamount);
  }
}
