class PieceGenerator {
    constructor(id, basewidth, baseheight, newpiececost, upgradecosts, upgrademaxes, minfuncs, maxfuncs, buykey, board) {
        this.id = id;
        this.newpiececost = newpiececost;
        this.boughtpieces = 0;
        this.upgradecosts = upgradecosts;
        this.upgrademaxes = upgrademaxes;
        this.minfuncs = minfuncs;
        this.maxfuncs = maxfuncs;
        this.basewidth = basewidth;
        this.baseheight = baseheight;
        this.setuplevels();
        this.buykey = buykey;
        this.board = board;
        this.typeran = new Random();
        this.effectran = new Random();

        updaterequiredregistry.push(this)

        this.possibletypes = [];
        this.possibleeffects = {};

        this.reset = async (gen) => {
            console.log("gen"+gen.id);
            if (player.options.confirmations["gen"+gen.id]) {
              var confirm = await confirmtest("Reset Piece Costs, and keep all Upgrades bought with dust, but automatically scraps all pieces with a multiplier. Will also make the Generator go on cooldown!");
              if (!confirm)
                return false;
            }
            gen.boughtpieces = 0;
            gen.board.scrapall(gen.getupgradevalue("scrapmult"));
            return true;
          }
    }

    prestige(){
        this.reset(this);
    }


    setuplevels(){
        this.upgradelevels = { "width": new Decimal(this.basewidth), "height": new Decimal(this.baseheight), "effectmax": new Decimal(1) };
        for (var i = 0; i < this.minfuncs.length; i++) {
            this.upgradelevels["min" + i] = new Decimal();
            this.upgradelevels["max" + i] = new Decimal();
        }
        this.upgradelevels = {...this.upgradelevels, "scrapmult" : new Decimal(2)}
    }

    reset(hard){
        this.setuplevels();
        this.boughtpieces = 0;
        this.tick();
    }

    get savedata(){
        return [this.boughtpieces, this.upgradelevelssave]
    }

    parse(data){
        if(data == undefined)
            return;
        if(data[0] != undefined)
            this.boughtpieces = data[0];
        if(data[1] != undefined)
            this.parselevels(data[1]);
        
        this.tick();
    }

    parselevels(data){
        var split = data.split(',');
        this.types.forEach((type, i) => {
            if(i < split.length - 1)
                this.upgradelevels[type] = new Decimal(split[i]);
        })
    }

    get upgradelevelssave(){
        var out = "";
        this.types.forEach((type, i) =>{
            out += this.upgradelevels[type].toString();
            if(i < this.types.length)
                out += ","
        })
        return out;
    }

    tick() {
        this.updatepiececost();
        this.updateupgradecosts();
    }

    addpossibletype(type){
        if(this.possibletypes.indexOf(type) > 0)
            return;
        this.possibletypes.push(type);
        this.possibleeffects[type] = [];
    }

    addpossibleeffect(type, effect, amount = 1){
        if(this.possibletypes.indexOf(type) < 0)
            this.addpossibletype(type);
        for(var i = 0; i < amount; i++)
            this.possibleeffects[type].push(effect);
    }

    removepossibleeffect(type, effect, amount = 1){
        if(this.possibletypes.indexOf(type) < 0)
            return
        this.possibleeffects[type] = undefined;
    }

    getupgradelevel(type) {
        var ind = parseInt(type.slice(3));
        if (type.includes("min"))
            return this.getmincapped(ind) ? formatDecimalOverride(this.getminvalue(ind), 2) + "(" + formatDecimalOverride(this.getuncappedminvalue(ind), 2) + ")" : formatDecimalOverride(this.getminvalue(ind), 2);
        if (type.includes("max") && !type.includes("effect"))
            return formatDecimalOverride(this.getmaxvalue(ind), 2);
        if (this.upgradelevels[type] != undefined)
            return formatDecimalNormal(this.upgradelevels[type]);
    }

    getupgradevalue(type){
        return this.upgradelevels[type];
    }

    getmincapped(ind) {
        return this.getuncappedminvalue(ind) > this.getmaxvalue(ind);
    }

    getminvalue(ind) {
        var max = this.getmaxvalue(ind);
        var min = this.getuncappedminvalue(ind);
        if (min > max)
            return max;
        return min;
    }

    getuncappedminvalue(ind) {
        return this.minfuncs[ind](this.upgradelevels["min" + ind]);
    }

    getmaxvalue(ind) {
        return this.maxfuncs[ind](this.upgradelevels["max" + ind])
    }

    get types() {
        var out = [];
        for (let [key, value] of Object.entries(this.upgradelevels)) {
            out.push(key);
        }
        return out;
    }

    buyupgrade(type) {
        if (this.canbuyupgrade(type)) {
            this.upgradelevels[type] = this.upgradelevels[type].add(this.buyamount(type));
            this.upgradecosts[type].subtractcost();
            this.updateupgradecosts();
        }
    }

    getupgradecost(type) {
        if (this.upgradecosts[type] != undefined){
            if(this.upgrademaxes[type] != undefined && this.ismaxbuyable(type))
                return "Maxxed"
            return this.upgradecosts[type].description;
        }
    }

    ismaxbuyable(type){
        return this.upgradelevels[type].greaterThanOrEqualTo(this.upgrademaxes[type]);
    }

    canbuyupgrade(type) {
        return this.upgradecosts[type].hascost;
    }

    updateupgradecosts() {
        for (let [key, value] of Object.entries(this.upgradelevels)) {
            this.upgradecosts[key].recalculatecost(value, this.buyamount(key))
        }
    }

    buyamount(type) {
        var amt;
        if (player.options.buyamounts[this.buykey] == -1) {
            var max = this.getmaxbuyable(type);
            if (max.lessThanOrEqualTo(new Decimal(0)))
                return new Decimal(1);
            amt = max;
        }
        else{
            amt = new Decimal(player.options.buyamounts[this.buykey]);
        }
        if(this.upgrademaxes[type] != undefined && this.upgradelevels[type].add(amt).greaterThan(this.upgrademaxes[type]))
            amt = new Decimal(this.upgrademaxes[type]).minus(this.upgradelevels[type]);
        return amt;
    }

    getmaxbuyable(type) {
        var maxamount = this.upgradecosts[type].getmaxbuyable(this.upgradelevels[type]);
        return maxamount;
    }

    getmaxeffects() {
        return this.upgradelevels["effectmax"];
    }

    getmaxwidth() {
        return this.upgradelevels["width"]
    }

    getmaxheight() {
        return this.upgradelevels["height"]
    }

    buypiece() {
        if (this.newpiececost.hascost) {
            this.boughtpieces += 1;
            this.newpiececost.subtractcost();
            this.updatepiececost();
            return this.generatepiece();
        }
        return undefined;
    }

    bulkbuypieces(){
        var tmp = [];
        var i = 0;
        while(this.newpiececost.hascost){
            tmp.push(this.buypiece())
            i++;
            if(i > 100)
                break;
        }
        return tmp;
    }

    get piececost() {
        return this.newpiececost.description;
    }

    updatepiececost() {
        this.newpiececost.recalculatecost(this.boughtpieces, 1)
    }

    getmins() {
        var mins = [];
        for (var i = 0; i < this.minfuncs.length; i++) {
            mins.push(this.minfuncs[i](this.upgradelevels["min" + i]));
        }
        return mins;
    }

    getmaxs() {
        var maxs = [];
        for (var i = 0; i < this.maxfuncs.length; i++) {
            maxs.push(this.maxfuncs[i](this.upgradelevels["max" + i]));
        }
        return maxs;
    }

    generatepiece() {
        var shape = generatepieceshape(1, 1, this.getmaxwidth(), this.getmaxheight());
        var type = this.generatetype();
        var effectamounts = generateeffectamounts(this.getmaxeffects());
        var effects = {};
        if(effectamounts >= possibleeffects[type].length)
        {
            possibleeffects[type].forEach(elem => {
                effects[elem] = generateweights(this.getmins(), this.getmaxs());
            });
        }else{
            for(var i = 0; i < effectamounts; i++){
                var temp = true
                var count = 0
                while (temp && count  < 1000){
                    var eff = this.generateeffecttype(type)
                    if(effects[eff] == undefined){
                        effects[eff] = generateweights(this.getmins(), this.getmaxs());
                        temp = false;
                    }
                    count++;
                }
            }
        }
        return new EffectsBoardPiece(shape, type, effects);
    }

    getupgradename(type) {
        if (generatorupgradenames[type] != undefined)
            return generatorupgradenames[type];
        return "No Name"
    }

    generatetype() {
        return this.possibletypes[this.typeran.nextInt(0, this.possibletypes.length - 1)];
    }

    generateeffecttype(type) {
        return this.possibleeffects[type][this.effectran.nextInt(0, this.possibleeffects[type].length - 1)];
    }
}
generatorupgradenames = {
    "width": "Maximum Piece Width",
    "height": "Maximum Piece Height",
    "min0": "Weight 1 Minimum Value (Generally Base Value)",
    "min1": "Weight 2 Minimum Value (Generally Multipler to Effect Value)",
    "min2": "Weight 3 Minimum Value (Generally Power to Effect Value)",
    "max0": "Weight 1 Maximum Value (Generally Base Value)",
    "max1": "Weight 2 Maximum Value (Generally Multipler to Effect Value)",
    "max2": "Weight 3 Maximum Value (Generally Power to Effect Value)",
    "effectmax": "Maximum Amount of unique Effects On Each Piece",
    "scrapmult": "Multiplier to Scrap When Reseting Piece Price"
}

function setpieceupgradeeffects() {
    //Reference Only No Actual Use
    possibleeffects = {
        "white": ["neutrongenbase", "neutrongenmult", "neutrongenpow"],
        "red": ["protongenbase", "protongenmult", "protongenpow"],
        "orange": ["multorbonus", "acceleronbonus"],
        "yellow": ["electrongainbase", "electrongainmult", "electrongainpow"],
        "green": [""],
        "blue": [""]
    }

    effectfunctions = {
        "neutrongenbase": (blocks, weights, level) => new Decimal(Math.pow(weights[0]*blocks, 10) * Math.pow(weights[0]*blocks * weights[1]*blocks + 1, weights[2])*(blocks + Math.pow(1.5, blocks*level))),
        "neutrongenmult": (blocks, weights, level) => new Decimal(1 + Math.pow((weights[0]/10+.1) * (weights[1]/100+1), weights[2]/1000 + 1)*Math.pow(1.1, (blocks-1)*level)),
        "neutrongenpow": (blocks, weights, level) => new Decimal(Math.pow((weights[0]/100+1) * (weights[1]/1000 + 1), weights[2]/10000 )*Math.pow(1.01, blocks*level)),
        "protongenbase": (blocks, weights, level) => new Decimal(Math.pow(weights[0] * weights[1], weights[2])*(blocks + Math.pow(1.5, blocks*level))),
        "protongenmult": (blocks, weights, level) => new Decimal((1 + Math.pow((weights[0]/10+.1) * (weights[1]/100+1), weights[2]/1000 + 1))*(blocks * Math.pow(1.1, (blocks)*level))),
        "protongenpow": (blocks, weights, level) => new Decimal(Math.pow((weights[0]/100+1) * (weights[1]/1000+1), weights[2]/10000 + 1)*Math.pow(1.01, blocks*level)),
        "multorbonus": (blocks, weights, level) => new Decimal(1 + Math.pow((weights[0]/10+1) * (weights[1]/100+1), weights[2]/1000 + 1)*Math.pow(1.5, blocks*level)),
        "acceleronbonus": (blocks, weights, level) => new Decimal(Math.pow(weights[0] * weights[1], weights[2])*Math.pow(1.5, blocks*level)),
        "electrongainbase": (blocks, weights, level) => new Decimal(Math.pow(weights[0] * weights[1], weights[2])*Math.pow(1.5, blocks*level)),
        "electrongainmult": (blocks, weights, level) => new Decimal(1 + Math.pow((weights[0]/10+1) * (weights[1]/100+1), weights[2]/1000 + 1)*Math.pow(1.5, blocks*level)),
        "electrongainpow": (blocks, weights, level) => new Decimal(Math.pow((weights[0]/100+1) * (weights[1]/1000+1), weights[2]/10000 + 1)*Math.pow(1.01, blocks*level)),
    }
    effectdescriptions = {
        "neutrongenbase": (obj) => "Neutron Generation + " + formatDecimalOverride(obj.value, 2),
        "neutrongenmult": (obj) => "Neutron Generation * " + formatDecimalOverride(obj.value, 2),
        "neutrongenpow": (obj) => "Neutron Generation ^ " + formatDecimalOverride(obj.value, 2),
        "protongenbase": (obj) => "Proton Generation + " + formatDecimalOverride(obj.value, 2),
        "protongenmult": (obj) => "Proton Generation * " + formatDecimalOverride(obj.value, 2),
        "protongenpow": (obj) => "Proton Generation ^ " + formatDecimalOverride(obj.value, 2),
        "multorbonus": (obj) => "Free Multors: " + formatDecimalOverride(obj.value, 2),
        "acceleronbonus": (obj) => "Free Accelerons: " + formatDecimalOverride(obj.value, 2),
        "electrongainbase": (obj) => "Electron Gain + " + formatDecimalOverride(obj.value, 2),
        "electrongainmult": (obj) => "Electron Gain * " + formatDecimalOverride(obj.value, 2),
        "electrongainpow": (obj) => "Electron Gain ^ " + formatDecimalOverride(obj.value, 2)
    }
    effectobjects = {
        "neutrongenbase": () => player.nucleonstage.split.neutrongenerator,
        "neutrongenmult": () => player.nucleonstage.split.neutrongenerator,
        "neutrongenpow": () => player.nucleonstage.split.neutrongenerator,
        "protongenbase": () => player.nucleonstage.split.protongenerator,
        "protongenmult": () => player.nucleonstage.split.protongenerator,
        "protongenpow": () => player.nucleonstage.split.protongenerator,
        "multorbonus": () => getupgrade("qu5"),
        "acceleronbonus": () => getupgrade("qu0"),
        "electrongainbase": () => getprestige("electrify"),
        "electrongainmult": () => getprestige("electrify"),
        "electrongainpow": () => getprestige("electrify")
    }
    effecttypesdef = {
        "neutrongenbase": EffectTypes.ProducerBaseProduction,
        "neutrongenmult": EffectTypes.ProducerMultiplierProduction,
        "neutrongenpow": EffectTypes.ProducerExponentialProduction,
        "protongenbase": EffectTypes.ProducerBaseProduction,
        "protongenmult": EffectTypes.ProducerMultiplierProduction,
        "protongenpow": EffectTypes.ProducerExponentialProduction,
        "multorbonus": EffectTypes.UpgradeBonusLevels,
        "acceleronbonus": EffectTypes.UpgradeBonusLevels,
        "electrongainbase": EffectTypes.PrestigeBaseGain,
        "electrongainmult": EffectTypes.PrestigeMultiplicativeGain,
        "electrongainpow": EffectTypes.PrestigeExponentialGain
    }
}

var effectamountrandom = new Random(657493);
function generateeffectamounts(max) {
    return effectamountrandom.nextInt(1, max);
}

var weightsrandom = new Random(18679508);
function generateweights(minweights, maxweights) {
    var weights = [];
    for (var i = 0; i < minweights.length; i++) {
        weights.push(weightsrandom.nextFloat(minweights[i], maxweights[i]));
    }
    return weights;
}


function generatepieceshape(minwidth, minheight, maxwidth, maxheight) {
    var rawshape = generaterawpieceshape(minwidth, minheight, maxwidth, maxheight);
    var shape = cleanshape(rawshape);
    if (shape == undefined)
        return generatepieceshape(minwidth, minheight, maxwidth, maxheight);
    return shape;
}

var pieceshaperan = new Random();
function generaterawpieceshape(minwidth, minheight, maxwidth, maxheight) {
    var width = pieceshaperan.nextInt(minwidth, maxwidth);
    var height = pieceshaperan.nextInt(minheight, maxheight);
    var shape = [];
    for (var y = 0; y < height; y++) {
        var temp = [];
        for (var x = 0; x < width; x++) {
            var ran = pieceshaperan.next()
            if (ran < .8)
                temp.push(1);
            else
                temp.push(0);
        }
        shape.push(temp);
    }
    return shape;
}
function cleanshape(shape) {
    shape = verticalshapecleanup(shape);
    shape = horizontalshapecleanup(shape);
    return shape;
}

function verticalshapecleanup(shape) {
    var inv = [];
    for (var i = 0; i < shape.length; i++) {
        var valid = false;
        shape[i].forEach(elem => {
            if (elem > 0) {
                valid = true;
                return;
            }
        });
        if (!valid)
            inv.push(i);
        else
            break;
    }
    for (var i = shape.length - 1; i > -1; i--) {
        var valid = false;
        shape[i].forEach(elem => {
            if (elem > 0) {
                valid = true;
                return;
            }
        });
        if (!valid)
            inv.push(i);
        else
            break;
    }
    var removed = 0;
    inv.forEach(val => {
        var ind = val - removed;
        shape.splice(ind, 1);
        removed++;
    });
    return shape;
}

function horizontalshapecleanup(shape) {
    if (shape[0] == undefined)
        return undefined;
    var inv = [];
    for (var i = 0; i < shape[0].length; i++) {
        var vd = false;
        for (var t = 0; t < shape.length; t++) {
            if (shape[t][i] > 0) {
                vd = true;
                break;
            }
        }
        if (!vd)
            inv.push(i);
        else
            break;
    }
    for (var i = shape[0].length - 1; i > -1; i--) {
        var vd = false;
        for (var t = 0; t < shape.length; t++) {
            if (shape[t][i] > 0) {
                vd = true;
                break;
            }
        }
        if (!vd)
            inv.push(i);
        else
            break;
    }
    var removed = 0;
    inv.forEach(val => {
        var ind = val - removed;
        for (var id = 0; id < shape.length; id++) {
            shape[id].splice(ind, 1);
        }
        removed++;
    });
    return shape;
}

