class Currency{
    constructor(id, displayname, startingamount){
        this.id = id;
        this.displayname = displayname;
        this.startingamount = new Decimal(startingamount)
        this.amount = new Decimal(startingamount);
        this.gained = new Decimal();
        currencyregistry.push(this);
    }

    get iconpath(){
      return "images/currency/" + this.id + ".png";
    }

    get colorclass(){
      return "currency"+this.id+"display";
    }

    reset(){
      this.amount = new Decimal(this.startingamount)
      this.gained = new Decimal(0);
    }

    get saveData(){
        return this.save()
    }

    save(){
        return [this.amount.toString(),this.gained.toString()];
    }

    parse(data){
      if(data != undefined){
        if(data[0] != undefined)
            this.amount = Decimal.fromString(data[0]);
        if(data[1] != undefined)
          this.gained = Decimal.fromString(data[1]);
      }
      if(this.amount.lessThan(0))
        this.amount = new Decimal();
    }

    subtract(amount){
      this.removeamount(amount);
    }

    removeamount(amount){
        this.amount = this.amount.sub(amount)
    }

    add(val){
        this.addamount(val)
    }

    addamount(val){
        this.amount = this.amount.add(val)
        this.gained = this.gained.add(val);
    }

    has(amount){
        return this.amount.greaterThanOrEqualTo(amount);
    }

    hasrequirement(amount){
      return this.gained.greaterThanOrEqualTo(amount);
    }
}

class ExponentialGrowingCappedCurrency{
  constructor(id, displayname, startingamount, defaultincrease, defaultcap, effects){
      this.id = id;
      this.displayname = displayname;
      this.startingamount = new Decimal(startingamount)
      this.amount = new Decimal(startingamount);
      this.defaultcap = new Decimal(defaultcap);
      this.defaultincrease = new Decimal(defaultincrease);
      this.effects = effects;

      this.productionmult = new Decimal(1);
      this.productionmulteffects = [];

      this.capmult = new Decimal(1);
      this.capmulteffects = [];

      producerregistry.push(this);
  }

  recalculatecapmult(){
    this.capmult = new Decimal(1);
    this.capmulteffects.forEach(eff => {
      this.capmult = this.capmult.times(eff.value);
    });
  }

  recalculateproductionmult(){
    this.productionmult = new Decimal(1);
    this.productionmulteffects.forEach(eff => {
      this.productionmult = this.productionmult.times(eff.value);
    });
  }

  effectchanged() {
    if (effectneedsrecalculated.indexOf(this) == -1) {
      effectneedsrecalculated.push(this);
    }
  }

  updateeffects() {
    this.recalculateproductionmult();
    this.recalculatecapmult();
  }

  addbasedeffect(effect){
    effect.apply();
    this.effects.push(effect);
  }

  removebasedeffect(effect){
    effect.remove();
    var ind = this.effects.indexOf(effect);
    if (ind > -1) {
      this.effects.splice(ind, 1);
    }
  }

  applyeffect(effect){
    switch(effect.effecttype){
      case EffectTypes.CapacityMultiplier:
        this.capmulteffects.push(effect);
        this.recalculatecapmult();
        break;
      case EffectTypes.ProductionMultiplier:
        this.productionmulteffects.push(effect);
        this.recalculateproductionmult();
        break;
    }
  }

  removeeffect(effect){
    switch(effect.effecttype){
      case EffectTypes.CapacityMultiplier:
        var ind = this.capmulteffects.indexOf(effect);
        if (ind > -1) {
          this.capmulteffects.splice(ind, 1);
          this.recalculatecapmult();
        }
        break;
      case EffectTypes.ProductionMultiplier:
        var ind = this.productionmulteffects.indexOf(effect);
        if (ind > -1) {
          this.productionmulteffects.splice(ind, 1);
          this.recalculateproductionmult();
        }
        break;
    }
  }

  addamounteffect(effect){
    this.effects.push(effect);
  }

  produce(millis){
    this.add(Decimal.pow(this.increase, millis));
  }

  get iconpath(){
    return "images/specialcurrency/" + this.id + ".png";
  }

  get colorclass(){
    return "specialcurrency"+this.id;
  }

  get effectsdesc(){
    var out = "";
    if(this.effects.length > 0){
      out += "Effects:\n";
      this.effects
    }
    return out;
  }

  reset(){
    this.amount = new Decimal(this.startingamount);
  }

  get saveData(){
      return this.save()
  }

  save(){
      return [this.amount.toString()];
  }

  parse(data){
    if(data != undefined){
      if(data[0] != undefined)
          this.amount = Decimal.fromString(data[0]);
    }
    if(this.amount.lessThan(1))
      this.amount = new Decimal(1);
  }

  get cap(){
    return this.defaultcap.times(this.capmult);
  }
  get increase(){
    return (this.defaultincrease.minus(1)).times(this.productionmult).add(1);
  }

  get ratio(){
    return Math.floor((this.amount.divide(this.cap)).toNumber()*10000)/100;
  }

  get amountdescription(){
    return formatDecimalOverride(this.amount, 3) + "/" + formatDecimalNormal(this.cap);
  }

  get increasedescription(){
    return "*" + formatDecimalOverride(this.increase, 3) + "/s";
  }

  add(val){
      this.addamount(val)
  }

  addamount(val){
    this.amount = this.amount.times(val);
    if(this.amount.greaterThan(this.cap))
      this.amount = this.cap;
  }

  subtract(amount){
    this.removeamount(amount);
  }

  removeamount(amount){
      this.amount = this.amount.divide(amount)
  }

  setcap(value){
    this.cap = value;
  }

  has(amount){
      return this.amount.greaterThanOrEqualTo(amount);
  }

  hasrequirement(amount){
    return this.amount.greaterThanOrEqualTo(amount);
  }
}
