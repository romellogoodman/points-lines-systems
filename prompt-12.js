const canvasSketch = require("canvas-sketch");
const { renderPaths, pathsToPolylines } = require("canvas-sketch-util/penplot");
const { clipPolylinesToBox } = require("canvas-sketch-util/geometry");
const Random = require("canvas-sketch-util/random");

const {
  LINE_WIDTH,
  PAPER_HEIGHT,
  PAPER_WIDTH,
  drawArc,
  map,
  drawCircle,
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

  const numberOfCircles = 9;
  const numberOfArcs = 99;
  const circleSize = height * 0.465;

  for (let line = 0; line < numberOfCircles; line++) {
    const size = map(
      line,
      0,
      numberOfCircles - 1,
      circleSize * 0.8,
      circleSize
    );

    for (let arc = 0; arc < numberOfArcs; arc++) {
      const arcLength = 360 / numberOfArcs;
      const arcStart = map(arc, 0, numberOfArcs, 0, 360);
      const arcEnd = arcStart + arcLength * 0.75;

      const p = drawArc(width / 2, height / 2, size, arcStart, arcEnd);

      paths.push(p);
    }
  }

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
