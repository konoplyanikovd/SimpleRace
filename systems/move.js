(object, positionsFixes = [0, 0]) => {
  if (!(object || object.position || Number.isInteger(object.position.x) || Number.isInteger(object.position.y)))
    return;
  object.position.x += positionsFixes[0];
  object.position.y += positionsFixes[1];
}