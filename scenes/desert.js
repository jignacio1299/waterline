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
    const arena = add([
      rect(150, 150, { radius: 16 }),
      pos(460, 700),
      color(rgb(120, 120, 120)),
      area(),
      anchor("center"),
      z(1),
      "arena"
    ]);
    arena.add([
      pos(0, 0),
      z(0),
      text("Arena", {
        size: 35,
        align: "center"
      }),
      anchor("center")
    ])
    for(let i = 0; i < 30; i++) {
      makeCactus();
    
    }
    // End Scene
    
    
  playerData.showInventory();
  });
  
  
  
}

function makePlayer(playerData) {
  const player = playerData.makePlayer();
  
  player.scale = vec2(0.15);
  
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
  
  onGamepadStick("left", (value, gamepad) => {
    player.move(value.scale(SPEED))
  })

  
  
  // player.onCollide("town1", () => {
    
    
  // });
  
  onCollide("player", "town1", () => {
    playerData.spawnPos = vec2(width() / 2, height() - 200);
    go("town", playerData);
  })
  
  player.onCollide("arena", () => {
    playerData.spawnPos = vec2(width() / 2, height() / 2);
    go("arena", playerData);
  });
  
  return player;
}

function makeCactus() {
  let x = rand(100, width() - 100);
  let y = rand(100, height() - 100);

  const newCactus = add([
    sprite("cactus"),
    pos(x, y),
    scale(0.08),
    // area(),
    // body({ isStatic: true }),

    "cactus"
  ])
}