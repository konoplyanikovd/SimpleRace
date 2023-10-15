(enemies, countNewAtTime = 1, width = 0) => {
  const newActiveEnemies = Math.round(Math.random() * countNewAtTime);

  for (let i = 0; i < newActiveEnemies; i++) {
    const enemyIndex = enemies.findIndex((p) => !p.active);
    if (enemyIndex === -1) return;

    enemies[enemyIndex].active = true;
    enemies[enemyIndex].position.x = Math.round(Math.random() * width);
  }
}