const canvasSketch = require("canvas-sketch");
const {
  renderPaths,
  createPath,
  pathsToPolylines,
} = require("canvas-sketch-util/penplot");
const { clipPolylinesToBox } = require("canvas-sketch-util/geometry");
const Random = require("canvas-sketch-util/random");

const {
  LINE_WIDTH,
  PAPER_HEIGHT,
  PAPER_WIDTH,
  drawSquare,
  grid,
  map,
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

const sketch = (props) => {
  const { width, height, units } = props;

  const paths = [];

  const marginHeight = height * 0.1;
  const marginWidth = width * 0.1;

  const gridNumber = 3;
  const maxWidth = width - marginWidth;
  const maxHeight = height - marginHeight;
  const marginSquareWidth = (maxWidth / gridNumber) * 0.2;
  const squareWidth = maxWidth / gridNumber - marginSquareWidth;
  const marginSquareHeight = (maxHeight / gridNumber) * 0.2;
  const squareHeight = maxHeight / gridNumber - marginSquareHeight;

  const omitX = 1; // Math.floor(Math.random() * gridNumber);
  const omitY = 1; // Math.floor(Math.random() * gridNumber);

  grid(gridNumber, gridNumber, (x, y) => {
    if (x === omitX && y === omitY) return;

    const posX = map(x, 0, gridNumber, marginWidth, maxWidth);
    const posY = map(y, 0, gridNumber, marginHeight, maxHeight);

    const path = drawSquare(
      posX + marginSquareWidth / 2,
      posY + marginSquareHeight / 2,
      squareWidth,
      squareHeight
    );

    paths.push(path);
  });

  // console.log("points", points);
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
