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
    constructor(defaultshape, type, effecttypes, effectweights) {
        super(defaultshape, type);
        this.level = 1;
        this.effecttypes = effecttypes;
        this.effectweights = effectweights;
        this.effects = [];
        if(this.defaultshape != undefined)
            this.updateimportantvalues();
    }

    updateimportantvalues(){
        for(var i = 0; i < this.effecttypes.length; i++){
            console.log(effecttypesdef[this.effecttypes[i]]);
            this.effects.push(new PieceFunctionEffect(effectobjects[this.effecttypes[i]](), effecttypesdef[this.effecttypes[i]], (blocks, weights, amount, ind) => effectfunctions[this.effecttypes[ind]](blocks, weights, amount), (obj) => effectdescriptions[this.effecttypes[obj.ind]](obj), this.blocks, this.effectweights[i], i));
        }
        this.updateeffectamounts();
    }

    applypiece(){
        this.effects.forEach(elem => {
            elem.apply();
            console.log(elem);
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
            return [this.type, this.defaultshape, this.rotation, this.effecttypes, this.effectweights, this.level, this.x, this.y];
        return [this.type, this.defaultshape, this.rotation, this.effecttypes, this.effectweights, this.level];
    }

    get scrapvalue(){
        var value = 0;
        this.effectweights.forEach((val) => {
            val.forEach((v)=>{
                value += v;
            });
        });
        value *= this.blocks;
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
            this.effecttypes = data[3];
        if(data[4] != undefined)
            this.effectweights = data[4];
        if(data[5] != undefined)
            this.level = data[5];
        if(data[6] != undefined)
            this.x = data[6];
        if(data[7] != undefined)
            this.y = data[7];
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