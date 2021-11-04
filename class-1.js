const canvasSketch = require("canvas-sketch");
const {
  renderPaths,
  createPath,
  pathsToPolylines,
} = require("canvas-sketch-util/penplot");
const { clipPolylinesToBox } = require("canvas-sketch-util/geometry");
const Random = require("canvas-sketch-util/random");

// You can force a specific seed by replacing this with a string value
const defaultSeed = "";

// Set a random seed so we can reproduce this print later
Random.setSeed(defaultSeed || Random.getRandomSeed());

// Print to console so we can see which seed is being used and copy it if desired
console.log("Random Seed:", Random.getSeed());

const settings = {
  suffix: Random.getSeed(),
  dimensions: "A4",
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
};

const sketch = (props) => {
  const { width, height, units } = props;

  // Holds all our 'path' objects
  // which could be from createPath, or SVGPath string, or polylines
  const paths = [];

  /**
   * Manually build a square from 4 paths
   */
  // const p = createPath();

  // p.moveTo(3, 3);
  // p.lineTo(3, 10);

  // paths.push(p);

  // const p2 = createPath();

  // p.moveTo(3, 10);
  // p.lineTo(10, 10);

  // paths.push(p2);

  // const p3 = createPath();

  // p.moveTo(10, 10);
  // p.lineTo(10, 3);

  // paths.push(p3);

  // const p4 = createPath();

  // p.moveTo(10, 3);
  // p.lineTo(3, 3);

  // paths.push(p4);

  /**
   * Manually build a square from 1 paths
   */
  const p = createPath();

  p.moveTo(3, 3);
  p.lineTo(3, 10);
  p.lineTo(10, 10);
  p.lineTo(10, 3);
  // Manually draw line
  // p.lineTo(3, 3);
  // Close the path
  p.closePath();

  paths.push(p);

  // Convert the paths into polylines so we can apply line-clipping
  // When converting, pass the 'units' to get a nice default curve resolution
  let lines = pathsToPolylines(paths, { units });

  // Clip to bounds, using a margin in working units
  const margin = 1; // in working 'units' based on settings
  const box = [margin, margin, width - margin, height - margin];
  lines = clipPolylinesToBox(lines, box);

  // The 'penplot' util includes a utility to render
  // and export both PNG and SVG files
  return (props) =>
    renderPaths(lines, {
      ...props,
      lineJoin: "round",
      lineCap: "round",
      // in working units; you might have a thicker pen
      lineWidth: 0.08,
      // Optimize SVG paths for pen plotter use
      optimize: true,
    });
};

canvasSketch(sketch, settings);
