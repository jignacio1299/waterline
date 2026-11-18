import { Enemy } from "../classes/enemy.js";
export function make() {
  scene("arena", (playerData) => {
    
    setBackground(rgb(198, 178, 128));
    
    const player = add([
      sprite("player"),
      pos(width() / 2, height() / 2),
      anchor("center"),
      scale(0.3),
      area(),
      "player"
    ]);
    
    setControls(player);
    
    const sceneName = add([
      pos(0, 0),
      color(BLACK),
      text("Arena", {}),
      
    ]);
    
    let enemy = new Enemy();
    
    for(let i = 0; i < 5; i++) {
      
      enemy.addEnemy();
    }
    
  }) // End Scene
}

function setControls(player) {
  const SPEED = 300;
    onButtonDown("moveUp", () => {
      player.move(0, -SPEED);
    });

    onButtonDown("moveDown", () => {
      player.move(0, SPEED);
    });
    onButtonDown("moveLeft", () => {
      player.move(-SPEED, 0);
    });
    onButtonDown("moveRight", () => {
      player.move(SPEED, 0);
    });
}