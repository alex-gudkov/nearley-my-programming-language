program
  -> variableAssignment {% id %}
  |  number             {% id %}

variableAssignment
  -> "VAR" __ identifier __ "ASSIGN" __ number _ ";"
  {%
    // "VAR x ASSIGN 123.456;" -> d = [ "VAR", null, "x", null, "ASSIGN", null, "123.456", null, ";" ]
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
  | digits {%
    // "123" -> d = [ "123" ]
    (d) => Number(d[0])
  %}

digits
  -> [0-9]:+
  {%
    // "123" -> d = [ [ "1", "2", "3" ] ]
    (d) => d[0].join("")
  %}


_ -> [ \t\n\v\f]:* {% (d) => null %}

__ -> [ \t\n\v\f]:+ {% (d) => null %}
