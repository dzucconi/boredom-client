import { speed } from "../config";

export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  top: number;
  right: number;
  left: number;
  bottom: number;
}

export const sample = <T>(xs: T[]): T =>
  xs[Math.floor(Math.random() * xs.length)];

export const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

export const range = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const move = (): Point => ({
  x: rand(0, window.innerWidth),
  y: rand(0, window.innerHeight)
});

export const wait = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms * speed));

export const fuzzyWait = (min: number, max: number) => {
  const ms = range(min, max);
  return wait(ms);
};

export const between = (min: number, p: number, max: number) =>
  (min < max && (p > min && p < max)) ||
  (min > max && (p > max && p < min)) ||
  (p === min || p === max);

export const intersects = (point: Point, rect: Rect) =>
  between(rect.left, point.x, rect.right) &&
  between(rect.top, point.y, rect.bottom);

export const detect = (x: number, y: number, areas: Rect[]) =>
  areas.find(rect => intersects({ x, y }, rect));

export const center = ({ top, right, bottom, left }: Rect): Point => ({
  x: left + (right - left) / 2,
  y: top + (bottom - top) / 2
});

export const transformTo = ({ x, y }: Point) => ({
  transform: `translate(${x}px, ${y}px)`
});

export const area = (el: HTMLAnchorElement) => {
  const rect = el.getBoundingClientRect();
  const { top, right, bottom, left } = rect;

  return {
    el,
    top,
    right,
    bottom,
    left,
    center: center(rect)
  };
};
