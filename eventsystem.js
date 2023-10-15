function createEventSystem() {
  const events = new Map();

  const validate = (eventName, eventHandler) =>
    eventName &&
    typeof eventName == "string" &&
    eventHandler &&
    typeof eventHandler == "function"; //?

  const on = (eventName, eventHandler) =>
    validate(eventName, eventHandler) &&
    events.set(
      eventName,
      (events.has(eventName) ? events.get(eventName) : []).concat([
        eventHandler,
      ])
    );
  const off = (eventName) => events.delete(eventName);

  const emit = (eventName, ...args) =>
    events.has(eventName) &&
    events.get(eventName).forEach((eventHandler) => eventHandler(...args));
  return { on, off, emit };
}
