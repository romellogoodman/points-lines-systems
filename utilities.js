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

export const drawCircle = (centerX, centerY, radius, resolution) => {
  const p = createPath();
  let step = (2 * Math.PI) / resolution;

  for (let angle = 0; angle <= 2 * Math.PI; angle = angle + step) {
    let x = Math.cos(angle) * radius + centerX;
    let y = Math.sin(angle) * radius + centerY;

    if (angle == 0) p.moveTo(x, y);
    else p.lineTo(x, y);
  }

  return p;
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

export const drawArc = (x, y, radius, angleStart, angleEnd) => {
  const p = createPath();

  p.arc(x, y, radius, radians(angleStart), radians(angleEnd));

  return p;
};

export const drawPerfectCurve = (A, B) => {
  let p = createPath();

  // TODO: this is buggy and does not work currently
  const getControlPoint = (p1, p2, percentAlongLine = 0.5) => {
    return (1 - percentAlongLine) * p1 + percentAlongLine * p2;
  };

  const cX = getControlPoint(A.x, B.x);
  const cY = getControlPoint(A.y, B.y);

  console.log("cX", cX, "cY", cY);
  console.log("A", A, "B", B);

  p.moveTo(A.x, A.y);
  p.quadraticCurveTo(cX, cY, B.x, B.y);

  return p;
};

/**
 * Math functions
 */

export const radians = (degrees) => {
  return (degrees / 360) * (Math.PI * 2);
};

/**
 * List functions
 */
export const getChunks = (list, maxNumberInChunks = 3) => {
  const chunkList = [];
  let chunk = Math.random() * maxNumberInChunks;
  let i;
  let j;

  for (i = 0, j = list.length; i < j; i += 0) {
    chunkList.push(list.slice(i, i + chunk));
    // Manually increment by chunk since we reassign it at the end of the loop
    i += chunk;
    chunk = Math.random() * maxNumberInChunks;
  }

  return chunkList;
};
