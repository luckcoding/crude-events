export default function delEvent(element, event, func) {
  if (element.detachEvent) {
    element.detachEvent(`on${event}`, func, false);
  } else {
    element.removeEventListener(event, func, false);
  }
}
