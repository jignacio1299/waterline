import { Bullet } from "./bullet.js";

export class Turret {
  static craft(playerData) {
    // Take mats away from playerData.inv
    // Add turret to playerData
  }
  constructor() {
    this.gameObj = null;
    this.model = [
      // sprite("turret"),
      rect(70, 70, { radius: 16 }),
      color(rgb(42, 112, 135)),
      anchor("center"),
      area(),
      "turret"
    ]
    
    this.target = null;
    this.timeSinceShooting = 2.0;
    this.durability = 10;
    
    this.x = null;
    this.y = null;
  }
  
  place(x, y) {
    this.x = x;
    this.y = y;
    this.model.push(pos(x, y));
    this.gameObj = add(this.model);
    this.gameObj.onUpdate(() => {
      this.aim();
    })
  }
  
  aim() {
    
    // if(this.target === null || !this.target.exists) {
    //   console.log("changing target")
    //   this.findClosestTarget();
    //   this.timeSinceShooting = 1.0;
    //   return;
    // }
    this.findClosestTarget();
    // TODO: Rotate model towards target
    this.shoot();
  }
  
  shoot() {
    this.timeSinceShooting -= dt();
    
    if(this.timeSinceShooting <= 0) {
      // Create new bullet
      
      const newBullet = new Bullet(this.target, this.x, this.y);
      
      this.timeSinceShooting = 1.0;
      this.durability -= 1;
      
      if(this.durability <= 0) { destroy(this.gameObj); }
    }
  }
  
  findClosestTarget() {
    const enemies = getTreeRoot().get("enemy");
    
    let closest = null;
    let minDist = Infinity;
    
    for(const enemy of enemies) {
      const currDist = this.gameObj.pos.sdist(enemy.pos);
      
      if(currDist < minDist) {
        minDist = currDist;
        closest = enemy;
      }
    }
    
    this.target = closest;
  }
  
}