Vue.mixin({
    methods: {
        format: function(val){
            return formatDecimal(val);
        },
        formatSpecial: function(val, over){
            return formatDecimalOverride(val, over);
        },
        formatDecimalNormal: function(val, over){
            return formatDecimalNormal(val, over);
        },
        hasachievement: function(id){
          return hasachievement(id);
        }
    }
})

Vue.component('quark-producer-item', {
    props: ['producer'],
    template: `
    <div>
        <span class="baseproducername"> {{producer.displayname}}</span>
        <span class="currencyextra">{{producer.amountdescription}}</span>
        <button class="buybutton tooltipholder" v-on:click="buyProducer(producer)">
            <span class="costtext">Buy x{{formatDecimalNormal(getbuyamount("quarkgen", producer))}} Cost: <span
            class="quark">{{formatDecimalNormal(producer.getcost(0))}}</span> {{producer.costs[0].costobject.displayname}}</span>
            <span class="buybuttontooltip tooltip" id="producer_quarkgenone_tooltip">Produces {{formatSpecial(producer.getproductionper(0), 1)}} {{producer.productions[0].productionobject.displayname}} per second.</span>
        </button>
    </div>
    `,
    methods: {
        buyProducer: function(producer){
            producer.buy();
        }
    }
})

Vue.component('quark-upgrade-item', {
    props: ['upgrade'],
    template: `
    <div>
        <span class="baseproducername"> {{upgrade.displayname}}</span>
        <span class="currencyextra"> x{{formatSpecial(upgrade.amount)}}</span>
        <button class="buybutton tooltipholder" v-on:click="buyUpgrade(upgrade)">
            <span class="costtext">Buy x{{formatSpecial(getbuyamount("quarkupg", upgrade))}} Cost:<span class="quark">{{formatSpecial(upgrade.getcost(0))}}</span> Quarks</span>
            <span class="buybuttontooltip tooltip">{{upgrade.effectsdescription}}</span>
        </button>
    </div>
    `,
    methods: {
        buyUpgrade: function(upgrade){
            upgrade.buy();
        }
    }
})

Vue.component('producers-display', {
  props: ['producers','type','fasttoggle'],
  template: `
    <table>
      <tr class="producerrow" v-for="producer in producers" v-if="producer.unlocked">
        <td v-bind:class='"producerimage producer"+type+"image"'><img v-bind:src='"images/producer/"+producer.id+".png"' @error="$event.target.src='images/missing.png'"/></td>
        <td v-bind:class='"producername producer"+type+"name"'>{{producer.displayname}}: {{Producer.getAmountDescription(producer)}}</td>
        <td v-bind:class='"producercost producer"+type+"cost"'><button v-bind:class='{producercostbutton:true, producercostbuttonbuyable: producer.canbuy}' v-on:click="buyProducer(producer)">Cost: {{Producer.getCostDescription(producer)}}</button></td>
        <td v-bind:class='"producerproduction producer"+type+"production"'>{{Producer.getProductionDescription(producer)}}</td>
      </tr>
      <fast-toggle v-if='fasttoggle == "true" && producers[0].autobuyunlocked' v-bind:totoggle="producers"></fast-toggle>
    </table>
  `,
  methods: {
    buyProducer: function(producer){
      producer.buy();
    },
    toggleproducer: function(producer){
      producer.togglebuystate();
    }
  }
})

Vue.component('upgrades-display', {
  props: ['upgrades','type', 'fasttoggle'],
  template: `
    <table>
      <tr class="upgraderow" v-for="upgrade in upgrades" v-if="upgrade.unlocked">
        <td v-bind:class='"upgradeimage upgrade"+type+"image"'><img v-bind:src='"images/upgrade/"+upgrade.id+".png"' @error="$event.target.src='images/missing.png'"/></td>
        <td v-bind:class='"upgradename upgrade"+type+"name"'>{{upgrade.displayname}}: {{upgrade.amountdescription}}</td>
        <td v-bind:class='"upgradecost upgrade"+type+"cost"'><button v-bind:class='{upgradecostbutton:true, upgradecostbuttonbuyable: upgrade.canbuy}' v-on:click="buyUpgrade(upgrade)">Cost: {{upgrade.specialcostdescription}}</button></td>
        <td v-bind:class='"upgradeeffect upgrade"+type+"effect"'>{{upgrade.specialeffectdescription}}</td>
      </tr>
      <fast-toggle v-if="fasttoggle && upgrades[0].autobuyunlocked" v-bind:totoggle="upgrades"></fast-toggle>
    </table>
  `,
  methods: {
    buyUpgrade: function(upgrade){
      upgrade.buy();
    },
    toggleupgrade: function(upgrade){
      upgrade.togglebuystate();
    }
  }
})

Vue.component('fast-toggle', {
  props: ['totoggle'],
  template: `
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td><button class="toggleallauto" v-on:click="toggle(totoggle)">Toggle Above</button></td>
      <td></td>
    </tr>
  `,
  methods: {
    toggle: function(totoggle){
      var state = !totoggle[0].autobuystate;
      totoggle.forEach(elem => {elem.setautobuystate(state)})
    }
  }
})

Vue.component('buy-display', {
  props: ['buykey','buydisplay'],
  template: `
    <div v-bind:id='buykey+"buyamount"'>
      <span class="currencyextra">{{buydisplay}} Buy Amount:{{getbuyamount(buykey)}}
      Set Buy Amount to: </span>
      <button class="buybutton" v-on:click='setbuyamount(buykey, 1)'>1</button>
      <button class="buybutton" v-on:click='setbuyamount(buykey,25)'>25</button>
      <button class="buybutton" v-on:click='setbuyamount(buykey,-1)'>Max</button>
    </div>
  `
})

Vue.component('upgrade-item', {
    props: ['upgrade'],
    template: `
      <img v-bind:class="{upgrade : true, upgradebought: upgrade.bought >= 1, upgrademax : upgrade.ismaxbuyable}" v-on:click="buyUpgrade(upgrade)" v-if="upgrade.unlocked" v-bind:src='"images/upgrade/"+upgrade.id+".png"' @error="$event.target.src='images/missing.png'" @mouseover="showUpgrade(upgrade)"/>
    `,
    methods: {
        buyUpgrade: function(upgrade){
            upgrade.buy();
        },
        showUpgrade(upgrade){
          subatomicidlingapp.selectedupgrade = upgrade;
        }
    }
})

Vue.component('currency-display', {
  props: ['currency'],
  template: `
  <div class="currencydisplaydiv">
    <img class="currencyimage" v-bind:src='currency.iconpath' @error="$event.target.src='images/missing.png'"/>
    <span v-bind:class='currency.colorclass+" currencydisplay"'>{{formatDecimalNormal(currency.amount)}}</span>
  </div>
  `,
  methods: {
      buyUpgrade: function(upgrade){
          upgrade.buy();
      },
      showElectronUpgrade(upgrade){
        subatomicidlingapp.selectedelectronupgrade = upgrade;
      }
  }
})

Vue.component('line-tree', {
  props: ["linetree", "classspecial"],
  template: `
    <svg v-bind:class="linetree" v-bind:style="{left: linetree.leftoffset, top: linetree.topoffset, zindex: 0, width: linetree.width, height: linetree.height}" style="position: absolute;">
      <tree-line v-for="line in linetree.lines" v-bind:line="line" v-bind:classspecial="classspecial"></tree-line>
    </svg>
  `
})

Vue.component('tree-line', {
  props: ["line", "classspecial"],
  template: `
    <line v-bind:class="classspecial + 'treeline'" v-bind:line="line" v-bind:x1="line.xstart" v-bind:x2="line.xend" v-bind:y1="line.ystart" v-bind:y2="line.yend" v-if="line.upgrade.unlocked"/>
  `
})

Vue.component('achievement-item', {
    props: ['achievement'],
    template: `
      <img v-bind:class="{achievement : true, achievementgot: achievement.unlocked}"" v-bind:src='"images/achievement/"+achievement.iconpath+".png"' @error="$event.target.src='images/missing.png'" @mouseover="showAchievement(achievement)"/>
    `,
    methods: {
        showAchievement(achievement){
          subatomicidlingapp.selectedachievement = achievement;
        }
    }
})

Vue.component('challenge-item', {
    props: ['challenge'],
    template: `
    <div class="challengedisplay" @mouseover="showChallenge(challenge)" v-if="challenge.unlocked">
      <img v-bind:class="{challengeimage : true, inchallenge: challenge.in}"" v-bind:src='"images/challenge/"+challenge.id+".png"' @error="$event.target.src='images/missing.png'" />
      <div class="centered"><button v-bind:class="{challengeactivator: true, challengeinactive: challenge.in, challengeactive: !challenge.in}" v-on:click="challenge.toggleinchallenge()" v-if='!hasachievement("betterchallenges")'>{{challenge.entertext}}</button></div>
      <div class="centered"><button v-bind:class="{challengeactivator: true, challengeactive: challenge.active, challengeinactive: !challenge.active}" v-on:click="challenge.toggleactive()" v-if='hasachievement("betterchallenges")'>{{challenge.activetext}}</button></div>
      <div class="centered challengedifficulty" v-if="challenge.maxdifficulty > 1"><button class="changechallengedifficulty" v-on:click="challenge.decreasedifficulty()">-</button><span class="challengedifficulty">{{challenge.difficultyinformation}}</span><button class="changechallengedifficulty" v-on:click="challenge.increasedifficulty()">+</button></div>
      </div>
    `,
    methods: {
        showChallenge(challenge){
          subatomicidlingapp.selectedchallenge = challenge;
        }
    }
})

Vue.component('prestige-icon', {
    props: ['prestige'],
    template: `
      <img v-bind:class="{prestigeicon : true}"" v-bind:src='"images/prestige/"+prestige.id+".png"' @error="$event.target.src='images/missing.png'" @mouseover="showPrestigeRewards(prestige)" v-on:click="prestige.doprestige()"/>
    `,
    methods: {
        showPrestigeRewards(prestige){
          subatomicidlingapp.selectedprestige = prestige;
        }
    }
})

Vue.component('prestige-icon-noselect', {
    props: ['prestige'],
    template: `
      <img v-bind:class="{prestigeicon : true}"" v-bind:src='"images/prestige/"+prestige.id+".png"' @error="$event.target.src='images/missing.png'" v-on:click="prestige.doprestige()"/>
    `
})

Vue.component('prestige-requirement', {
    props: ['requirement'],
    template: `
      <span v-bind:class='{prestigerequirement: true, notprestigerequirement: !requirement.hasrequirement}'>{{requirement.progresstext}}</span>
    `
})

Vue.component('prestige-reward', {
    props: ['reward'],
    template: `
     <div class="prestigereward">
      <img v-bind:class="{prestigerewardicon : true}"" v-bind:src='reward.iconpath' @error="$event.target.src='images/missing.png'"/>
      <span v-bind:class='"prestigerewardamount " + reward.colorclass'>+ {{formatDecimalNormal(reward.producedamount)}}</span>
      </div>
    `
})

Vue.component('upgrade-bonus', {
  props: ['upgrade', 'type'],
  template:`
  <div>
    <img v-bind:class="{upgrade : true}"" v-bind:src='upgrade.iconpath' @error="$event.target.src='images/missing.png'"/>
    <span v-bind:class='"bonusupgrade bonus"+upgrade.id+"upgrade"'>{{upgrade.effects[0].geteffect()}}</span>
  </div>
  `
});

Vue.component('achievement-grid', {
    props: ['achievementslist'],
    template: `
    <table class="achievementtable">
      <tr class="achievementrow" v-for="achievements in achievementslist">
        <td class="achievementcell" v-for="achievement in achievements">
          <achievement-item v-bind:achievement="achievement">
        </td>
      </tr>
    </table>
    `,
    methods: {
        showAchievement(achievement){
          subatomicidlingapp.selectedachievement = achievement;
        }
    }
})

Vue.component('quark-spin-producer', {
    props: ['producer'],
    template: `
    <div style='align: center;'>
        <span class="baseproducername"> {{producer.displayname}}</span>
        <span class="currencyextra">{{producer.amountdescription}}</span>
        <button class="buybutton tooltipholder"v-on:click="buyProducer(producer)">
            <span class="costtext">Buyx{{formatDecimalNormal(getbuyamount("quarkgen", producer))}} Cost:<span class="quark"> {{formatDecimalNormal(producer.getcost(0))}}</span> {{producer.costs[0].costobject.displayname}}</span>
            <span class="buybuttontooltip tooltip"id="producer_quarkgenone_tooltip">Produces {{formatSpecial(producer.getproductionper(0), 1)}} {{producer.productions[0].productionobject.displayname}} per second.</span>
        </button>
    </div>
    `,
    methods: {
        buyProducer: function(producer){
            producer.buy();
        }
    }
})

Vue.component('buy-amount-selector', {
  props: ['type'],
  template: `
    <button v-bind:class='"buyamountdisplay "+type+"buyamountdisplay"' v-on:click="togglebuyamount(type)">
      <span class='buyamounttext'>Buy Amount: {{getbuyamount(type)}}</span>
    </button>
  `
})

Vue.component('no-effect-upgrade', {
  props: ['upgrade'],
  template: `
    <div><div>{{upgrade.displayname}}</div></div>
  `
})

Vue.component('appliable-upgrade', {
  props: ['upgrade', "appliesto"],
  template: `
    <div> 
      <span class="upgradename">{{upgrade.displayname}} Available: {{formatDecimalNormal(upgrade.available)}}/{{formatDecimalNormal(upgrade.maxappliable)}}</span>
      <button v-bind:class='{appliableupgradecostbutton:true, appliableupgradecostbuttonbuyable: upgrade.canbuy}' v-on:click="upgrade.buy()">Upgrade Max: {{upgrade.specialcostdescription}}</button>
      <button class='appliableupgradebutton' v-on:click="upgrade.buymax()">Buy Max</button>
      <button class='appliableupgradebutton' v-on:click="upgrade.unapplyall(); var num = 0; appliesto.forEach(e => {if(e.unlocked){num += 1;}}); var amount = Decimal.floor(upgrade.amount.div(num)); appliesto.forEach(e => { if(e.unlocked){ e.unapplyall(); e.setamount(amount); }});">Apply Evenly</button>
      <button class='appliableupgradebutton' v-on:click="upgrade.unapplyall(); appliesto.forEach(e => { e.unapplyall(); })">Unapply All</button>
    </div>
    `
})

Vue.component('applied-upgrades-display', {
  props: ['upgrades','type'],
  template: `
    <table class="upgradetable">
      <tr class="upgraderow" v-for="upgrade in upgrades">
          <td v-bind:class='"upgradeimage upgrade"+type+"image"'><img v-bind:src='"images/upgrade/"+upgrade.id+".png"' @error="$event.target.src='images/missing.png'"/></td>
          <td v-bind:class='"upgradename upgrade"+type+"name"'>{{upgrade.displayname}}: {{upgrade.amountdescription}}</td>
          <td v-if="upgrade.unlocked" v-bind:class='"upgradeprogress upgrade"+type+"progress"'>Progress: {{upgrade.progress}}</td>
          <td v-if="!upgrade.unlocked" class="upgradecell"><div v-bind:class='"upgraderequirement upgrade"+type+"requirement"'>{{upgrade.requirementstext}}</div></td>
          <td v-if="upgrade.unlocked" v-bind:class='"upgradeeffect upgrade"+type+"effect"'>{{upgrade.specialeffectdescription}}</td>
          <td v-if="upgrade.unlocked"><button v-bind:class='"applybutton apply"+type+"button"' v-on:click="applyamount(upgrade,type)">+</button></td>
          <td v-if="upgrade.unlocked"><button v-bind:class='"applybutton apply"+type+"button"' v-on:click="removeamount(upgrade,type)">-</button></td>
      </tr>
    </table>
  `,
  methods: {
    applyamount : function(upg, type){
      upg.applyamount(type);
    },
    removeamount : function(upg, type){
      upg.removeamount(type);
    }
  }
})

Vue.component('board-grid-display', {
  props : ["board"],
  template: `
  <div>
    <span class="boardtitle">Board</span>
    <table class="boardtable">
      <tr class="boardrow" v-for="row in board.rows" v-bind:row="row">
        <td class="boardcell" v-for="cell in row" v-bind:cell="cell">
          <img class="boardimage" v-bind:src='cell.texturepath' @error="$event.target.src='images/missing.png'" @mouseover="hoverenter(board, cell)" @click='click(board, cell)'>
        </td>
      </tr>
    </table>
    <button class="boardoperation" @click="rotate(board)">Rotate</button>
    <button class="boardoperation"  @click="deselectpiece(board)">Deselect</button>
    <button class="boardoperation"  @click="board.scrapselected()">Scrap Selected</button><br>
    <button class="boardoperation"  @click="board.scrapbench()">Scrap Bench</button>
    <button class="boardoperation"  @click="board.psuedopopulate()">Auto-Populate Board</button>
    <button class="boardoperation"  @click="board.clear()">Clear Board</button>
  </div>
  `,
  methods: {
    hoverenter: function(board, tile){
      board.displaypiecetotile(tile, board.selectedpiece);
      selectedboard = board;
      piece = board.getpieceat(tile.x, tile.y);
      if(piece != undefined && board.selectedpiece == undefined)
        subatomicidlingapp.selectedboardpiece = piece;
    },
    click: function(board, tile){
      if(board.selectedpiece != undefined)
        board.placepiecetotile(tile, board.selectedpiece);
      else
        board.displacepieceattile(tile);
    },
    rotate: function(board){
      board.rotateselected();
    },
    deselectpiece: function(board){
      board.deselectpiece();
    }
  }
})

Vue.component('piece-display', {
  props: ["piece", "board"],
  template: `
  <div class="piecediv">
    <table class="piecetable">
      <tr class="piecerow" v-for="(row,y) in piece.rotatedpiece" v-bind:row="row">
        <td v-bind:class="{piececell: true, piececellleft: cell == 1 && (x == 0)}" v-for="(cell,x) in row" v-bind:cell="cell">
          <img class='pieceimage' v-bind:src='cell == 1 ? piece.texturepath : "images/none.png"' @error="$event.target.src='images/missing.png'" @mouseover="showinformation(board, piece)" @click='selectpiece(board, piece)'>
        </td>
      </tr>
    </table>
  </div>
  `,
  methods: {
    showinformation: function(board, piece){
      subatomicidlingapp.selectedboardpiece = piece;
    },
    selectpiece: function(board, piece){
      board.selectpiece(piece);
    }
  }
})

Vue.component('piece-information-display', {
  props: ["piece"],
  template: `
    <div>
      <span class="pieceinfo">Block Count: {{piece.blocks}}</span><br>
      <span class="pieceinfo">Effect Count: {{piece.effects != undefined ? piece.effectamount : 0}}</span><br>
      <span class="pieceinfo">Level: {{piece.level != undefined ? piece.level : 0}}</span><br>
      <span class="pieceinfo" v-if='piece.type == "key"'>Cannot Be Scrapped</span>
      <span class="pieceinfo" v-if='piece.type != "key"'>Scrap Value: {{formatDecimalNormal(piece.scrapvalue)}}</span><br>
      <span class="pieceinfo">Shape: </span><br>
      <piece-display v-bind:piece="piece"></piece-display><br>
      <span class="pieceinfotitle">Piece Effects</span><br>
      <span class="pieceinfo" v-for="(effect, x) in piece.effectinformation">{{effect}}<br></span>
    </div>
  `
})

Vue.component("log-info", {
  props: ["data"],
  template: `
    <span v-bind:class='"logdata + log" + data.type'>{{data.text}}\n</span>
  `
})

Vue.component("piece-generator", {
  props: ["generator", "board", "typex"],
  template: `
    <div>
      <table>
        <piece-generator-upgrade v-for="type in generator.types" v-bind:generator="generator" v-bind:type="type"></piece-generator-upgrade>
        <tr><td>
          <button class="newpiece" @click="board.addpendingpiece(generator.buypiece())">Buy New Piece Costs : {{generator.piececost}}</button><button class="newpiece" @click="board.addpendingpieces(generator.bulkbuypieces())">Buy Bulk Pieces</button><button class="newpiece" @click="generator.prestige()">Reset Price</button></td>
          <td><button v-bind:class='"generatorupgradebuyamount "+typex+"generatorupgradebuyamount"' v-on:click="togglebuyamount(typex)"><span class='buyamounttext'>Buy Amount: {{getbuyamount(typex)}}</span></button></td>
        </tr>
      </table>
    </div>
  `
});

Vue.component("piece-generator-upgrade",{
  props: ["generator", "type"],
  template: `
    <tr>
      <td>
        <span class="generatorupgrade">{{generator.getupgradename(type)}} : {{generator.getupgradelevel(type)}}</span>
      </td>
      <td>
        <button class="buygeneratorupgrade" @click="generator.buyupgrade(type)">{{generator.getupgradecost(type)}}</button>
      </td>
    </tr>
  `
});

Vue.component("toggleable-producers-display", {
  props: ['producers','type','fasttoggle'],
  template: `
    <table>
      <tr class="producerrow" v-for="producer in producers" v-if="producer.unlocked">
        <td v-bind:class='"producerimage producer"+type+"image"'><img v-bind:src='"images/producer/"+producer.id+".png"' @error="$event.target.src='images/missing.png'"/></td>
        <td v-bind:class='"producerimage producerpauseimage producer"+type+"pauseimage"' v-on:click="toggleproducerproduction(producer)"><img v-bind:class='"producer" + producer.productionstatus' v-bind:src='"images/" + producer.productionstatus + ".png"' @error="$event.target.src='images/missing.png'"/></td>
        <td v-bind:class='"producername producer"+type+"name"'>{{producer.displayname}}: {{Producer.getAmountDescription(producer)}}</td>
        <td v-bind:class='"producercost producer"+type+"cost"'><button v-bind:class='{producercostbutton:true, producercostbuttonbuyable: producer.canbuy}' v-on:click="buyProducer(producer)">Cost: {{Producer.getCostDescription(producer)}}</button></td>
        <td v-bind:class='"producerauto producer"+type+"auto"'><button v-bind:class='{autobutton: true, autobuttonon: producer.autobuyunlocked && producer.buyauto, autobuttonoff: producer.autobuyunlocked && !producer.buyauto}' v-on:click="toggleproducer(producer)" v-if="producer.autobuyunlocked">AUTO: [{{producer.autostate}}]</button></td>
        <td v-bind:class='"producerproduction producer"+type+"production"'>{{Producer.getProductionDescription(producer)}}</td>
      </tr>
      <fast-toggle v-if='fasttoggle == "true" && producers[0].autobuyunlocked' v-bind:totoggle="producers"></fast-toggle>
    </table>
  `,
  methods: {
    buyProducer: function(producer){
      producer.buy();
    },
    toggleproducer: function(producer){
      producer.togglebuystate();
    },
    toggleproducerproduction: function(producer){
      producer.toggleproduction();
    }
  }
})

Vue.component("replicator", {
  props: ["replicator"],
  template: `
    <div>
      <div class="replicatorcurrency">
        <span v-bind:class='"replicatorlabel " + replicator.currency.colorclass + "label"'>{{replicator.currency.displayname}}</span>
        <div v-bind:class='"replicatorprogressbackground " + replicator.currency.colorclass + "background"'><div v-bind:class=' "replicatorprogressfront " + replicator.currency.colorclass + "front"' v-bind:style='"width:"+replicator.currency.ratio+"%"'></div></div>
        <span v-bind:class='"replicatoramount " + replicator.currency.colorclass + "amount"'>{{replicator.currency.amountdescription}}</span>
        <span v-bind:class='"replicatoramount " + replicator.currency.colorclass + "amount"'>{{replicator.currency.increasedescription}}</span>
      </div>
      <div class="replicatorupgrades">
        <replicator-upgrade v-for="upg in replicator.upgrades" v-bind:upgrade="upg"></replicator-upgrade>
      </div>
      <div class="replicatoreffects">
        <span class="replicatoreffect">{{replicator.currency.effectsdesc}}</span>
      </div>
    </div>
  `
});

Vue.component("replicator-upgrade", {
  props: ["upgrade"],
  template: `
  <div class="replicatorupgrade">
    <button class="replicatorupgradebutton" v-on:click='console.log(upgrade.buy())'>{{upgrade.displayname}} ({{formatDecimalNormal(upgrade.bought)}}) Cost: / {{formatDecimalNormal(upgrade.getcost(0))}}</button>
  </div>
  `
})

Vue.component("special-producers", {
  props: ["producers"],
  template: `
    <div>
      <img v-bind:src='"images/producer/"+producer.id+".png"' @error="$event.target.src='images/missing.png'"/ v-for="prod in producers">
    </div>
  `
})

Vue.component("autobuyer-display", {
  props: ["autobuyer"],
  template: `
  <div class="autobuyer">
    <span class="autobuyername">{{autobuyer.displayname}}\n</span>
    <button class="autobuyeramountbutton" @click="autobuyer.togglebuyamount()">{{autobuyer.buyamounttext}}</button>
    <button v-bind:class='"autobuyerbutton " + "autobuyerbutton" + autobuyer.autobuyon' @click="autobuyer.toggle()">{{autobuyer.state}}</button>
  </div>
  `
})

var boringpiece = new BoardPiece([[1]], "green")

var subatomicidlingapp = new Vue({
    el: '#subatomicidling',
    data: {
        player : player,
        settings : settings,
        selectedupgrade : player.quarkstage.upgrades[0],
        selectedachievement : player.achievements.basic[0][0],
        selectedchallenge : player.challenges[0],
        selectedprestige : prestigeregistry[0],
        selectedboardpiece : boringpiece,
        versions : versions,
        prestiges : prestigeregistry
    },
    methods: {
      getupgradeautostate : function(){
        //var screen = player.options.currentupgradesscreen;
        //if(autobuyers[screen] != null){
        //  return autobuyers[screen].state
        //}
        return "Locked";
      },
      toggleupgradeautostate : function(){
        var screen = player.options.currentupgradesscreen;
        if(autobuyers[screen] != null){
          autobuyers[screen].toggle();
        }
      }
    }
})