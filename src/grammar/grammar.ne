program
  -> variable_assignment {% id %}
  | number {% id %}

variable_assignment -> "VAR" identifier "ASSIGN" number

identifier -> [a-z]:+

number
  -> digits "." digits {%
    // "123.456" -> data = [ "123", ".", "456" ]
    (data) => Number(data[0] + "." + data[2])
  %}
  | digits {%
    // "123" -> data = [ "123" ]
    (data) => Number(data[0])
  %}

digits -> [0-9]:+
{%
  // "123" -> data = [ [ "1", "2", "3" ] ]
  (data) => data[0].join("")
%}
