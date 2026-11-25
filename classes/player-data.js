export class PlayerData {
  constructor() {
    this.spawnPos = vec2(width() / 2, height() / 2);
    this.gameObj = null;
    
    this.health = 100;
    this.money = 100;
    this.speed = 300;
    
    this.inv = {
      rope: 0,
      battery: 0,
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
}