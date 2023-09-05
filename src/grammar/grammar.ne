program
  -> variableAssignment {% id %}
  |  printStatement     {% id %}

printStatement
  -> "PRINT" __ number _ ";" {%
    // "PRINT 10;" -> d = [ "PRINT", null, "10", null, ";" ]
    (d) => ({
      type: "PrintStatement",
      value: d[2]
    })
  %}

variableAssignment
  -> "VAR" __ identifier __ "ASSIGN" __ number _ ";" {%
    // "VAR x ASSIGN 10;" -> d = [ "VAR", null, "x", null, "ASSIGN", null, "10", null, ";" ]
    (d) => ({
      type: "VariableAssignment",
      identifier: d[2],
      value: d[6] 
    })
  %}

identifier -> [a-z]:+

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


_ -> [ \t\n\v\f]:* {% (d) => null %}

__ -> [ \t\n\v\f]:+ {% (d) => null %}
