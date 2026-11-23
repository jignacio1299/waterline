import { Enemy } from "../classes/enemy.js";
import { Turret } from "../classes/turret.js";


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
    
    loop(8, () => {
      for(let i = 0; i < 15; i++) {
        let enemy = new Enemy();
        enemy.add();
      }
    });
  
    
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
  onButtonPress("placeTurret", () => {
    const newTurret = new Turret();
    newTurret.place(player.pos.x, player.pos.y)
  })
}

// TODO: Parameterize wave difficulty with suspicion meter
function spawnWave() {
  
}