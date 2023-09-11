const input = require("fs").readFileSync("nada", "utf8");
const lines = input.split("\n");

for (let i = 0; i < lines.length; i += 2) {
  let triangles = 0;
  const arcs = lines[i + 1].split(" ");
  const pointsDistanceTo0 = [{ value: 0, status: true }];

  for (let j = 0; j < arcs.length; j++) {
    pointsDistanceTo0.push({
      value: +arcs[j] + +pointsDistanceTo0[pointsDistanceTo0.length - 1].value,
      status: true,
    });
  }

  const circleSize = pointsDistanceTo0[pointsDistanceTo0.length - 1].value;
  const side = circleSize / 3;

  pointsDistanceTo0.forEach((point) => {
    let second = point.value + side;
    let third = second.value + side;

    if (second > circleSize) second -= circleSize;
    if (third > circleSize) third -= circleSize;
    if (
      point.status &&
      pointsDistanceTo0.includes({ value: second, status: true }) &&
      pointsDistanceTo0.includes({ value: third, status: true })
    ) {
      triangles++;
      point.status = false;
    }
  });
  console.log(triangles);
}
