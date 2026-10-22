/** Sheet geometry shared by the scroll driven modules. */

import { selectAll } from './dom';
import { clamp } from './env';

export interface Rect {
  top: number;
  bottom: number;
}

export function rectsOf(elements: readonly Element[]): Rect[] {
  return elements.map((element) => {
    const rect = element.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom };
  });
}

/** 0 before the sheet reaches the viewport, 1 once it has fully left. */
export function sectionProgress(rect: Rect, viewportHeight: number): number {
  const span = rect.bottom - rect.top + viewportHeight;
  return span <= 0 ? 0 : clamp((viewportHeight - rect.top) / span, 0, 1);
}

/** Index of the sheet covering the given viewport line, or the nearest one. */
export function activeSectionIndex(rects: readonly Rect[], line: number): number {
  let best = 0;
  let bestDistance = Number.POSITIVE_INFINITY;

  rects.forEach((rect, index) => {
    const distance = line < rect.top ? rect.top - line : line > rect.bottom ? line - rect.bottom : 0;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = index;
    }
  });

  return best;
}

export function sheets(root: ParentNode = document): HTMLElement[] {
  return selectAll<HTMLElement>('[data-sheet]', root);
}
