program
  -> variableAssignment {% id %}
  |  number             {% id %}

variableAssignment
  -> "VAR" identifier "ASSIGN" number
  {%
    // "VARxASSIGN123.456" -> d = [ "VAR", "x", "ASSIGN", "123.456" ]
    (d) => ({
      type: "VariableAssignment",
      identifier: d[1],
      value: d[3] 
    })
  %}

identifier
  -> [a-z]:+

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
