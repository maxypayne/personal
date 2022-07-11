// Test.expect(hamming(1) == 1, "hamming(1) should be 1");
// Test.expect(hamming(2) == 2, "hamming(2) should be 2");
// Test.expect(hamming(3) == 3, "hamming(3) should be 3");
// Test.expect(hamming(4) == 4, "hamming(4) should be 4");
// Test.expect(hamming(5) == 5, "hamming(5) should be 5");
// Test.expect(hamming(6) == 6, "hamming(6) should be 6");
// Test.expect(hamming(7) == 8, "hamming(7) should be 8");
// Test.expect(hamming(8) == 9, "hamming(8) should be 9");
// Test.expect(hamming(9) == 10, "hamming(9) should be 10");
// Test.expect(hamming(10) == 12, "hamming(10) should be 12");
// Test.expect(hamming(11) == 15, "hamming(11) should be 15");
// Test.expect(hamming(12) == 16, "hamming(12) should be 16");
// Test.expect(hamming(13) == 18, "hamming(13) should be 18");
// Test.expect(hamming(14) == 20, "hamming(14) should be 20");
// Test.expect(hamming(15) == 24, "hamming(15) should be 24");
// Test.expect(hamming(16) == 25, "hamming(16) should be 25");
// Test.expect(hamming(17) == 27, "hamming(17) should be 27");
// Test.expect(hamming(18) == 30, "hamming(18) should be 30");
// Test.expect(hamming(19) == 32, "hamming(19) should be 32");

// A Hamming number is a positive integer of the form 2i3j5k, for some non-negative integers i, j, and k.
// Write a function that computes the nth smallest Hamming number.
//
// The first smallest Hamming number is 1 = 203050
// The second smallest Hamming number is 2 = 213050
// The third smallest Hamming number is 3 = 203150
// The fourth smallest Hamming number is 4 = 223050
// The fifth smallest Hamming number is 5 = 203051

//
// The 20 smallest Hamming numbers are given in example test fixture.
//
// Your code should be able to compute all of the smallest 5,000 (Clojure: 2000, NASM, C, C++, Go and Rust: 13282) Hamming numbers without timing out.
