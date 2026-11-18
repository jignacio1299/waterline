export class Enemy {
  constructor() {
    
  }
  
  addEnemy() {
    const newEnemy = add([
      sprite("guard"),
      pos(rand(0, width()), rand(0, height())),
      scale(0.3)
    ])
    
    newEnemy.onUpdate(() => {
      
    })
  }
}