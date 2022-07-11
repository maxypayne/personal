const arr2 = [
    0,  5, 11,  7,  9, 12, -3,  0,  5, -2,  0,
  0, 14, 14,  6,  4, -4, -2,  3, -4,  3, 12,
  0, -1, 14, 13,  2,  1, 10, 10, 13,  5,  2,
  0,  0,  7, -3, -3, 14, 15, 15, 13,  5,  9,
  0
];

const pickPeaks = arr => {
  let pos = [];
  let peaks = [];
  let plate;
  for (let i = 0; i < arr.length; i++) {
    const before = arr[i - 1];
    const after = arr[i + 1];
    const actual = arr[i];
    if (plate && actual < plate[1]) {
      pos.push(plate[0])
      peaks.push(plate[1]);
      plate = null;
    } else if (plate && plate[1] < actual) {
      plate = null;
    }
    if (actual > before && actual === after && !plate) {
      plate = [i, actual];
    }
    if (before < actual && actual > after) {
      pos.push(i)
      peaks.push(actual);
    }
  }
  return {pos, peaks};
}

pickPeaks(arr2);
module.exports = pickPeaks;
