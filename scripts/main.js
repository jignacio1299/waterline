import * as desert from "../scenes/desert.js";
import * as town from "../scenes/town.js";
import * as shops from "../scenes/shops.js";
import * as arena from "../scenes/arena.js";
import { PlayerData } from "../classes/player-data.js";
import { init } from "./init.js";


nn.on('load', () => {
  
  
  let playerData = new PlayerData();
  
  init();
  
  // makeGrid(); // Debug grid with coordinates
  
  desert.make();
  town.make();
  shops.make();
  arena.make();
  
  
  playerData.spawnPosX = width() / 2;
  playerData.spawnPosY = height() / 2;
  go("desert", playerData);
  
  // Uncomment to load Town 1 scene on startup
  // playerData.spawnPosX = width() / 2;
  // playerData.spawnPosY = height() - 200;
  // go("town", playerData);

  
  // const player = add([
  //   sprite("player"),
  //   pos(100, 100),
  //   scale(0.5),
  //   "player"
  // ]);
  
  // const ropeSprite = add([
  //   sprite("rope"),
  //   pos(100, 300),
  //   "rope"
  // ]);
  
  // const battery = add([
  //   sprite("battery"),
  //   pos(300, 300),
  //   "battery"
  // ]);
  
  // const windSnd = play("wind");
  // const walkSnd = play("walk");
  
})

function makeGrid() {
  for(let x = 100; x < width(); x += 100) {
    add([
      rect(10, height()),
      
      color(BLACK),
      opacity(0.6),
      
      pos(x, 0),
      anchor("top"),
      
      stay(),
      z(10000)
    ])
  }
  
  for(let y = 100; y < height(); y += 100) {
    add([
      rect(width(), 10),
      
      color(BLACK),
      opacity(0.6),
      
      pos(0, y),
      anchor("left"),
      
      stay(),
      z(10000)
    ])
  }
}

