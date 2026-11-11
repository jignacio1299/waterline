nn.on('load', () => {
  
  kaplay({
    //Scene
    focus: false,
    background: [198, 178, 128]
  })
  
  loadSprite("player", "assets/sprites/player.png");
  loadSprite("rope", "assets/sprites/rope.webp");
  loadSprite("battery", "assets/sprites/battery.png");
  
  loadSound("wind", "assets/sounds/wind_sfx.mp3");
  loadSound("walk", "assets/sounds/sand_walk_sfx.mp3");
  
  const player = add([
    sprite("player"),
    pos(100, 100),
    scale(0.5),
    "player"
  ]);
  
  const ropeSprite = add([
    sprite("rope"),
    pos(100, 300),
    "rope"
  ]);
  
  const battery = add([
    sprite("battery"),
    pos(300, 300),
    "battery"
  ]);
  
  const windSnd = play("wind");
  const walkSnd = play("walk");
  
})