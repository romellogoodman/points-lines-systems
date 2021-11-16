# Points, Lines and Systems

CREATING GENERATIVE ART WITH CODE. Taken during November 2021 as part of the [School of Machines](http://schoolofma.org/points-lines-systems.html).

This codebase is a snapshot of a daily practice, 30 - 60 minutes of drawing based on prompts. The class used the [canvas-sketch](https://github.com/mattdesl/canvas-sketch) framework as the basis of our programs.

### Set up

## Local Set Up

Note: Developed using Node v16

Clone the project

```bash
git clone https://github.com/romellogoodman/points-lines-systems.git
```

Install dependencies

```bash
npm install
```

Start the dev server

```js
npm run prompt --prompt=$PROMPT_NUMBER
```

or

```
canvas-sketch prompt-$PROMPT_NUMBER -p 3000
```

Open your browser to [http://localhost:3000](http://localhost:3000)

### Prompts

### 1. Order, 9 or 99 lines

Your call if you want to work with 9 or 99!

### 2. Chaos, 9 or 99 lines

Also your call. If you feel up for it, try the one you haven't done in the first prompt.

### 3. Somewhere Between Order and Chaos

### 4. At Least 99 Identical Squares

Your definition of identical might be different than mine 😇

### 5. Gradual Change, Top to Bottom

What is the subject of change? Scale, density, negative space, how orderly everything is? Maybe the gradual change is in the code, not in the composition? Maybe this composition doesn't involve code at all -- could be a drawing, a video of a short performance, a speech, a letter.

### 6. 99 lines and 99 points

We didn't look at points in class, but you can draw a point by either drawing a very short line, or a very small square 🙂

### 7. Broken Grid

The grid is the ultimate symbol of modernism – LET'S BREAK IT!!! 👹

### 8. Illusion of movement

How can you illustrate the idea of motion in a still composition? Can you do it with 2 elements? What about 20? Or 2000?

### 9. Triple nested loops

A for inside of a for inside of a for (inside of a for?). _Prompt Credit: Piter Pasma & Genuary 2021_

### 10. No straight lines

And no grids, if you feel up for it.

### 11. Random walk with an external parameter

Is it today's temperature that makes an appearance in your random walk? Is it the time, like Magdalena proposed in class? Or maybe this composition is a random walk performed by yourself, instead of `createPath`? Or your hand on paper, doing a [blind contour](https://en.wikipedia.org/wiki/Blind_contour_drawing)?

### 12. 9 or 99 circles (and nothing else)

Are they full circles or arcs? Are they smooth or noisy? Bonus points if you use your two favorite colors for background and foreground 🙂

### 13. One imperfect circle

`x = cos(angle), y = sin(angle * 2)`? Just throwing ideas out there.

### 14. Your notebook sketch of today's sketch is the sketch

But is the art the idea, the process or the outcome? 🥵 Does the notebook sketch happen before or after the code one?
