const box = {
  O: [50, 100],
  X: [20, 120], // x-axis positive direction (dx=-30, dy=20)
  Y: [100, 100], // y-axis positive direction (dx=50, dy=0)
  Z: [50, 40]   // z-axis positive direction (dx=0, dy=-60)
};
// x, y, z lengths:
// x=1, y=1, z=1
const P = {
  O: [50, 100],
  X: [20, 120],
  Y: [100, 100],
  Z: [50, 40],
  XY: [70, 120], // O + X + Y = (50-30+50, 100+20+0) = (70, 120)
  XZ: [20, 60],  // O + X + Z = (50-30+0, 100+20-60) = (20, 60)
  YZ: [100, 40], // O + Y + Z = (50+50+0, 100+0-60) = (100, 40)
  XYZ: [70, 60]  // O + X + Y + Z = (70, 60)
};
console.log(P);
