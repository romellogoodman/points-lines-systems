const canvasSketch = require("canvas-sketch");
const {
  createPath,
  renderPaths,
  pathsToPolylines,
} = require("canvas-sketch-util/penplot");
const { clipPolylinesToBox } = require("canvas-sketch-util/geometry");
const Random = require("canvas-sketch-util/random");

const {
  LINE_WIDTH,
  PAPER_HEIGHT,
  PAPER_WIDTH,
  drawArc,
  map,
  drawCircle,
  getChunks,
  drawSquare,
} = require("./utilities");

// You can force a specific seed by replacing this with a string value
const defaultSeed = "";

// Set a random seed so we can reproduce this print later
Random.setSeed(defaultSeed || Random.getRandomSeed());

// Print to console so we can see which seed is being used and copy it if desired
console.log("Random Seed:", Random.getSeed());

const settings = {
  suffix: Random.getSeed(),
  dimensions: [PAPER_HEIGHT, PAPER_WIDTH],
  orientation: "landscape",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "in",
};

function chunkBy(number, n) {
  var chunks = Array(Math.floor(number / n)).fill(n);
  var remainder = number % n;

  if (remainder > 0) {
    chunks.append(remainder);
  }
  return chunks;
}

const sketch = (props) => {
  const { width, height, units } = props;

  const paths = [];
  const startX = width * 0.2;
  const startY = height * 0.2;
  const endX = width - startX;
  const endY = height - startY;
  const widthOfJourney = endX - startX;
  const heightOfJourney = endY - startY;

  let x = startX;
  let y = startY;
  const numberOfSteps = 5; // Math.random() * 10;
  const resolution = 100; // Math.random() * 100;

  const convertChunksToLength = (array) => {
    return array.length / resolution;
  };
  const widthSteps = getChunks(
    new Array(Math.floor(widthOfJourney * resolution)).fill(null),
    numberOfSteps
  ).map(convertChunksToLength);
  const heightSteps = getChunks(
    new Array(Math.floor(heightOfJourney * resolution)).fill(null),
    numberOfSteps
  ).map(convertChunksToLength);

  const rect = drawSquare(startX, startY, widthOfJourney, heightOfJourney);

  paths.push(rect);

  const p = createPath();

  p.moveTo(startX, startY);

  for (let stepX = 0; stepX < widthSteps.length; stepX++) {
    for (let stepY = 0; stepY < heightSteps.length; stepY++) {
      if (widthSteps[stepX]) x = x + widthSteps[stepX];
      if (heightSteps[stepY]) y = y + heightSteps[stepY];

      // TODO: implement boundaries
      if (x > endX) x = endX;
      if (y > endY) y = endY;

      p.lineTo(x, y);
    }
  }

  paths.push(p);

  // console.log("paths", paths);

  // Convert the paths into polylines so we can apply line-clipping
  // When converting, pass the 'units' to get a nice default curve resolution
  let lines = pathsToPolylines(paths, { units });

  // Clip to bounds, using a margin in working units
  const margin = 0.125; // in working 'units' based on settings
  const box = [margin, margin, width - margin, height - margin];
  lines = clipPolylinesToBox(lines, box);

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return (props) =>
    renderPaths(lines, {
      ...props,
      lineWidth: LINE_WIDTH,
      optimize: true,
    });
};

canvasSketch(sketch, settings);
