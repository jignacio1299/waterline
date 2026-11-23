export class Bullet {
  constructor(target, x, y) {
    if(target === null) { return; }
    this.gameObj = add([
      circle(10, 10),
      color(rgb(21, 59, 71)),
      anchor("center"),
      area(),
      body(),
      
      pos(x, y),
      
      
      "bullet"
    ]);
    
    this.dir = target.pos.sub(this.gameObj.pos).unit();
    this.speed = 500;
    
    this.gameObj.onCollide("enemy", (enemy) => {
      destroy(enemy);
      destroy(this.gameObj);
    });
    this.gameObj.onUpdate(() => {
      this.gameObj.move(this.dir.scale(this.speed));
    })
    
  }
}