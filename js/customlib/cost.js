class Cost{
    constructor(costobject, startingcost, scaling){
        this.costobject = costobject;
        this.startingcost = new Decimal(startingcost);
        this.defaultscaling = new Decimal(scaling);
        this.scaling = new Decimal(scaling);
        this.cost = new Decimal(startingcost);
        this.scalingeffects = [];
    }

    recalculateeffectvalues(){
      this.recalculatescaling();
    }

    getmaxbuyable(amount){
      return new Decimal(-1);
    }

    recalculatescaling(){
      this.scaling = new Decimal(this.defaultscaling.minus(1));
      this.scalingeffects.forEach((item, i) => {
        this.scaling = this.scaling.times(item.value);
      });
      this.scaling = this.scaling.add(1)
    }

    applyeffect(effect){
      if(effect.effecttype == EffectTypes.PriceScaling){
        this.scalingeffects.push(effect);
        this.recalculatescaling();
      }
    }

    removeeffect(effect){
      if(effect.effecttype == EffectTypes.PriceScaling){
        this.scalingeffects.splice(this.scalingeffects.indexOf(effect), 1);
        this.recalculatescaling();
      }
    }

    recalculatecost(){}

    get hascost(){
        return this.costobject.has(this.cost);
    }

    subtractcost(){
      this.costobject.subtract(this.cost);
    }

    get description(){
      return formatDecimal(this.cost) + " " + this.costobject.displayname;
    }
}

class ExponentialCost extends Cost{
    recalculatecost(amount, buyamount){
      if(buyamount != undefined)
        this.cost = (new Decimal(1)).minus(Decimal.pow(this.scaling, buyamount)).divide((new Decimal(1)).minus(this.scaling)).times(Decimal.pow(this.scaling, amount)).times(this.startingcost);
      else
        this.cost = this.startingcost.times(Decimal.pow(this.scaling, amount));
      if(this.cost.lessThan(0))
        this.cost = this.startingcost.times(Decimal.pow(this.scaling, amount));
    }

    getmaxbuyable(amount){
      var amountavailable = this.costobject.amount;
      var sae = this.startingcost.times(Decimal.pow(this.scaling, amount));
      var buyamount = Decimal.log((sae.plus(amountavailable.times(this.scaling.minus(1)))).divide(sae), this.scaling);
      var oldbuyamount = Decimal.log(new Decimal(1).minus((new Decimal(1)).minus(this.scaling).times(amountavailable).divide(this.startingcost).divide(Decimal.pow(this.scaling, amount))), this.scaling);
      return Decimal.floor(buyamount);
    }
}

class LinearCost extends Cost{
    recalculatecost(amount, buyamount){
      if(buyamount != undefined)
        this.cost = this.startingcost.add(this.scaling.times(amount));
      else
        this.cost = this.startingcost.add(this.scaling.times(amount));
      if(this.cost.lessThan(0))
        this.cost = this.startingcost.add(this.scaling.times(amount));
    }

    getmaxbuyable(amount){
      var amountavailable = this.costobject.amount;
      return Decimal.floor(Decimal.log(new Decimal(1).minus((new Decimal(1)).minus(this.scaling).times(amountavailable).divide(this.startingcost).divide(Decimal.pow(this.scaling, amount))), this.scaling));
    }
}

class StaticCost extends Cost{
    constructor(costobject, cost){
      super(costobject, cost, "0");
      this.cost = cost;
    }

    recalculatecost(amount, buyamount){
      return;
    }
}
