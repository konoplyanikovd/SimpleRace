(events) => {
  events.emit("init");

  var loop = setInterval(function () {
    events.emit("before-update");

    events.emit("update");

    events.emit("after-update");
  }, 1000 / 30);

  events.on("finish", () => clearInterval(loop));
}
