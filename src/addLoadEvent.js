/**
 * bind more onload event
 * @param {Function} func
 */
export default function addLoadEvent(func) {
  const { onload } = window;
  if (typeof onload === 'function') {
    window.onload = function main() {
      onload();
      func();
    };
  } else {
    window.onload = func;
  }
}
