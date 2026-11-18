export function init() {
  kaplay({
    
    // button setup

    buttons: {
      moveUp: {
        keyboard: ["up", "w"],
        gamepad: ["dpad-up"],
      },
      moveDown: {
        keyboard: ["down", "s"],
        gamepad: ["dpad-down"],
      },
      moveLeft: {
        keyboard: ["left", "a"],
        gamepad: ["dpad-left"],
      },
      moveRight: {
        keyboard: ["right", "d"],
        gamepad: ["dpad-right"],
      },
      o: {
        keyboard: ["o"]
      },
    },
    
    // Canvas
    focus: false,
    width: 1500, height: 1200,
    
  });
  
  loadSprites();
  
}

function loadSprites() {
  // Characters
  loadSprite("player", "assets/sprites/player.png");
  loadSprite("guard", "assets/sprites/guard.png");
  
  // Items
  loadSprite("rope", "assets/sprites/rope.webp");
  loadSprite("battery", "assets/sprites/battery.png");
  
  // Environment
  loadSprite("cactus", "assets/sprites/cactus.jpg");
  
  loadSound("wind", "assets/sounds/wind_sfx.mp3");
  loadSound("walk", "assets/sounds/sand_walk_sfx.mp3");
}


