(enemy, player, canvas, eventSystem) => {
  if (
    !(
      enemy ||
      enemy.position ||
      Number.isInteger(enemy.position.y) ||
      Number.isInteger(enemy.position.x) ||
      player ||
      player.position ||
      Number.isInteger(player.position.x) ||
      canvas ||
      eventSystem
    )
  )
    return;
  if (
    enemy.position.y > canvas.height - 60 &&
    enemy.position.y < canvas.height - 10 &&
    Math.abs(player.position.x - enemy.position.x) < 10
  ) {
    eventSystem.emit("finish");

    alert("Game over");
  }
}