export function make() {
  scene("desert", (playerData) => {
    
    setBackground(rgb(198, 178, 128));
    
    const player = makePlayer(playerData);
    
    const sceneName = add([
      color(BLACK),
      text("Desert", {}),
      "sceneName"
    ]);
    
    const town1 = add([
      rect(150, 150, { radius: 16 }),
      pos(160, 300),
      color(rgb(120, 120, 120)),
      area(),
      anchor("center"),
      z(1),
      "town1"
    ])
    
    town1.add([
      pos(0, 0),
      z(0),
      text("Town 1", {
        size: 35,
        align: "center"
      }),
      anchor("center")
    ])
    for(let i = 0; i < 30; i++) {
      makeCactus();
    
    }
  });
  
  
  
  
}

function makePlayer(playerData) {
  const player = add([
    sprite("player"),
    pos(playerData.spawnPosX, playerData.spawnPosY),
    anchor("center"),
    scale(0.15),
    area(),
    body(),
    z(10),
    "player"
    ]);
  
  setControls(player);
  
  player.onCollide("town1", () => {
    playerData.spawnPosX = width() / 2;
    playerData.spawnPosY = height() - 200;
    go("town", playerData);
  });
  
  return player;
}

// Keyboard input
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
      player.flipX = true;
    });
    onButtonDown("moveRight", () => {
      player.move(SPEED, 0);
      player.flipX = false;
    });
}

function makeCactus() {
  let x = rand(100, width() - 100);
  let y = rand(100, height() - 100);
  console.log(x, y)

  const newCactus = add([
    sprite("cactus"),
    pos(x, y),
    scale(0.08),
    // area(),
    // body({ isStatic: true }),

    "cactus"
  ])
}