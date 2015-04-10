var whitespaceRegExp = /\s/;
var numberRegExp = /^[0-9]+$/;
var calc = {
  calculate: function(expr){
    this.expr = expr;
    this.index = 0;
    this.ch = this.expr[this.index];
    this.res = [];
    var i = 0;
    var res;
    while(this.index < this.expr.length && i < 200){
      res = this.process();
      if(res){
        this.res.push(res);
      }
      i++;
    }

    return this.evaluation(this.res).value;
  },
  process: function(){
    var token;

    this.skipWhitespaces();

    token = this.checkExpression();
    if(token){
      return token;
    }
  
    token = this.checkNumber();
    if(token){
      return token;
    }

    token = this.checkOperator();
    if(token){
      return token;
    }

    if(this.index >= this.expr.length){
      return false;
    }

    console.log(this.index, this.ch)

    throw new Error('Parsing is not possible');
  },
  checkOperator: function(){
    if(this.isOperator()){
      var token = this.createToken('operator', this.ch);
      this.getNextChar();
      return token;
    }
    
    return null;
  },
  checkNumber: function(){
    if(this.isDecimalDigit()){
      var num =  this.ch;
      this.getNextChar();
      while(this.isDecimalDigit()){
        num += this.ch;
        this.getNextChar();
      }
      var token = this.createToken('number', num);
      if(this.ch === '.'){
        this.floatNumberProcess(token);
      }
      return token;
    }
    return null;
  },
  floatNumberProcess: function(token){
    token.value += this.ch;
    this.getNextChar();
    while(this.index < this.expr.length && this.isDecimalDigit()){
      token.value += this.ch;
      this.getNextChar();
    }
  },
  checkExpression: function(){
    if(this.ch === '('){
      var token = this.createToken('expression', []);
      this.getNextChar();
      while(this.ch !== ')'){
        token.value.push(this.process());
      }
      return token;
    }
    while(this.ch === ')'){
      this.getNextChar();
      this.skipWhitespaces();
    }
    return null;
  },
  createToken: function(type, value){
    return {
      type: type,
      value: value
    };
  },
  evaluation: function(arr){
    this.evalExpressions(arr);
    this.evalPrimary(arr);
    this.evalOther(arr);

    return arr[0];
  },
  evalExpressions: function(arr){
    var expression = arr.filter(function(item){
      return item.type === 'expression';
    });

    expression.forEach(function(expr){
      var ind = arr.indexOf(expr);
      var res = this.evaluation(expr.value);
      expr.value = res.value;

    }.bind(this));
  },
  evalPrimary: function(arr){
    var primaryOperators = arr.filter(function(item){
      return item.type === 'operator' && item.value === '*' || item.value === '/';
    });
    
    primaryOperators.forEach(function(operator){
      var ind = arr.indexOf(operator);
      var res = this.compute(operator.value, arr[ind - 1], arr[ind + 1]);
      arr.splice(ind - 1, 3, this.createToken('number', res));
    }.bind(this));
  },
  evalOther: function(arr){
    var operators = arr.filter(function(item){
      return item.type === 'operator';
    });

    operators.forEach(function(operator){
      var ind = arr.indexOf(operator);
      var res = this.compute(operator.value, arr[ind - 1], arr[ind + 1]);
      arr.splice(ind - 1, 3, this.createToken('number', res));
    }.bind(this));
  },
  compute: function(operator, a, b){
    switch(operator){
      case '+':
        return parseFloat(a.value, 10) + parseFloat(b.value, 10);
      case '-':
        return parseFloat(a.value, 10) - parseFloat(b.value, 10);
      case '*':
        return parseFloat(a.value, 10) * parseFloat(b.value, 10);
      case '/':
        return parseFloat(a.value, 10) / parseFloat(b.value, 10);
    }
  },
  getExpressions: function(){
    return this.value.filter(function(item){
      return item.type === 'expression';
    });
  },
  skipWhitespaces: function(){
    while(this.isWhiteSpace()){
      this.getNextChar();
    }
  },
  getNextChar: function(){
    if(this.index < this.expr.length){
      this.index += 1;
    }
    this.ch = this.expr[this.index];
  },
  isWhiteSpace: function(){
    return whitespaceRegExp.test(this.ch);
  },
  isDecimalDigit: function()  {
    return numberRegExp.test(this.ch);
  },
  isOperator: function(){
    return '+-*/'.indexOf(this.ch) >= 0;
  }
}

module.exports = calc;