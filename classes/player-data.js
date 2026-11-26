export class PlayerData {
  constructor() {
    this.spawnPos = vec2(width() / 2, height() / 2);
    this.gameObj = null;
    
    this.health = 100;
    this.money = 100;
    this.speed = 300;
    
    this.inv = {
      // Crafting items
      "rope": 0,
      "battery": 0,
      "wires": 0,
      "scrap": 0,
      "wires": 0,
      "nails": 0,
      "plastic": 0,
      
      // Turrets TODO: IMPLEMENT
      "turretA": 0, 
      "turretB": 0,
      "turretC": 0,
      
      // Traps TODO: IMPLEMENT
      "trapA": 0,
      "trapB": 0,
      "trapC": 0,
      
      // Water
      "water": 0 // liters
    }
    
    
  }
  
  makePlayer(newScale = vec2(0.3)) {
    if(this.gameObj) {
      this.gameObj.pos = this.spawnPos;
      this.gameObj.scale = newScale;
      return this.gameObj;
    }
    this.gameObj = add([
      sprite("player"),
      pos(this.spawnPos),
      anchor("center"),
      scale(0.3),
      area(),
      body(),
      z(10),
      stay(),
      
      area(),
      body(),
      "player"
    ]);
    
    this.gameObj.onCollide("arena", () => {
      this.spawnPos = vec2(width() / 2, height() / 2);
      go("arena", this);
    });
  
    return this.gameObj;
  }
  
  
  showInventory() {
    const invScreen = add([
      rect(width() / 2 - 100, height() - 400, { radius: 50 }),
      pos(100, 200),
      
      color(rgb(120, 120, 120)),
      outline(4, { color: BLACK }),
      opacity(0.9),
      z(1000000),
      
      "inventory"
    ]);
    
    // ITEMS
    const itemsLabel = invScreen.add([
      text("Items", { size: 30 }),
      pos(50, 90)
    ]);
    // Items list row 1
    for(let i = 0; i < 3; i++) {
      const itemContainer = invScreen.add(
        this.makeInvContainer(vec2(100 + 125 * i, 175), i));
    } // End items row 1
    // Items list row 2
    for(let i = 3; i < 6; i++) {
      const itemContainer = invScreen.add(
        this.makeInvContainer(vec2(100 + 125 * (i - 3), 300), i));

    } // End row 2
    
    // Turrets
    const turretsLabel = invScreen.add([
      text("Turrets", { size: 30 }),
      pos(50, 425)
    ])
    const turretsArr = ["turretA", "turretB", "turretC"];
    for(let i = 0; i < turretsArr.length; i++) {
      
    }
    
    
    // Traps
    
    // Water tank
    
  }
  
  makeInvContainer(containerPos, i) {
    const itemsArr = ["rope", "battery", "scrap", "wires", "nails", "plastic"];
    const scalesArr = [0.3, 0.3, 0.15, 0.08, 0.08, 0.05];
    const newContainer = make([
        rect(100, 100, { radius: 5 }),
        pos(containerPos),
        anchor("center"),

        color(rgb(120, 120, 120)),
        outline(3, { color: BLACK }),

      ]);

      const itemSprite = newContainer.add([
        sprite(itemsArr[i]),
        scale(scalesArr[i]),
        pos(0, 0),
        anchor("center")
      ]);

      const itemCount = newContainer.add([
        circle(20),
        pos(45, 45),
        anchor("center"),

        color(rgb(120, 120, 120)),
        outline(2, { color: BLACK })
      ]);

      const itemVal = itemCount.add([
        text(this.inv[itemsArr[i]], {
          size: 25,
        }),
        anchor("center"),
        pos(0, 0)
      ]);
    return newContainer;
  }
  
  hideInventory() {
    const invScreen = get("inventory");
    
    if(invScreen && invScreen.exists()) {
      destroy(invScreen);
    }
  }
}