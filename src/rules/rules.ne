@builtin "whitespace.ne"

program
  -> statements {% id %}

statements
  -> _ statement _ {%
    // "PRINT 10"
    // -> d = [ null, {...}, null ]
    (d) => [d[1]]
  %}
  |  _ statement __ statements _ {%
    // "PRINT 10
    //  PRINT 20"
    // -> d = [ null, {...}, null, [...], null ]
    (d) => [d[1], ...d[3]]
  %}

statement
  -> assignmentStatement {% id %}
  |  printStatement      {% id %}
  |  whileStatement      {% id %}

whileStatement
  -> "WHILE" __ expression __ "BEGIN" __ statements __ "END" {%
    // "WHILE x LESS 10
    //  BEGIN
    //      PRINT x
    //  END"
    // -> d = [ "WHILE", null, {...}, null, "BEGIN", null, [...], null, "END" ]
    (d) => ({
      type: "WhileStatement",
      condition: d[2],
      body: d[6]
    })
  %}

printStatement
  -> "PRINT" __ expression {%
    // "PRINT 10"
    // -> d = [ "PRINT", null, "10" ]
    (d) => ({
      type: "PrintStatement",
      value: d[2]
    })
  %}

assignmentStatement
  -> identifier __ "ASSIGN" __ expression {%
    // "x ASSIGN 10"
    // -> d = [ "x", null, "ASSIGN", null, "10" ]
    (d) => ({
      type: "AssignmentStatement",
      identifier: d[0],
      value: d[4] 
    })
  %}

expression
  -> unaryExpression  {% id %}
  |  binaryExpression {% id %}

binaryExpression
  -> unaryExpression __ operator __ expression {%
    // "10 PLUS 20"
    // -> d = [ "10", null, "PLUS", null, "20" ]
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
  -> "PLUS"             {% id %}
  |  "MINUS"            {% id %}
  |  "TIMES"            {% id %}
  |  "DIVIDE"           {% id %}
  |  "LESS"             {% id %}
  |  "GREATER"          {% id %}
  |  "EQUAL"            {% id %}
  |  "NOT_EQUAL"        {% id %}
  |  "LESS_OR_EQUAL"    {% id %}
  |  "GREATER_OR_EQUAL" {% id %}

identifier
  -> [a-z_]:+ {%
    // "ab_c"
    // -> d = [ [ "a", "b", "_", "c" ] ]
    (d) => d[0].join("")
  %}

number
  -> digits "." digits {%
    // "123.456"
    // -> d = [ "123", ".", "456" ]
    (d) => Number(d[0] + "." + d[2])
  %}
  |  digits {%
    // "123"
    // -> d = [ "123" ]
    (d) => Number(d[0])
  %}

digits
  -> [0-9]:+ {%
    // "123"
    // -> d = [ [ "1", "2", "3" ] ]
    (d) => d[0].join("")
  %}
