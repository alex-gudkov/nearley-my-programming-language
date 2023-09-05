program -> variable_assignment | number

variable_assignment -> "VAR" identifier "ASSIGN" number

identifier -> [a-z]:+

number -> digits "." digits | digits

digits -> [0-9]:+
