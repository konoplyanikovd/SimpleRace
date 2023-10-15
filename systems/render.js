(canvasCtx, object) => {
  if (
    !(
      canvasCtx ||
      object ||
      object.position ||
      Number.isInteger(object.position.x) ||
      Number.isInteger(object.position.y) ||
      Number.isInteger(object.size.width) ||
      Number.isInteger(object.size.height)
    )
  )
    return;
  canvasCtx.fillRect(
    object.position.x,
    object.position.y,
    object.size.width,
    object.size.height
  );
}