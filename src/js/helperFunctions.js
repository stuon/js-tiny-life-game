function repeatXI(callback, interval, repeats, immediate, finalCallback) {
  let timer, trigger;

  trigger = function () {
    let success = callback();

    if (success) {
      success = --repeats > 0;
    }

    if (!success) {
      clearInterval(timer);

      if (finalCallback) finalCallback();
    }
  };

  interval = interval <= 0 ? 1000 : interval; // default: 1000ms
  repeats = parseInt(repeats, 10) || 0; // default: repeat forever
  timer = setInterval(trigger, interval);

  if (!!immediate) {
    // Coerce boolean
    trigger();
  }
}

export { repeatXI };
