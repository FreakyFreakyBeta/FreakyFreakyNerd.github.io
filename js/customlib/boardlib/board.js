class Board {
    constructor(basewidth, baseheight, scrapcurrency) {
        this.basewidth = basewidth;
        this.baseheight = baseheight;
        this.scrapcurrency =  scrapcurrency;

        this.rows = [];
        for (var y = 0; y < this.basewidth; y++) {
            var temp = [];
            for (var x = 0; x < this.basewidth; x++) {
                temp.push(new TileInfo(x, y));
            }
            this.rows.push(temp);
        }
        this.pieces = [];
        this.selectedpiece = undefined;
        this.pendingpieces = [];
    }

    reset(hard){
        this.pieces.forEach(piece =>{
            piece.unapplypiece();
        })
        this.pieces = [];
        this.selectedpiece = undefined;
        this.pendingpieces = [];
        this.updateboardtiles();
    }

    scrapselected(){
        this.scrapcurrency.add(this.selectedpiece.scrapvalue);
        this.selectedpiece = undefined;
        this.updateboardtiles();
    }

    scrapbench(mult = 1){
        var temp = [];
        this.pendingpieces.forEach(piece => {
            if(piece.type != "key"){
                this.scrapcurrency.add(piece.scrapvalue.times(mult));
                temp.push(temp);
            }
        });
        temp.forEach(el => {
            this.pendingpieces.splice(this.pendingpieces.indexOf(el), 1);
        });
        this.updateboardtiles();
    }

    get width(){
        return this.basewidth;
    }
    get height(){
        return this.baseheight;
    }

    psuedopopulate(){
        var removed = [];
        this.pendingpieces.forEach(piece => {
            var breaker = false;
            for(var x = 0; x < this.width; x++){
                for(var y = 0; y < this.height; y++){
                    if(this.placepiecetoposition(x,y,piece)){
                        removed.push(piece);
                        breaker = true;
                        return;
                    }
                }
                if(breaker)
                    return;
            }
        })
        removed.forEach(tmp => {
            this.pendingpieces.splice(this.pendingpieces.indexOf(tmp), 1);
        })
        this.updateboardtiles();    
    }

    clear(){
        this.pieces.forEach(piece => {
            this.pendingpieces.push(piece);
            piece.unapplypiece();
        })
        this.pieces = [];
        this.updateboardtiles();
    }

    scrapall(mult = 1){
        this.clear();
        this.scrapbench(mult);
    }

    addpendingpiece(piece){
        if(piece != undefined)
            this.pendingpieces.push(piece);
    }

    addpendingpieces(pieces){
        if(pieces != undefined)
            this.pendingpieces = [...this.pendingpieces, ...pieces];
    }

    placepiecetoposition(x, y, piece) {
        if (piece == undefined || this.haspiececollision(piece, x, y))
            return false;
        //piece.positionpiece(x, y);
        this.pieces.push(piece);
        piece.positionpiece(x,y);
        piece.applypiece();
        this.selectedpiece = undefined;
        return true;
    }

    placepiecetotile(tile, piece) {
        this.placepiecetoposition(tile.x, tile.y, piece);
    }

    displacepieceatposition(x, y) {
        var piece = this.getpieceat(x, y);
        piece.unapplypiece();
        var ind = this.pieces.indexOf(piece)
        this.pieces.splice(ind, 1);
        this.deselectpiece();
        this.selectedpiece = piece;
        this.displaypiecetoposition(x, y, this.selectedpiece);
    }

    displacepieceattile(tile) {
        this.displacepieceatposition(tile.x, tile.y);
    }

    rotateselected() {
        if(this.selectedpiece == undefined)
            return;
        this.selectedpiece.rotateclockwise();
        this.displaypiece(this.selectedpiece);
    }

    deselectpiece() {
        if (this.selectedpiece != undefined)
            this.pendingpieces.push(this.selectedpiece);
        this.selectedpiece = undefined;
        this.updateboardtiles();
    }

    selectpiece(piece) {
        var ind = this.pendingpieces.indexOf(piece);
        this.pendingpieces.splice(ind, 1);

        this.deselectpiece();
        this.selectedpiece = piece;
    }

    updateboardtiles() {
        this.rows.forEach((row, y) => {
            row.forEach((cell, x) => {
                var tp = this.getpieceat(x, y);
                if (tp == undefined)
                    this.setdisplaytype(x, y, "empty");
                else
                    this.setdisplaytype(x, y, tp.type);
            });
        });
    }

    haspiececollision(piece, x, y) {
        var collision = false;
        piece.rotatedpiece.forEach((rp, yt) => {
            if (collision)
                return;
            rp.forEach((cell, xt) => {
                if (collision)
                    return;
                if (cell == 1) {
                    var tp = this.getpieceat(x + xt, y + yt);
                    if (tp != undefined)
                        collision = true;
                }
            });
        });
        return collision;
    }

    displaypiecetoposition(x, y, piece) {
        if (piece == undefined)
            return;
        if (x + piece.width > this.basewidth && y + piece.height > this.baseheight)
            return;
        this.updateboardtiles();
        if (x + piece.width > this.basewidth)
            x = this.basewidth - piece.width;
        if (y + piece.height > this.baseheight)
            y = this.baseheight - piece.height;
        piece.positionpiece(x, y);
        piece.rotatedpiece.forEach((rp, yt) => {
            rp.forEach((cell, xt) => {
                if (cell == 1) {
                    var tp = this.getpieceat(x + xt, y + yt);
                    if (tp == undefined)
                        this.setdisplaytype(x + xt, y + yt, piece.type);
                    else
                        this.setdisplaytype(x + xt, y + yt, "error");
                }
            });
        });
    }

    displaypiece(piece){
        this.displaypiecetoposition(piece.x, piece.y, piece);
    }

    displaypiecetotile(tile, piece) {
        this.displaypiecetoposition(tile.x, tile.y, piece);
    }

    setdisplaytype(x, y, type) {
        if (x >= 0 && y >= 0 && x < this.basewidth && y < this.baseheight)
            this.rows[y][x].settextureid(type);
    }

    getpieceat(x, y) {
        var piece = null;
        this.pieces.forEach(pc => {
            if (pc.intersectsposition(x, y)) {
                piece = pc;
                return;
            }
        });
        return piece;
    }

    get savedata(){
        var data = {};

        var placed = [];
        this.pieces.forEach(piece => {
            placed.push(piece.savedata);
        });
        data.placed = placed;

        var pending = [];
        this.pendingpieces.forEach(piece => {
            pending.push(piece.savedata);
        });
        if(this.selectedpiece != undefined)
            pending.push(this.selectedpiece.savedata);
        data.pending = pending;

        return data
    }

    parse(data){
        if(data.placed != undefined){
            this.pieces = [];
            data.placed.forEach(piece =>{
                var pie = new EffectsBoardPiece();
                pie.parse(piece);
                this.pieces.push(pie);
                pie.applypiece();
            });
        }
        if(data.pending != undefined){
            this.pendingpieces = [];
            data.pending.forEach(piece =>{
                var pie = new EffectsBoardPiece();
                pie.parse(piece);
                this.pendingpieces.push(pie);
            });
        }

        this.updateboardtiles();
    }
}

class TileInfo {
    constructor(x, y) {
        this.textureid = "empty";
        this.x = x;
        this.y = y;
    }

    get texturepath() {
        return "images/board/tiles/" + this.textureid + ".png";
    }

    settextureid(textureid) {
        this.textureid = textureid;
    }
}