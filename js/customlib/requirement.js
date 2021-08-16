class NumRequirement{
    constructor(requiredobject , amount){
        this.requiredobject = requiredobject;
        this.amount = new Decimal(amount);
        this.requirementmulteffects = [];
        this.requirementmult = new Decimal(1);
    }

    hasRequirement(){
        return this.requiredobject.hasrequirement(this.finalamount);
    }

    get hasrequirement(){
        return this.hasRequirement();
    }

    get requirementtext(){
      return formatDecimalNormal(this.finalamount) + " " + this.requiredobject.displayname;
    }

    get progresstext(){
        return formatDecimalNormal(this.requiredobject.gained) + "/" + this.requirementtext;
    }

    get finalamount(){
        return this.amount.times(this.requirementmult);
    }

    recalculatemult(){
        this.requirementmult = new Decimal(1);
        this.requirementmulteffects.forEach(elem => {
            this.requirementmult = this.requirementmult.times(elem.value)
        });
    }

    applyeffect(effect){
        switch(effect.effecttype){
            case EffectTypes.RequirementMult:
                this.requirementmulteffects.push(effect);
                this.recalculatemult();
                break;
        }
    }

    removeeffect(effect){
        switch(effect.effecttype){
            case EffectTypes.RequirementMult:
                var ind = this.requirementmulteffects.indexOf(effect);
                if(ind > -1){
                    this.requirementmulteffects = this.requirementmulteffects.splice(ind, 1);
                    this.recalculatemult();
                }
                break;
        }
    }

    effectchanged(){
        this.recalculatemult();
    }
}

class TotalNumRequirement extends NumRequirement{
    constructor(requiredobject , amount){
        super(requiredobject, amount);
    }

    hasRequirement(){
        return this.requiredobject.hastotalrequirement(this.finalamount);
    }

}

class AchievementRequirement{
    constructor(requiredachievement){
        this.requiredachievement = requiredachievement;
    }

    hasRequirement(){
        return hasachievement(this.requiredachievement);
    }

    get hasrequirement(){
        return this.hasRequirement();
    }

    get requirementtext(){
      return "Achievement Obtained: " + this.requiredachievement;
    }
}

class InChallengeRequirement{
    constructor(requiredchallenge){
        this.requiredchallenge = requiredchallenge;
    }

    hasRequirement(){
        return this.requiredchallenge.in;
    }

    get hasrequirement(){
        return this.hasRequirement();
    }

    get requirementtext(){
      return "In Challenge: " + this.requiredchallenge.displayname;
    }
}

class ChallengeScoreRequirement{
    constructor(requiredchallenge, num){
        this.requiredchallenge = requiredchallenge;
        this.num = new Decimal(num);
    }
    
    hasRequirement(){
        return this.challenge.hasscore(this.num);
    }

    get challenge(){
        if(typeof this.requiredchallenge === "function")
            return this.requiredchallenge();
        else
            return this.requiredchallenge;
    }

    get hasrequirement(){
        return this.hasRequirement();
    }

    get requirementtext(){
      return "Challenge " + this.challenge.displayname + " Score: " + formatDecimalNormal(this.num);
    }
}

class ExponentialNumRequirement extends NumRequirement{
    constructor(requiredobject , baseamount, scaling){
        super(requiredobject, baseamount);
        this.baseamount = new Decimal(baseamount);
        this.scaling = new Decimal(scaling)
    }

    recalculatevalue(num){
        this.amount = this.baseamount.times(Decimal.pow(this.scaling, num))
    }
}

class FunctionRequirement{
    constructor(requiredfunc, reqtext){
        this.requiredfunc = requiredfunc;
        this.reqtext = reqtext;
    }

    hasRequirement(){
        return this.requiredfunc();
    }

    get hasrequirement(){
        return this.hasRequirement();
    }

    get requirementtext(){
      return this.reqtext;
    }
}