export default function addEvent(element, event, func) {
  if (element.attachEvent) {
    element.attachEvent(`on${event}`, () => {
      func.call(element);
    });
  } else {
    element.addEventListener(event, func, false);
  }
}
