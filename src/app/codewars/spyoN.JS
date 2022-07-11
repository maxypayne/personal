// For this kata, implement a spyOn function which takes any function func as a parameter and returns a spy for func. The returned spy must be callable in the same manner as the original func, and include the following additional properties/methods:
//
// .callCount() — returns the number of times spy has been called
//   .wasCalledWith(val) – returns true if spy was ever called with val, else returns false.
//   .returned(val) — returns true if spy ever returned val, else returns false
//
// Below is a specific example of how spyOn might work in the wild.
//
//   function adder(n1, n2) { return n1 + n2; }
// var adderSpy = spyOn( adder );
//
// adderSpy(2, 4); // returns 6
// adderSpy(3, 5); // returns 8
// adderSpy.callCount(); // returns 2
// adderSpy.wasCalledWith(4); // true
// adderSpy.wasCalledWith(0); // false
// adderSpy.returned(8); // true
// adderSpy.returned(0); // false

let count = 0;
let values = [];
function spyOn(func) {
  return func;
}

spyOn.wasCalledWith = (num) => {
  return true
};
spyOn.callCount = (num) => {};
spyOn.returned = (num) => {};

function adder(n1, n2) { return n1 + n2; }
const adderSpy = spyOn( adder );

console.log(adderSpy(2, 4)); // returns 6
adderSpy(3, 5); // returns 8
// adderSpy.callCount(); // returns 2
adderSpy.wasCalledWith(4); // true
// adderSpy.wasCalledWith(0); // false
// adderSpy.returned(8); // true
// adderSpy.returned(0); // false
