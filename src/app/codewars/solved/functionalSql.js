const query = () => {
  let sortFunction;
  let selectFunc;
  let addWhereFunc;
  let data = [];
  const counts = {};
  let whereFuncs = [];
  let havingFuncs = [];
  let groupByFuncs = [];
  return  {
    select(fn) {
      if (counts.select) { throw new Error('Duplicated SELECT') }
      selectFunc = fn;
      counts.select = true;
      return this;
    },
    from(f, s) {
      if (counts.from) { throw new Error('Duplicated FROM') }
      data = f.reduce((a, x ) => [...a, ...s ? s.reduce((b, y) => [...b, [x, y]], []) : [x]], []);
      counts.from = true;
      return this;
    },

    where(...funcs) {
      if (!whereFuncs.length) {
        whereFuncs = funcs;
      } else {
        addWhereFunc = funcs[0];
      }
      return this;
    },
    orderBy(toOrder) {
      if (counts.orderBy) { throw new Error('Duplicated ORDERBY') }
      sortFunction = toOrder;
      counts.orderBy = true;
      return this;
    },
    groupBy(...funcs) {
      if (counts.groupBy) { throw new Error('Duplicated GROUPBY') }
      groupByFuncs = funcs;
      counts.groupBy = true;
      return this;
    },
    having(fn) {
      havingFuncs = [...havingFuncs, fn];
      return this;
    },
    execute() {
      if ((whereFuncs || []).length) {
        data = whereFuncs.reduce((acc, fn) => [...acc, ...data.filter(fn)], []);
        if (addWhereFunc) {
          data = data.filter(addWhereFunc);
        }
      }
      if ((groupByFuncs || []).length) {
        const recursive = (arr, fns) => {
          if (!fns.length) return arr;
          const fn = fns.shift();
          return Object.entries(arr.reduce((acc, el) => ({...acc, [fn(el)]: [...acc[fn(el)] || [], el]}), {}))
            .map(x => [ +x[0] || x[0], recursive(x[1], fns.slice()) ]);
        }
        data = recursive(data, groupByFuncs);
      }
      if ((havingFuncs || []).length) {
        data = data.filter(x => havingFuncs.every(y => y(x)));
      }
      if (selectFunc) {
        data = data.map(selectFunc);
      }
      if (sortFunction) {
        data = data.sort(sortFunction);
      }
      return data;
    },
  };
};

const persons = [
  {name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married'},
  {name: 'Michael', profession: 'teacher', age: 50, maritalStatus: 'single'},
  {name: 'Peter', profession: 'teacher', age: 20, maritalStatus: 'married'},
  {name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'married'},
  {name: 'Rose', profession: 'scientific', age: 50, maritalStatus: 'married'},
  {name: 'Anna', profession: 'scientific', age: 20, maritalStatus: 'single'},
  {name: 'Anna', profession: 'politician', age: 50, maritalStatus: 'married'}
];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const profession = p => p.profession;
const isTeacher = p => p.profession === 'teacher'
const name = p => p.name;
const professionGroup = group => group[0];
const isEven = n => n % 2 === 0;
const odd = group => group[0] === 'odd';
const parity = n => isEven(n) ? 'even' : 'odd';
const isPrime = n => n > 1 && [2, 3, 5, 7].every(i => n === i || n % i);
const prime = n => isPrime(n) ? 'prime' : 'divisible';
const descendentCompare = (x, y) => y - x;
const teachers = [ { teacherId: '1', teacherName: 'Peter' }, { teacherId: '2', teacherName: 'Anna' }];
const students = [{ studentName: 'Michael', tutor: '1' }, { studentName: 'Rose', tutor: '2' }];
const lessThan3 = number => number < 3;
const greaterThan4 = number =>  number > 4;
const teacherJoin = list => list[0].teacherId === list[1].tutor;
const student = list => ({studentName: list[1].studentName, teacherName: list[0].teacherName});
const greatThan1 = list => list[1].length > 1;
const isPair = list => list[0] % 2 === 0;
const id = value => value;
const frequency = list => ({ value: list[0], frequency: list[1].length });
const tutor1 = list => list[1].tutor === '1';
const age = p => p.age;
const maritalStatus = p => p.maritalStatus;
const professionCount = group => [group[0], group[1].length];
const naturalCompare = (value1, value2) => {
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
}

module.exports = query;



// const isPrime = n => {
//   for(let i = 2; i <= Math.sqrt(n); i++) {
//     if(n % i === 0) {
//       return false;
//     }
//   }
//   return n > 1
// }
