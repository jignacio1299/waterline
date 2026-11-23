kaplay({
  width: 960,
  height: 600,
  background: [198, 178, 128],

  buttons: {
    moveUp: { keyboard: ["up", "w"] },
    moveDown: { keyboard: ["down", "s"] },
    moveLeft: { keyboard: ["left", "a"] },
    moveRight: { keyboard: ["right", "d"] },
    attack: { keyboard: ["space"] }
  }
});

let playerHealth = 100;
let kills = 0;
let spawnTimer = 0;
let canAttack = true;


scene("startMenu", () => {
  setBackground(rgb(40, 40, 40));

  add([
    text("SURVIVOR GAME", { size: 48 }),
    pos(width() / 2, height() / 2 - 80),
    anchor("center"),
    color(255, 220, 80)
  ]);

  add([
    text("Survive the enemy swarm!", { size: 24 }),
    pos(width() / 2, height() / 2 - 20),
    anchor("center")
  ]);
add([
    text("PRESS ANY BUTTON TO START", { size: 22 }),
    pos(width() / 2, height() / 2 + 60),
    anchor("center")
  ]);

  // Any keyboard button starts the game
  onKeyPress(() => {
    go("game");
  });

  // Clicking anywhere starts the game
  onMousePress(() => {
    go("game");
  });

  // Any gamepad button starts the game
  onGamepadButtonPress(() => {
    go("game");
  });
});


scene("game", () => {
  setBackground(rgb(198, 178, 128));

  playerHealth = 100;
  kills = 0;
  spawnTimer = 0;
  canAttack = true;

  const player = add([
    rect(25, 25),
    pos(width() / 2, height() / 2),
    color(BLUE),
    anchor("center"),
    area(),
    z(10),
    "player"
  ]);

  for (let i = 0; i < 15; i++) {
    makeCactus();
  }

  // PLAYER MOVEMENT
  const SPEED = 250;

  onUpdate(() => {
    if (isButtonDown("moveUp")) {
      player.move(0, -SPEED);
    }

    if (isButtonDown("moveDown")) {
      player.move(0, SPEED);
    }

    if (isButtonDown("moveLeft")) {
      player.move(-SPEED, 0);
    }

    if (isButtonDown("moveRight")) {
      player.move(SPEED, 0);
    }

    player.pos.x = clamp(player.pos.x, 15, width() - 15);
    player.pos.y = clamp(player.pos.y, 15, height() - 15);
  });

  // ENEMY SPAWNING
  onUpdate(() => {
    spawnTimer -= dt();

    if (spawnTimer <= 0) {
      makeEnemy(player);
      spawnTimer = 1.2;
    }
  });

  // PLAYER MELEE ATTACK
  onButtonPress("attack", () => {
    if (!canAttack) return;

    canAttack = false;

    const slash = add([
      circle(55),
      pos(player.pos),
      color(255, 220, 80),
      opacity(0.6),
      anchor("center"),
      z(15),
      "slash"
    ]);

    for (const enemy of
get("enemy")) {
      const distance = player.pos.dist(enemy.pos);

      if (distance < 65) {
        destroy(enemy);
        kills++;
      }
    }

    updateHUD();

    wait(0.15, () => {
      if (slash.exists()) {
        destroy(slash);
      }
    });

    wait(1, () => {
      canAttack = true;
    });
  });

  // PLAYER DAMAGE
let damageTimer = 0;

player.onUpdate(() => {
  const touchingEnemies = get("enemy").some((enemy) => {
    return player.isColliding(enemy);
  });

  if (touchingEnemies) {
    damageTimer -= dt();

    if (damageTimer <= 0) {
      playerHealth -= 10;
      damageTimer = 0.7;

      updateHUD();

      if (playerHealth <= 0) {
        playerHealth = 0;
        updateHUD();
        go("gameOver", kills);
      }
    }
  } else {
    damageTimer = 0;
  }
});
});

// CREATE ENEMY
function makeEnemy(player) {
  let side = Math.floor(rand(0, 4));
  let x, y;

  if (side === 0) {
    x = rand(0, width());
    y = -30;
  } else if (side === 1) {
    x = width() + 30;
    y = rand(0, height());
  } else if (side === 2) {
    x = rand(0, width());
    y = height() + 30;
  } else {
    x = -30;
    y = rand(0, height());
  }

  const enemy = add([
rect(25, 25),
    pos(x, y),
    color(RED),
    anchor("center"),
    area(),
    z(5),
    "enemy"
  ]);

  enemy.onUpdate(() => {
    const direction = player.pos.sub(enemy.pos).unit();
    enemy.move(direction.scale(85));
  });
}

// CREATE CACTUS
function makeCactus() {
  const x = rand(30, width() - 30);
  const y = rand(30, height() - 30);

  add([
    rect(12, 35),
    pos(x, y),
    color(rgb(76, 115, 65)),
    anchor("center"),
    z(1)
  ]);
}

// UPDATE HUD
function updateHUD() {
  document.getElementById("health").textContent =
    "Health: " + playerHealth;

  document.getElementById("kills").textContent =
    "Kills: " + kills;
}

// GAME OVER
scene("gameOver", (finalKills) => {
  setBackground(rgb(40, 40, 40));

  add([
    text("GAME OVER", { size: 48 }),
    pos(width() / 2, height() / 2 - 60),
    anchor("center")
  ]);

  add([
    text("Kills: " + finalKills, { size: 28 }),
    pos(width() / 2, height() / 2),
    anchor("center")
  ]);

  add([
    text("Press SPACE to restart", { size: 20 }),
    pos(width() / 2, height() / 2 + 60),
    anchor("center")
  ]);

  onKeyPress("space", () => {
    go("game");
  });
});

go("startMenu");