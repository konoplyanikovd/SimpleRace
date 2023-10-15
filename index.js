const include = (scriptName) =>
  new Promise((resolve) =>
    fetch(`/${scriptName}`).then((x) =>
      x.text().then((y) => y && resolve(eval(`;(${y});`)))
    )
  );

const load = [
  include("game.js"),
  include("eventsystem.js"),
  include("systems/move.js"),
  include("systems/render.js"),
  include("systems/checkFail.js"),
  include("systems/activateEnemies.js"),
];

Promise.all(load).then(
  ([gameRun, createEventSystem, move, draw, checkFail, activateEnemies]) => {
    const canvas = document.querySelector("#main-canvas");
    if (!canvas) return;

    const renderer = canvas.getContext("2d");

    const heightOffset = 10;
    function createDefaultEnemy() {
      const defaultPlayerSizes = {
        width: 10,
        height: 10,
      };

      return {
        position: {
          x: 0,
          y: -heightOffset,
        },
        size: new Proxy(defaultPlayerSizes, {}),
        active: false,
      };
    }
    
    const playerPositionFix = {
      x: 0,
      y: 0,
    };

    const playerHeight = 40;
    const player = Object.assign(createDefaultEnemy(), {
      size: { ...createDefaultEnemy().size, height: playerHeight },
      active: true,
    });

    const enemiesMaxCount = 250;
    const enemies = new Array(enemiesMaxCount)
      .fill(0)
      .map(() => createDefaultEnemy());

    const events = createEventSystem();

    events.on("init", () => {
      canvas.width = 800;
      canvas.height = 600;
      renderer.fillStyle = "black";

      player.position = Object.assign(player.position, {
        x: canvas.width / 2,
        y: canvas.height - (playerHeight + heightOffset),
      });
      document.addEventListener("keydown", (event) => {
        if (!["d", "a"].includes(event.key)) return;
        const oneStepWidth = 9;
        if (event.key === "a") playerPositionFix.x -= oneStepWidth;
        if (event.key === "d") playerPositionFix.x += oneStepWidth;
      });
    });

    events.on("before-update", () => {
      renderer.clearRect(0, 0, canvas.width, canvas.height);
      activateEnemies(enemies, 3, canvas.width);
    });

    events.on("update", () => {
      enemies.forEach((enemy, index) => {
        if (!enemy.active) return;

        checkFail(enemy, player, canvas, events);
        move(enemy, [0, 4]);
        move(player, [playerPositionFix.x, 0]);
        playerPositionFix.x = 0;

        if (enemy.position.y > canvas.height - 5)
          enemies[index] = createDefaultEnemy();
      });
    });

    events.on("after-update", () => {
      draw(renderer, player);

      enemies
        .filter((enemy) => enemy.active)
        .forEach((enemy) => draw(renderer, enemy));
    });

    gameRun(events);
  }
);
