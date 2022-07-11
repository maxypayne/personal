const input = "bbananana";
const expected = [
  "b-an--ana", "-banana--", "-b--anana", "b-a--nana", "-banan--a",
  "b-ana--na", "b---anana", "-bana--na", "-ba--nana", "b-anan--a",
  "-ban--ana", "b-anana--"];

const bananas = ([...arr]) => {
  const results = [];
  const word = ['b', 'a', 'n', 'a', 'n', 'a'];
  console.log(arr)
  console.log(results);
}


bananas(input);



















module.exports = bananas;
