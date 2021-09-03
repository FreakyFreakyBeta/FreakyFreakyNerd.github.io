class PieceGenerator{
    constructor(id, basewidth, baseheight, newpiececost, upgradecosts, upgrademaxes, minfuncs, maxfuncs){
        this.id = id;
        this.newpiececost = newpiececost;
        this.boughtpieces = 0;
        this.upgradecosts = upgradecosts;
        this.upgrademaxes = upgrademaxes;
        this.minfuncs = minfuncs;
        this.maxfuncs = maxfuncs;
        this.upgradelevels = { "width": basewidth, "height": baseheight, "effectmax" : 1};
        for(var i = 0; i < this.minfuncs.length; i++){
            this.upgradelevels["min" + i] = 1;
            this.upgradelevels["max" + i] = 1;
        }
    }

    getupgradelevel(type){
        if(this.upgradelevels[type] != undefined)
            return formatDecimalNormal(this.upgradelevels[type]);
    }

    get types(){
        var out = [];
        for (let [key, value] of Object.entries(this.upgradelevels)){
            out.push(key);
        }
        return out;
    }

    buyupgrade(type){
        if(this.canbuyupgrade(type)){
            this.upgradelevels[type] += 1;
            this.upgradecosts[type].subtractcost();
            this.updateupgradecosts();
        }
    }
    
    getupgradecost(type){
        if(this.upgradecosts[type] != undefined)
            return this.upgradecosts[type].description;
    }

    canbuyupgrade(type){
        return this.upgradecosts[type].hascost;
    }

    updateupgradecosts(){
        for (let [key, value] of Object.entries(this.upgradelevels)){
            this.upgradecosts[key].recalculatecost(value, 1)
        }
    }

    getmaxeffects(){
        return this.upgradelevels["effectmax"];
    }

    getmaxwidth(){
        return this.upgradelevels["width"]
    }

    getmaxheight(){
        return this.upgradelevels["height"]
    }
    
    buypiece(){
        if(this.newpiececost.hascost){
            this.boughtpieces += 1;
            this.newpiececost.subtractcost();
            this.updatepiececost();
            return this.generatepiece();
        }
        return undefined;
    }

    get piececost(){
        return this.newpiececost.description;
    }

    updatepiececost(){
        this.newpiececost.recalculatecost(this.boughtpieces, 1)
    }

    getmins(){
        var mins = [];
        for(var i = 0; i < this.minfuncs.length; i++){
            mins.push(this.minfuncs[i](this.upgradelevels["min" + i]));
        }
        return mins;
    }

    getmaxs(){
        var maxs = [];
        for(var i = 0; i < this.maxfuncs.length; i++){
            maxs.push(this.maxfuncs[i](this.upgradelevels["max" + i]));
        }
        return maxs;
    }

    generatepiece(){
        var shape = generatepieceshape(1, 1, this.getmaxwidth(), this.getmaxheight());
        var type = generatetype();
        var effectamounts = generateeffectamounts(this.getmaxeffects());
        var weights = [];
        var effecttypes = [];
        for(var i = 0; i < effectamounts; i++){
            weights.push(generateweights(this.getmins(), this.getmaxs()));
            effecttypes.push(generateeffecttype(type));
        }
        return new EffectsBoardPiece(shape, type, effecttypes, weights);
    }

    getupgradename(type){
        if(generatorupgradenames[type] != undefined)
            return generatorupgradenames[type];
        return "No Name"
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
    "effectmax": "Maximum Amount of Effects On Each Piece"
}

function setpieceupgradeeffects(){
    possibleeffects = {
        "white" : ["neutrongenbase"],
        "red" : ["protongenbase"],
        "orange" : ["protongenbase"],
        "yellow" : ["protongenbase"],
        "green" : ["protongenbase"],
        "blue" : ["protongenbase"]
    }

    effectfunctions = {
        "neutrongenbase": (blocks, weights, level) => {return new Decimal(Decimal.pow((new Decimal(weights[0])).times(weights[1]), weights[2]).times(blocks).times(level))},
        "protongenbase": (blocks, weights, level) => {return new Decimal(Decimal.pow((new Decimal(weights[0])).times(weights[1]), weights[2]).times(blocks).times(level))}
    }
    effectdescriptions = {
        "neutrongenbase": (obj) => "Neutron Base Generation: " + formatDecimalNormal(obj.value),
        "protongenbase": (obj) => "Proton Base Generation: " + formatDecimalNormal(obj.value)
    }
    effectobjects = {
        "neutrongenbase": () => player.nucleonstage.split.neutrongenerator,
        "protongenbase": () => player.nucleonstage.split.ProducerBaseProduction
    }
    effecttypesdef = {
        "neutrongenbase": EffectTypes.ProducerBaseProduction,
        "protongenbase": EffectTypes.ProducerBaseProduction
    }
}

var effecttypesrandom = new Random(98743567);
function generateeffecttype(type){
    return possibleeffects[type][effecttypesrandom.nextInt(0, possibleeffects[type].length - 1)];
}

var effectamountrandom = new Random(657493);
function generateeffectamounts(max){
    return effectamountrandom.nextInt(1, max);
}

var weightsrandom = new Random(18679508);
function generateweights(minweights, maxweights){
    var weights = [];
    for(var i = 0; i < minweights.length; i++){
        weights.push(weightsrandom.nextFloat(minweights[i], maxweights[i]));
    }
    return weights;
}


function generatepieceshape(minwidth, minheight, maxwidth, maxheight){
    var rawshape = generaterawpieceshape(minwidth, minheight, maxwidth, maxheight);
    var shape = cleanshape(rawshape);
    if(shape == undefined)
        return generatepieceshape(minwidth, minheight, maxwidth, maxheight);
    return shape;
}

var pieceshaperan = new Random();
function generaterawpieceshape(minwidth, minheight, maxwidth, maxheight) {
    var width = pieceshaperan.nextInt(minwidth, maxwidth);
    var height = pieceshaperan.nextInt(minheight, maxheight);
    var shape = [];
    for(var y = 0; y < height; y++){
        var temp = [];
        for(var x = 0; x < width; x++){
            var ran = pieceshaperan.next()
            if(ran < .8)
                temp.push(1);
            else
                temp.push(0);
        }
        shape.push(temp);
    }
    return shape;
}
function cleanshape(shape){
    shape = verticalshapecleanup(shape);
    shape = horizontalshapecleanup(shape);
    return shape;
}

function verticalshapecleanup(shape){
    var inv = [];
    for(var i = 0; i < shape.length; i++){
        var valid = false;
        shape[i].forEach(elem => {
            if(elem > 0){
                valid = true;
                return;
            }
        });
        if(!valid)
            inv.push(i);
        else
            break;
    }
    for(var i = shape.length - 1; i > -1; i--){
        var valid = false;
        shape[i].forEach(elem => {
            if(elem > 0){
                valid = true;
                return;
            }
        });
        if(!valid)
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

function horizontalshapecleanup(shape){
    if(shape[0] == undefined)
        return undefined;
    var inv = [];
    for(var i = 0; i < shape[0].length; i++){
        var vd = false;
        for(var t = 0; t < shape.length; t++){
            if(shape[t][i] > 0){
                vd = true;
                break;
            }
        }
        if(!vd)
            inv.push(i);
        else
            break;
    }
    for(var i = shape[0].length-1; i > -1; i--){
        var vd = false;
        for(var t = 0; t < shape.length; t++){
            if(shape[t][i] > 0){
                vd = true;
                break;
            }
        }
        if(!vd)
            inv.push(i);
        else
            break;
    }
    var removed = 0;
    inv.forEach(val => {
        var ind = val - removed;
        for(var id = 0; id < shape.length; id++){
            shape[id].splice(ind, 1);
        }
        removed++;
    });
    return shape;
}

var possibletype = ["white", "red", "blue", "green", "yellow", "orange"];
var typeran = new Random();
function generatetype(){
    return possibletype[typeran.nextInt(0,possibletype.length - 1)];
}