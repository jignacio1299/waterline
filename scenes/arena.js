import { Enemy } from "../classes/enemy.js";
import { Turret } from "../classes/turret.js";


export function make() {
  scene("arena", (playerData) => {
    
    setBackground(rgb(198, 178, 128));
    
    const player = makePlayer(playerData);
    
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
    
    const exit = add([
      rect(200, 100),
      pos(width() / 2 - 100, height() - 100),

      color(BLACK),
      opacity(0),
      
      area(),
      body(),
      "exit"
    ]);
  
    
  }) // End Scene
}

function makePlayer(playerData) {
  const player = playerData.makePlayer(vec2(0.33));
  
  const SPEED = 300;
  playerData.gameObj.speed = 600;
  onButtonDown("moveUp", () => {
    player.move(0, -SPEED);
  });

  onButtonDown("moveDown", () => {
    player.move(0, SPEED);
  });
  onButtonDown("moveLeft", () => {
    player.move(-SPEED, 0);
    player.flipX = true;
  });
  onButtonDown("moveRight", () => {
    player.move(SPEED, 0);
    player.flipX = false;
  });
  
  onButtonPress("placeTurret", () => {
    const newTurret = new Turret();
    newTurret.place(player.pos.x, player.pos.y)
  });
  
  player.onCollide("exit", () => {
    playerData.spawnPos = vec2(450, 900);
    go("desert", (playerData))
  });
}

// TODO: Parameterize wave difficulty with suspicion meter
function spawnWave() {
  
}