export class PlayerData {
  constructor() {
    this.spawnPos = vec2(width() / 2, height() / 2);
    this.gameObj = null;
    
    this.health = 100;
    this.money = 100;
    this.speed = 300;
    
    this.inv = {
      "rope": 0,
      "battery": 0,
      "wires": 0,
      "scrap": 0
      // Add more items down here
    }
    
    
    
  }
  
  makePlayer(newScale = vec2(0.3)) {
    console.log("S");
    
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
      rect(width() - 400, height() - 400, { radius: 50 }),
      pos(200, 200),
      
      color(rgb(120, 120, 120)),
      outline(4, { color: BLACK }),
      opacity(0.9),
      z(1000000),
      
      "inventory"
    ]);
    
    const itemCategory = invScreen.add([
      text("Items"),
      pos(50, 50)
    ]);
    
    // Items list
    const itemsArr = ["rope", "battery", "scrap", ];
    
    for(let i = 0; i < itemsArr.length; i++) {
      const itemContainer = invScreen.add([
        rect(100, 100, { radius: 5 }),
        pos(100 + 150 * i, 150),
        anchor("center"),

        color(rgb(120, 120, 120)),
        outline(3, { color: BLACK }),

      ]);

      const itemSprite = itemContainer.add([
        sprite(itemsArr[i]),
        scale(0.3),
        pos(0, 0),
        anchor("center")
      ])

      const itemCount = itemContainer.add([
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
    } // End items list
    
    // Turrets
    
    // Traps
    
    // Water tank
    
  }
  
  hideInventory() {
    const invScreen = get("inventory");
    
    if(invScreen && invScreen.exists()) {
      destroy(invScreen);
    }
  }
}