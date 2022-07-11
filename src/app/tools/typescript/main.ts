function getData<Type>(arr: Type[]) : Type | undefined {
 return arr[0];
}

function map<Input, Output>(arr: Input[], func: (arr: Input) => Output): Output[] {
  return arr.map(func);
}
const parsed = map(["1", "2", "3"], (n) => parseInt(n));


function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return [...arr1, ...arr2];
}

combine([1,2,3,4], [1,2,4,5]);
combine<number | string >([1,2,3,4], ['HELLO']);


function filter<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

function filter2<Type, Func extends (arg: Type) => boolean>(arr: Type[], func: Func): Type[] {
  return arr.filter(func);
}

function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
   callback(arr[i], i);
  }
}
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));


function get<Type extends []>(arr: Type) {
  console.log(arr.length);
  return arr.filter(x => x > 10);
}

function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

const data = { a: 1, b: 2, c: 3 };
getProperty(data, 'a');
// getProperty(data, 'm'); // data doesn't contain m key

// keyof
type Point = { x: number; y: number };
type P = keyof Point;

type Person = { age: number; name: string; alive: boolean };
type Age = Person['age'];

type I1 = Person['age' | 'name'];
type I12= Person[keyof Person];
type AliveOrName = 'alive' | 'name';
type I3 = Person[AliveOrName];

const myArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type ArrayPerson = typeof myArray[number];
type ArrayAge = typeof myArray[number]["age"];
type ArrayAge2 = Person["age"];

// Conditional
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
type Example1 = Dog extends Animal ? number : string;
type Example2 = RegExp extends Animal ? number : string;

