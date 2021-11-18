const canvasSketch = require("canvas-sketch");
const { renderPaths } = require("canvas-sketch-util/penplot");
const Random = require("canvas-sketch-util/random");

const { LINE_WIDTH, PAPER_HEIGHT, PAPER_WIDTH } = require("./utilities");

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
  // TODO: nothing
  return (props) =>
    renderPaths(null, {
      ...props,
      lineWidth: LINE_WIDTH,
      optimize: true,
    });
};

canvasSketch(sketch, settings);
