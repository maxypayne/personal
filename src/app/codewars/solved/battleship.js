const battle = [
  [1,0,0,0,0,1,1,0,0,0],
  [1,0,1,0,0,0,0,0,1,0],
  [1,0,1,0,1,1,1,0,1,0],
  [1,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,1,0],
  [0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,1,0,0,0],
  [0,0,0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,0,0,0],
];

function validateBattlefield(field) {
  const concat = field.reduce((a, b) => [...a, ...b], []).filter(x => !!x);
  if (concat.length !== 20) return false;
  const horizontalLines = field.reduce((acc, row) => [...acc, row.reduce((acc2, x) => acc2 + x ,'')], []);
  const verticalLines = field.reduce((acc, x, i) =>  [...acc, field.map(y => y[i]).reduce((acc2, x) => acc2 + x ,'')], []);
  const counts = { two: 0, three: 0, four: 0 };
  [...horizontalLines, ...verticalLines].forEach(x => {
    let row = x.split('0');
    if (row.includes('1111')) {
      counts.four += 1;
    } else if (row.includes('111')) {
      counts.three += 1;
    } else if (row.includes('11')) {
      counts.two += 1;
    }
  });
  let collision;
  field.forEach((row, rowIndex) =>{
    row.forEach((x, i) =>{
      if (x === 1 && !collision) {
        collision = !!field[rowIndex + 1][i - 1] || !!field[rowIndex + 1][i + 1];
      }
    })
  })
  return !collision && counts.four === 1 && counts.three === 2 && counts.two === 3;
}

console.log(validateBattlefield(battle));
