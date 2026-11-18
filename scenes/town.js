export function make() {
  scene("town", (playerData) => {
    
    setBackground(rgb(198, 178, 128));
    
    const player = makePlayer(playerData);
    
    const sceneName = add([
      pos(10, 10),
      color(WHITE),
      text("Town", {}),
      z(10000)
    ])
    
    makeBuilding(450, 900);
    makeBuilding(850, 900, 250, 200);
    makeBuilding(100, 500, 200, 400);
    makeBuilding(500, 400, 250, 300);
    makeBuilding(1000, 300, 300, 400);
    
    for(let i = 0; i < 15; i++) {
      makeItem(playerData);
    }
    
    
    const bottomWall1 = add([
      rect(width() / 2 - 100, 100, { radius: 16 }),
      color(rgb(53, 20, 18)),
      pos(0, height() - 100),
      z(3),
      
      area(),
      body({ isStatic: true })
      
    ]);
    
    const bottomWall2 = add([
      rect(width() / 2 - 100, 100, { radius: 16 }),
      color(rgb(53, 20, 18)),
      pos(850, height() - 100),
      z(3),
      
      area(),
      body({ isStatic: true })
    ]);
    
    const leftWall = add([
      rect(100, height(), { radius: 16 }),
      color(rgb(53, 20, 18)),
      pos(0, 0),
      z(3),
      
      area(),
      body({ isStatic: true })
    ]);
    
    const rightWall = add([
      rect(100, height(), { radius: 16}),
      color(rgb(53, 20, 18)),
      pos(width() - 100, 0),
      
      area(),
      body({ isStatic: true })
    ]);
    
    const topWall = add([
      rect(width(), 100, { radius: 16}),
      color(rgb(53, 20, 18)),
      pos(0, 0),
      z(3),
      
      area(),
      body({ isStatic: true })
    ]);
    
    const exit = add([
      rect(200, 100),
      pos(width() / 2 - 100, height() - 100),

      color(BLACK),
      opacity(0),
      
      area(),
      body(),
      "exit"
    ]);
    
    const guard1 = add([
      sprite("guard", { flipX: true }),
      scale(0.2),
      pos(1150, 700),
    ]);
    
    const guard2 = add([
      sprite("guard"),
      scale(0.2),
      pos(300, 300)
    ])
    
    // console.log(playerData.inv);
  })
}

function makePlayer(playerData) {
  const player = add([
    sprite("player"),
    pos(playerData.spawnPosX, playerData.spawnPosY),
    anchor("center"),
    scale(0.3),
    area(),
    body(),
    "player"
  ]);
  
  setControls(player);
  
  player.onCollide("exit", () => {
    playerData.spawnPosX = 160;
    playerData.spawnPosY = 450;
    go("desert", (playerData))
  })
  
  return player;
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
      player.flipX = true;
    });
    onButtonDown("moveRight", () => {
      player.move(SPEED, 0);
      player.flipX = false;
    });
  
}

function makeBuilding(x, y, width = 200, height = 200, buildingColor = rgb(120, 120, 120)) {
  add([
    rect(width, height, { radius: 16 }),
    area(),
    body({ isStatic: true }),
    z(3),
    
    color(buildingColor),
    
    pos(x, y),
    
  ])
}

function makeItem(playerData) {
  const itemsArray = ["rope", "battery"];
  
  let ind = randi(0, itemsArray.length);
  let item = itemsArray[ind];
  // console.log(item)
  // let item = itemsArray[0]
  
  let x = rand(100, width() - 200);
  let y = rand(100, height() - 200);
  
  const newItem = add([
    sprite(item),
    scale(0.2),
    pos(x, y),
    area(),
    z(1),
    "item"
  ]);
  
  newItem.onCollide("player", () => {
    playerData.inv[item]++;
    newItem.destroy();
  })
}

