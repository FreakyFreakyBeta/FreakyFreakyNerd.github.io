class AutoBuyer {
    constructor(id, buys, unlockrequirements, buystring) {
        this.id = id;
        if (Array.isArray(buys))
            this.buys = buys;
        else
            this.buys = [buys];
        if (Array.isArray(unlockrequirements))
            this.unlockrequirements = unlockrequirements;
        else
            this.unlockrequirements = [unlockrequirements];

        if(buystring != undefined)
            this.buystring = buystring;
        else
            this.buystring = this.buys[0].displayname;

        this.unlocked = false;
        this.autobuyon = false;

        this.buyamount = 1;

        autobuyerregistry.push(this);
        updaterequiredregistry.push(this);
    }

    reset(){
        this.unlocked = false;
        this.autobuyon = false;
    }

    tick() {
        if (!this.unlocked) {
            this.checkforunlock();
            return;
        }
        if (this.autobuyon) {
            this.dobuy();
        }
    }

    checkforunlock() {
        var unl = true;
        this.unlockrequirements.forEach((elem) => {
            if (!elem.hasrequirement) {
                unl = false;
                return;
            }
        });
        if (unl)
            this.unlocked = true;
    }

    dobuy() {
        this.buys.forEach((elem) => {
            elem.buy();
        });
    }

    get saveData() {
        return this.save()
    }

    save() {
        return [this.autobuyon, this.buyamount];
    }

    parse(data) {
        if (data == undefined)
            return;
        if (data[0] != undefined)
            this.autobuyon = data[0];
        if (data[1] != undefined)
            this.buyamount = data[1];

        this.updatebuyamounts();
    }

    get state() {
        if (!this.unlocked)
            return "Locked";
        if (this.autobuyon)
            return "On"
        return "Off"
    }

    toggle() {
        if(!this.unlocked)
            return;
        this.autobuyon = !this.autobuyon;
        this.updatebuyamounts();
    }

    updatebuyamounts(){
        if(this.autobuyon){
            this.buys.forEach((elem) => {
                elem.setbuyamountoverride(this.buyamount);
            })
        }else{
            this.buys.forEach((elem) => {
                elem.setbuyamountoverride(undefined);
            })
        }
    }

    togglebuyamount(){
        this.buyamount = getnextbuyamount(this.buyamount);
        this.updatebuyamounts();
    }

    get buyamounttext(){
        if(this.buyamount == -1)
            return "Max";
        return this.buyamount;
    }

    get displayname(){
        return "Autobuys " + this.buystring;
    }
}