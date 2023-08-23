const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettles = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 6);
  const palette = random.shuffle(random.pick(palettles));

  const createGrid = () => {
    const points = [];
    const count = 200;

    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        const u = i / (count - 1);
        const v = j / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.1;

        points.push({
          position: [u, v],
          radius,
          color: random.pick(palette),
          rotation: random.noise2D(u,v)
        });
      }
    }

    return points;
  };

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 150;
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    points.forEach(({ position, radius, color, rotation }) => {
      const x = lerp(margin, width - margin, position[0]);
      const y = lerp(margin, width - margin, position[1]);

      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.fillStyle = color;
      // context.fill();

      context.save();
      context.fillStyle = color;
      context.font = '100px "Helvetica"';
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText("#", x, y);
      // context.rotate(-1);
      context.restore();
    });
  };
};

//canvasSketch(sketch, settings);
