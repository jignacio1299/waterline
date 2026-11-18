export function make() {
  scene("Arena", () => {
    
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
      
    ])
  })
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
}