import * as desert from "../scenes/desert.js";
import * as town from "../scenes/town.js";
import * as camp from "../scenes/camp.js";
import * as arena from "../scenes/arena.js";
import { PlayerData } from "../classes/player-data.js";
import { init } from "./init.js";


nn.on('load', () => {
  
  init();
  let playerData = new PlayerData();
  
  
  
  // makeGrid(); // Debug grid with coordinates
  
  desert.make();
  town.make();
  camp.make();
  arena.make();
  
  
  playerData.spawnPos = vec2(width() / 2, height() / 2);
  go("desert", playerData);
  
  // Uncomment to load Town 1 scene on startup
  // playerData.spawnPosX = width() / 2;
  // playerData.spawnPosY = height() - 200;
  // go("town", playerData);
  
  // const windSnd = play("wind");
  // const walkSnd = play("walk");
  
});

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
    ]);
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
    ]);
  }
}

