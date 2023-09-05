@builtin "whitespace.ne"

program
  -> statements {% id %}

statements
  -> _ statement _ {%
    // "PRINT 10;" -> d = [ null, {...}, null ]
    (d) => [d[1]]
  %}
  |  _ statement __ statements {%
    // "PRINT 10; 
    //  PRINT 20;" -> d = [ null, {...}, "\n", [ {...} ] ]
    (d) => [d[1], ...d[3]]
  %}

statement
  -> variableAssignment {% id %}
  |  printStatement     {% id %}

printStatement
  -> "PRINT" __ expression _ ";" {%
    // "PRINT 10;" -> d = [ "PRINT", null, "10", null, ";" ]
    (d) => ({
      type: "PrintStatement",
      value: d[2]
    })
  %}

variableAssignment
  -> "VAR" __ identifier __ "ASSIGN" __ expression _ ";" {%
    // "VAR x ASSIGN 10;" -> d = [ "VAR", null, "x", null, "ASSIGN", null, "10", null, ";" ]
    (d) => ({
      type: "VariableAssignment",
      identifier: d[2],
      value: d[6] 
    })
  %}

expression
  -> unaryExpression  {% id %}
  |  binaryExpression {% id %}

binaryExpression
  -> unaryExpression __ operator __ expression {%
    // "10 PLUS 20" -> d = [ "10", null, "PLUS", null, "20" ]
    (d) => ({
      type: "BinaryExpression",
      left: d[0],
      operator: d[2],
      right: d[4]
    })
  %}

unaryExpression
  -> identifier {% id %}
  |  number     {% id %}

operator
  -> "PLUS"  {% id %}
  |  "MINUS" {% id %}
  |  "MUL"   {% id %}
  |  "DIV"   {% id %}

identifier
  -> [a-z]:+ {%
    // "abc" -> d = [ [ "a", "b", "c" ] ]
    (d) => d[0].join("")
  %}

number
  -> digits "." digits {%
    // "123.456" -> d = [ "123", ".", "456" ]
    (d) => Number(d[0] + "." + d[2])
  %}
  |  digits {%
    // "123" -> d = [ "123" ]
    (d) => Number(d[0])
  %}

digits
  -> [0-9]:+ {%
    // "123" -> d = [ [ "1", "2", "3" ] ]
    (d) => d[0].join("")
  %}
