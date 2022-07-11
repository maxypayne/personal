// memoisation
const memo = {};
const fibonaci = (n, memo, from) => {
  console.log({from, n, memo})
  if (memo[n]) return memo[n];
  if (n <= 1) return n;
  return memo[n] = fibonaci(n - 1, memo, 'first') + fibonaci(n - 2, memo, 'second');
}
// fibonaci(10, memo)
// console.log(fibonaci(10, memo));
// console.log(fibonaci(10, memo));
