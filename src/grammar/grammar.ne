program -> variable_assignment | number

variable_assignment -> "VAR" identifier "ASSIGN" number

identifier -> [a-z]:+

number -> digits "." digits | digits

digits -> [0-9]:+ {%
  // "123" -> data = [ [ "1", "2", "3" ] ]
  (data) => data[0].join("")
%}
