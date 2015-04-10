var calc = require('../calc');

describe('Addition', function(){
  it('string without spaces "2+3"', function(){
    var res = calc.calculate('2+3');
    expect(res).toBe(5);
  });
  it('string with spaces " 2 + 3 "', function(){
    var res = calc.calculate(' 2 + 3 ');
    expect(res).toBe(5);
  });
  it('string with multiple spaces "  2  +   3  "', function(){
    var res = calc.calculate(' 2 +   3  ');
    expect(res).toBe(5);
  });
});

describe('Subtraction', function(){
  it('string without spaces "2-3"', function(){
    var res = calc.calculate('2-3');
    expect(res).toBe(-1);
  });
  it('string with spaces " 2 - 3 "', function(){
    var res = calc.calculate(' 2 - 3 ');
    expect(res).toBe(-1);
  });
  it('string with multiple spaces "  2  -   3  "', function(){
    var res = calc.calculate(' 2 -   3  ');
    expect(res).toBe(-1);
  });
});

describe('Multiplication', function(){
  it('string without spaces "2*3"', function(){
    var res = calc.calculate('2*3');
    expect(res).toBe(6);
  });
  it('string with spaces " 2 * 3 "', function(){
    var res = calc.calculate(' 2 * 3 ');
    expect(res).toBe(6);
  });
  it('string with multiple spaces "  2  *   3  "', function(){
    var res = calc.calculate(' 2 *   3  ');
    expect(res).toBe(6);
  });
});

describe('Division', function(){
  it('string without spaces "4/2"', function(){
    var res = calc.calculate('4/2');
    expect(res).toBe(2);
  });
  it('string with spaces " 4 / 2 "', function(){
    var res = calc.calculate(' 4 / 2 ');
    expect(res).toBe(2);
  });
  it('string with multiple spaces "  4  /   2  "', function(){
    var res = calc.calculate(' 4 /   2  ');
    expect(res).toBe(2);
  });
});

describe('Expressions', function(){
  it('string without spaces "2+4/2-1"', function(){
    var res = calc.calculate('2+4/2-1');
    expect(res).toBe(3);
  });
  it('string with spaces " (2 + 3) - 1  * (2+ (2 + 4)) "', function(){
    var res = calc.calculate(' (2 + 3) - 1  * (2+ (2 + 4)) ');
    expect(res).toBe(-3);
  });
  it('string with multiple spaces "  2  *  13 -64  "', function(){
    var res = calc.calculate('  2  *  32 -64  ');
    expect(res).toBe(0);
  });
});

describe('Errors', function(){
  it('string with doesn\'t support symbols "2 + 2x"', function(){
    expect(function(){
      calc.calculate('2 + 2x')
    }).toThrow('Parsing is not possible');
  });
});