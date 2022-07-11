const bananas = require('../bananas');

describe("ExampleTests", function(){

  // common test code
  const doTest = function(input, expected) {
    expect(bananas(input)).toEqual(expected);
  }

  it("ex0", () => {
    const input = "banann";
    const expected = [];
    doTest(input, expected);
  });

  it("ex1", () => {
    const input = "banana";
    const expected = ["banana"];
    doTest(input, expected);
  });

  it("ex2", () => {
    const input = "bbananana";
    const expected = [
      "b-an--ana", "-banana--", "-b--anana", "b-a--nana", "-banan--a",
      "b-ana--na", "b---anana", "-bana--na", "-ba--nana", "b-anan--a",
      "-ban--ana", "b-anana--"];
    doTest(input, expected);
  });

  it("ex3", () => {
    const input = "bananaaa";
    const expected = ["banan-a-", "banana--", "banan--a"];
    doTest(input, expected);
  });

  it("ex4", () => {
    const input = "bananana";
    const expected = [
      "ban--ana", "ba--nana", "bana--na", "b--anana", "banana--",
      "banan--a"];
    doTest(input, expected);
  });

});
