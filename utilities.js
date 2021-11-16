const { createPath } = require("canvas-sketch-util/penplot");

export const LINE_WIDTH = 0.01;
export const PAPER_HEIGHT = 4.5;
export const PAPER_WIDTH = 6.5;

/**
 * Map a number from one range to another range
 * https://gist.github.com/xposedbones/75ebaef3c10060a3ee3b246166caab56
 */
export const map = (number, inMin, inMax, outMin, outMax) => {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export const grid = (rows, columns, draw) => {
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      draw(row, column);
    }
  }
};

export const drawSquare = (x, y, w, h) => {
  const p = createPath();
  p.moveTo(x, y);
  p.lineTo(x, y + h);
  p.lineTo(x + w, y + h);
  p.lineTo(x + w, y);
  p.closePath();
  return p;
};

/**
 * Math functions
 */

export const radians = (degrees) => {
  return (degrees / 360) * (Math.PI * 2);
};
