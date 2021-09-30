class BoardPiece {
    constructor(defaultshape, type) {
        this.defaultshape = defaultshape;
        this.rotation = Rotation.UP;
        this.type = type;
        this.rotatedpiece = this.defaultshape;
    }

    rotateclockwise() {
        this.rotation = (this.rotation + 1) % 4;
        this.updaterotatedpiece();
    }
    rotatecounterclockwise() {
        this.rotation = (this.rotation + 3) % 4;
        this.updaterotatedpiece();
    }

    get texturepath() {
        return "images/board/tiles/" + this.type + ".png";
    }

    get width() {
        return this.rotatedpiece[0].length;
    }

    get height() {
        return this.rotatedpiece.length;
    }

    updaterotatedpiece() {
        switch (this.rotation) {
            case Rotation.UP:
                this.rotatedpiece = this.defaultshape;
                break;
            case Rotation.RIGHT:
                this.rotatedpiece = [];
                var height = this.defaultshape.length;
                var width = this.defaultshape[0].length;
                for (var y = 0; y < width; y++) {
                    var temp = [];
                    for (var x = 0; x < height; x++) {
                        temp.push(this.defaultshape[height - x - 1][y]);
                    }
                    this.rotatedpiece.push(temp);
                }
                break;
            case Rotation.DOWN:
                this.rotatedpiece = [];
                var height = this.defaultshape.length;
                var width = this.defaultshape[0].length;
                for (var y = 0; y < height; y++) {
                    var temp = [];
                    for (var x = 0; x < width; x++) {
                        temp.push(this.defaultshape[height - y - 1][width - x - 1]);
                    }
                    this.rotatedpiece.push(temp);
                }
                break;
            case Rotation.LEFT:
                this.rotatedpiece = [];
                var height = this.defaultshape.length;
                var width = this.defaultshape[0].length;
                for (var y = 0; y < width; y++) {
                    var temp = [];
                    for (var x = 0; x < height; x++) {
                        temp.push(this.defaultshape[x][width - y - 1]);
                    }
                    this.rotatedpiece.push(temp);
                }
                break;
        }
    }

    positionpiece(x, y) {
        this.x = x;
        this.y = y;
    }

    intersectsposition(x, y) {
        var localx = x - this.x;
        var localy = y - this.y;
        if (localx < 0 || localy < 0 || localy >= this.rotatedpiece.length || localx >= this.rotatedpiece[0].length)
            return false;
        return this.rotatedpiece[localy][localx] == 1;
    }

    get blocks(){
        var amt = 0;
        this.defaultshape.forEach(elem => {
            elem.forEach(cell => {
                if(cell > 0)
                    amt++;
            });
        });
        return amt;
    }

    applypiece(){}
    unapplypiece(){}
}

class EffectsBoardPiece extends BoardPiece {
    constructor(defaultshape, type, raweffects) {
        super(defaultshape, type);
        this.level = 1;
        this.raweffects = raweffects;
        this.effects = [];
        if(this.defaultshape != undefined)
            this.updateimportantvalues();
    }

    updateimportantvalues(){
        if(this.raweffects != undefined){
            for (var key in this.raweffects){
                var haseffecton = effectobjects[key]();
                var effecttype = effecttypesdef[key];
                var valfunc = function(blocks, weights, amount, key){
                    var val = new Decimal(1);
                    val = effectfunctions[key](blocks, weights, amount);
                    return val;
                }
                this.effects.push(new PieceFunctionEffect(haseffecton, effecttype, (b, w, a, k) => valfunc(b, w, a, k), (obj) => effectdescriptions[obj.key](obj), this.blocks, this.raweffects[key], key));
            }
        }
        this.updateeffectamounts();
        /*for(var i = 0; i < this.effecttypes.length; i++){
        }
        this.updateeffectamounts();*/
    }
    
    get effectamount(){
        var amount = 0;
        for(var key in this.raweffects){
            amount += this.raweffects[key].length;
        }
        return amount;
    }

    applypiece(){
        this.updateeffectamounts();
        this.effects.forEach(elem => {
            elem.apply();
        });
    }

    unapplypiece(){
        this.effects.forEach(elem => {
            elem.remove();
        });
    }

    updateeffectamounts() {
        this.effects.forEach(effect => {
            effect.recalculatevalue(this.level);
        });
    }

    get effectinformation(){
        var effectdes = [];
        this.effects.forEach(effect => {
            effectdes.push(effect.geteffect());
        });
        return effectdes;
    }

    get savedata(){
        if(this.x != undefined && this.y != undefined)
            return [this.type, this.defaultshape, this.rotation, this.raweffects, this.level, this.x, this.y];
        return [this.type, this.defaultshape, this.rotation, this.raweffects, this.level];
    }

    get scrapvalue(){
        var value = 0;
        for (var key in this.raweffects){
            this.raweffects[key].forEach(val => {
                value += val;
            })
        }
        value = Math.pow(value, this.blocks/10 + 1) * Math.pow(1.25, this.blocks * this.level * this.effects.length);
        return value;
    }

    parse(data){
        if(data[0] != undefined)
            this.type = data[0];
        if(data[1] != undefined)
            this.defaultshape = data[1];
        if(data[2] != undefined)
            this.rotation = data[2];
        if(data[3] != undefined)
            this.raweffects = data[3];
        if(data[4] != undefined)
            this.level = data[4];
        if(data[5] != undefined)
            this.x = data[5];
        if(data[6] != undefined)
            this.y = data[6];
        this.updateimportantvalues();
        this.updaterotatedpiece();
    }
}

const Rotation = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
}