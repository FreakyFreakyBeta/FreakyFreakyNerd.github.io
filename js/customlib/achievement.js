class Achievement{
  constructor(id, displayname, unlockrequirements, showdescriptionrequirements, effects, tags, numkey, value){
    this.id = id;
    this.tags = tags;
    this.displayname = displayname;
    if(Array.isArray(unlockrequirements))
      this.requirements = unlockrequirements;
    else
      this.requirements = [unlockrequirements];
    if(Array.isArray(showdescriptionrequirements) || showdescriptionrequirements == undefined)
      this.showdescriptionrequirements = showdescriptionrequirements;
    else
      this.showdescriptionrequirements = [showdescriptionrequirements];
    if(Array.isArray(effects) || effects == null)
      this.effects = effects;
    else
      this.effects = [effects]; 
    this.unlocked = false;
    this.show = false;
    this.value = value;

    if(numkey != undefined){
      this.tag = "[" + numkey + "x" + getCounterTag(numkey)+ "]";
    }else this.tag = "";

    achievementregistry.push(this);
  }

  get iconpath(){
    if(this.show || !player.options.hideachievements)
      return this.id;
    return "hidden";
  }

  hastag(tag){
    if (this.tags == undefined || this.tags == null)
      return false;
    return this.tags.includes(tag);
  }

  parse(list){
    if(list.includes(this.id))
      this.unlocked = true;
    if(this.unlocked)
      this.onunlock();
    this.checkforshow();
  }

  check(){
    this.checkforshow();
    this.checkforunlock();
  }

  checkforunlock(){
    if(this.unlocked)
      return;
    if (this.requirements == null || this.requirements == undefined){
      this.unlocked = true;
      this.onunlock();
      return;
    }
    var unlock = true;
    this.requirements.forEach(element => {
      if(!element.hasrequirement){
        unlock = false;
        return;
      }
    });
    this.unlocked = unlock;
    if(this.unlocked)
      this.onunlock();
  }
  forceunlock(){
    this.unlocked = true;
    this.show = true;
    this.onunlock();
  }
  forcelock(){
    this.unlocked = false;
    this.show = false;
    this.onrevoke();
  }

  checkforshow(){
    if (this.showdescriptionrequirements == undefined || this.unlocked){
      this.show = true;
      return;
    }
    var show = true;
    this.showdescriptionrequirements.forEach(element => {
      if(!element.hasrequirement){
        show = false;
        return;
      }
    });
    this.show = show;
  }

  onunlock(){
    if(this.effects != null && this.effects != undefined)
      this.effects.forEach((effect, i) => {
        effect.apply();
      });
    if (this.value != undefined){
      player.achievements.points += this.value;
    }
  }

  onrevoke(){
    if(this.effects != null && this.effects != undefined)
      this.effects.forEach((effect, i) => {
        effect.remove();
      });
    if (this.value != undefined){
      player.achievements.points -= this.value;
    }
  }

  recalculateeffects(){
    if(this.effects != null && this.effects != undefined)
      this.effects.forEach((effect, i) => {
        effect.recalculatevalue(this.amount);
      });
  }

  getdescription(){
    if (!this.show)
      return "Idk Get Farther! Maybe?";
    var description = "";
    if(this.requirements != null && this.requirements != undefined && !this.hastag("hiderequirements")){
      description += "Requirements\n";
      this.requirements.forEach((requirement, i) => {
        description += requirement.requirementtext;
        if(i < this.requirements.length)
          description += "\n"
      });
      if(this.effects != undefined && !this.hastag("hideeffects"))
        description += "\n\n";
    }
    return description;

  }

  get description(){
    return this.getdescription();
  }

  get title(){
    if(this.show || !player.options.hideachievements)
      return this.tag + " " + this.displayname;
    return this.tag + " ???";
  }

  get effect(){
    if(!this.show && player.options.hideachievements)
      return "";
    var description = "";
    description += "Effects:\n";
    if(this.effects != undefined && !this.hastag("hideeffects")){
      this.effects.forEach((effect, i) => {
        description += effect.geteffect();
        if(i < this.effects.length - 1)
          description += ", "
      });
    }
    if(this.value != undefined){
      if(this.effects != undefined)
        description += ", "
      description += "+" + formatDecimalNormal(this.value) + " Achievement Points";
    }
    return description;
  }

  get requirement(){
    if(!this.show)
      return ""
    if(this.requirements == undefined)
      return "Nothing! Absoluting Nothing"
    var description = "";
    if(this.requirements != undefined && !this.hastag("hiderequirements")){
      description += "Requires:\n";
      this.requirements.forEach((req, i) => {
        description += req.requirementtext;
        if(i < this.requirements.length - 1)
          description += ", "
      });
    }
    return description;
  }

  reset(){
    this.unlocked = false;
    this.show = false;
  }
}
