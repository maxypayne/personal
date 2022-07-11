function longestSlideDown(pyramid) {
  const reversed = pyramid.reverse();
  let arr = reversed[0];
  for(let i = 1; i < reversed.length; i++) {
    arr = reversed[i].map((x, ind) => x + Math.max(arr[ind], arr[ind + 1]));
  }
  return arr[0];
}

const data = [
  [3],
  [7, 4],
  [2, 4, 6],
  [8, 5, 9, 3]

];

console.log(longestSlideDown(data));


// n this kata you have to correctly return who is the "survivor", ie: the last element of a Josephus permutation.
//
//   Basically you have to assume that n people are put into a circle and that they are eliminated in steps of k elements, like this:
//
// josephus_survivor(7,3) => means 7 people in a circle;
// one every 3 is eliminated until one remains
//   [1,2,3,4,5,6,7] - initial sequence
//   [1,2,4,5,6,7] => 3 is counted out
//   [1,2,4,5,7] => 6 is counted out
//   [1,4,5,7] => 2 is counted out
//   [1,4,5] => 7 is counted out
//   [1,4] => 5 is counted out
//   [4] => 1 counted out, 4 is the last element - the survivor!


const josephusSurvivor = (n,k) => n === 1 ? 1 : (josephusSurvivor(n - 1, k) + k - 1) % n + 1;

console.log(josephusSurvivor(7, 3));
