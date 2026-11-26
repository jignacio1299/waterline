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
      placeTurret: {
        keyboard: ["f"],
        gamepad: ["east"],
      },
      inventory: {
        keyboard: ["e", "i"],
        gamepad: ["start"],
      }
    },
    
    // Canvas
    focus: false,
    width: 1500, height: 1200,
    stretch: true,
    letterbox: true
    
  });
  
  loadSprites();
  
}

function loadSprites() {
  // Characters
  loadSprite("player", "assets/sprites/characters/player.png");
  loadSprite("guard", "assets/sprites/characters/guard.png");
  
  // Items
  loadSprite("rope", "assets/sprites/items/rope.webp"); // TODO: PLACEHOLDER
  loadSprite("battery", "assets/sprites/items/battery.png"); // TODO: PLACEHOLDER
  loadSprite("scrap", "assets/sprites/items/scrap.png"); // TODO: RESIZE
  loadSprite("wires", "assets/sprites/items/wires.jpeg"); // TODO: PLACEHOLDER
  loadSprite("nails", "assets/sprites/items/nails.jpg"); // TODO: PLACEHOLDER
  loadSprite("plastic", "assets/sprites/items/plastic.png"); // TODO: PLACEHOLDER
  
  // Environment
  loadSprite("cactus", "assets/sprites/environment/cactus.jpg");
  loadSprite("town", "assets/sprites/environment/town.png");
  loadSprite("camp", "assets/sprites/environment/camp.png");
  
  loadSound("wind", "assets/sounds/wind_sfx.mp3");
  loadSound("walk", "assets/sounds/sand_walk_sfx.mp3");
}


