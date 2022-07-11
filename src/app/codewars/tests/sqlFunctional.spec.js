const query = require('../solved/functionalSql');

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
const isPrime = n => {
  for(let i = 2; i <= Math.sqrt(n); i++) {
    if(n % i === 0) {
      return false;
    }
  }
  return n > 1
}
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
const sumValues = ([f, s]) => [f, s.reduce((acc, [_,o]) => acc + o, 0)];
const nameGrouping = ([p]) => p;
const checkError = (fn, duplicate) => {
  try {
    fn();
    assert.expect(false, 'An error should be throw');
  } catch (e) {
    assert.expect(e instanceof Error);
    expect(e.message, 'Duplicate ' + duplicate);
  }
}

describe('SQL tests', function() {
  it('Basic SELECT tests', function() {
    expect(query().select().execute()).toEqual([]);
    expect(query().select().from(numbers).execute()).toEqual(numbers);
    expect(query().select().execute()).toEqual([]);
    expect(query().from(numbers).execute()).toEqual(numbers);
    expect(query().execute()).toEqual( []);
    expect(query().from(numbers).select().execute()).toEqual(numbers);
  });
  // it('should throw error for duplicates', function () {
  //   expect(query().select().select().execute()).toBe('Duplicate SELECT');
  //   query().select().from([]).select().execute(); //Error('Duplicate SELECT');
  //   query().select().from([]).from([]).execute(); //Error('Duplicate FROM');
  //   query().select().from([]).where([]).where([]) //This is an AND filter (see below)
  // });

  it('Basic SELECT and WHERE over objects', function() {
    expect(query().select().from(persons).execute()).toEqual(persons);
    expect(query().select(profession).from(persons).where(isTeacher).execute()).toEqual(['teacher', 'teacher', 'teacher']);
    expect(query().select(name).from(persons).where(isTeacher).execute()).toEqual(['Peter', 'Michael', 'Peter']);
    expect(query().select(profession).from(persons).execute()).toEqual(['teacher','teacher','teacher','scientific','scientific','scientific','politician'], );
    expect(query().select(profession).execute()).toEqual([]);
    expect(query().from(persons).where(isTeacher).execute()).toEqual(persons.slice(0, 3));
    expect(query().select(name).from(persons).where(isTeacher).execute()).toEqual(['Peter', 'Michael', 'Peter']);
    expect(query().where(isTeacher).from(persons).select(name).execute()).toEqual(['Peter', 'Michael', 'Peter']);
    expect(query().select(professionGroup).from(persons).groupBy(profession).execute()).toEqual(['teacher','scientific','politician'] );
  });
  it('GROUP BY tests', function() {
    expect(query().select().from(persons).groupBy(profession).execute()).toEqual([['teacher',[{'name':'Peter','profession':'teacher','age':20,'maritalStatus':'married'},{'name':'Michael','profession':'teacher','age':50,'maritalStatus':'single'},{'name':'Peter','profession':'teacher','age':20,'maritalStatus':'married'}]],['scientific',[{'name':'Anna','profession':'scientific','age':20,'maritalStatus':'married'},{'name':'Rose','profession':'scientific','age':50,'maritalStatus':'married'},{'name':'Anna','profession':'scientific','age':20,'maritalStatus':'single'}]],['politician',[{'name':'Anna','profession':'politician','age':50,'maritalStatus':'married'}]]]);
    expect(query().select().from(persons).where(isTeacher).groupBy(profession).execute()).toEqual([['teacher',[{'name':'Peter','profession':'teacher','age':20,'maritalStatus':'married'},{'name':'Michael','profession':'teacher','age':50,'maritalStatus':'single'},{'name':'Peter','profession':'teacher','age':20,'maritalStatus':'married'}]]]);
    expect(query().select(professionGroup).from(persons).groupBy(profession).execute()).toEqual(['teacher','scientific','politician']);
    expect(query().select().from(persons).groupBy(profession, name).execute()).toEqual([['teacher',[['Peter',[{'name':'Peter','profession':'teacher','age':20,'maritalStatus':'married'},{'name':'Peter','profession':'teacher','age':20,'maritalStatus':'married'}]],['Michael',[{'name':'Michael','profession':'teacher','age':50,'maritalStatus':'single'}]]]],['scientific',[['Anna',[{'name':'Anna','profession':'scientific','age':20,'maritalStatus':'married'},{'name':'Anna','profession':'scientific','age':20,'maritalStatus':'single'}]],['Rose',[{'name':'Rose','profession':'scientific','age':50,'maritalStatus':'married'}]]]],['politician',[['Anna',[{'name':'Anna','profession':'politician','age':50,'maritalStatus':'married'}]]]]]);
    expect(query().select().from(persons).groupBy(profession, name, age, maritalStatus).execute()).toEqual([['teacher',[['Peter',[[20,[['married',[{'name':'Peter','profession':'teacher','age':20,'maritalStatus':'married'},{'name':'Peter','profession':'teacher','age':20,'maritalStatus':'married'}]]]]]],['Michael',[[50,[['single',[{'name':'Michael','profession':'teacher','age':50,'maritalStatus':'single'}]]]]]]]],['scientific',[['Anna',[[20,[['married',[{'name':'Anna','profession':'scientific','age':20,'maritalStatus':'married'}]],['single',[{'name':'Anna','profession':'scientific','age':20,'maritalStatus':'single'}]]]]]],['Rose',[[50,[['married',[{'name':'Rose','profession':'scientific','age':50,'maritalStatus':'married'}]]]]]]]],['politician',[['Anna',[[50,[['married',[{'name':'Anna','profession':'politician','age':50,'maritalStatus':'married'}]]]]]]]]]);
    expect(query().select(professionCount).from(persons).groupBy(profession).execute()).toEqual([['teacher',3],['scientific',3],['politician',1]]);
    expect(query().select(professionCount).from(persons).groupBy(profession).orderBy(naturalCompare).execute()).toEqual([['politician',1],['scientific',3],['teacher',3]]);
  });

  it('Numbers tests', function() {
    expect(query().from(numbers).execute()).toEqual(numbers);
    expect(query().select().from(numbers).execute()).toEqual(numbers);
    expect(query().select().from(numbers).groupBy(parity).execute()).toEqual([['odd',[1,3,5,7,9]],['even',[2,4,6,8]]]); // todo change order
    // expect(query().select().from(numbers).groupBy(parity, prime).execute()).toEqual([['odd',[['divisible',[1,9]],['prime',[3,5,7]]]],['even',[['divisible',[4,6,8]],['prime',[2]]]]]);
    expect(query().select().from(numbers).groupBy(parity).having(odd).execute()).toEqual([['odd',[1,3,5,7,9]]]);
    expect(query().select().from(numbers).orderBy(descendentCompare).execute()).toEqual([9,8,7,6,5,4,3,2,1]);
    expect(query().select().from(numbers).where(lessThan3, greaterThan4).execute()).toEqual([1,2,5,6,7,8,9]);
  });
  it('Frequency tests', function() {

    const persons2 = [
      ['Peter', 3],
      ['Anna', 4],
      ['Peter', 7],
      ['Michael', 10]
    ];
    //SELECT name, sum(value) FROM persons ORDER BY naturalCompare GROUP BY nameGrouping
    expect(query().select(sumValues).from(persons2).orderBy(naturalCompare).groupBy(nameGrouping).execute()).toEqual([["Anna",4],["Michael",10],["Peter",10]]);

    const numbers2 = [1, 2, 1, 3, 5, 6, 1, 2, 5, 6];
    expect(query().select(frequency).from(numbers2).groupBy(id).execute()).toEqual([{"value":1,"frequency":3},{"value":2,"frequency":2},{"value":3,"frequency":1},{"value":5,"frequency":2},{"value":6,"frequency":2}]);

    //SELECT number, count(number) FROM numbers GROUP BY number HAVING count(number) > 1 AND isPair(number)
    expect(query().select(frequency).from(numbers2).groupBy(id).having(greatThan1).having(isPair).execute()).toEqual( [{"value":2,"frequency":2},{"value":6,"frequency":2}]);


  });
  it('join tests', function() {
    expect(query().select(student).from(teachers, students).where(teacherJoin).execute()).toEqual( [{'studentName':'Michael','teacherName':'Peter'},{'studentName':'Rose','teacherName':'Anna'}]);
    const numbers1 = [1, 2];
    const numbers2 = [4, 5];
    expect(query().select().from(numbers1, numbers2).execute()).toEqual([[1,4],[1,5],[2,4],[2,5]]);
    expect(query().select(student).from(teachers, students).where(teacherJoin).where(tutor1).execute()).toEqual([{'studentName':'Michael','teacherName':'Peter'}]);
  });
});
