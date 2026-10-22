/** Thin DOM helpers so feature modules stay free of boilerplate. */

export function select<T extends Element>(selector: string, root: ParentNode = document): T | null {
  return root.querySelector<T>(selector);
}

export function selectAll<T extends Element>(selector: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(selector));
}

/** Registers a listener and returns its removal function. */
export function on(
  target: EventTarget,
  type: string,
  handler: (event: Event) => void,
  options?: AddEventListenerOptions,
): () => void {
  const listener = handler as EventListener;
  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
}

/** Calls the handler immediately with the current state, then on every change. */
export function watchMedia(query: string, handler: (matches: boolean) => void): () => void {
  const list = window.matchMedia(query);
  const listener = () => handler(list.matches);
  listener();
  return on(list, 'change', listener);
}
