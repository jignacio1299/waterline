export class Enemy {
  constructor() {
    this.model = [
      sprite("guard"),
      scale(0.3),
      anchor("center"),
      area(),
      
      "guard",
      "enemy"
    ]
    this.target = null;
    this.gameObj = null;
    this.speed = 50;
  }
  
  add() {
    let offset = 100; // pixels
    let x = rand(offset, width() - offset);
    let y = rand(offset, height() - offset);
    
    this.model.push(pos(x, y));
    this.gameObj = add(this.model);
    
    
    this.gameObj.onUpdate(() => {
      this.moveToPlayer();
    })
  }
  moveToPlayer() {
    if(this.target === null) {
      this.target = getTreeRoot().get("player")[0];
      return;
    }
    
    const dir = this.target.pos.sub(this.gameObj.pos).unit();
    this.gameObj.move(dir.scale(this.speed));
  }
}