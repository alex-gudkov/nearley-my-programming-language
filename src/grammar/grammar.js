// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "program", "symbols": ["variableAssignment"], "postprocess": id},
    {"name": "program", "symbols": ["number"], "postprocess": id},
    {"name": "variableAssignment$string$1", "symbols": [{"literal":"V"}, {"literal":"A"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "variableAssignment$string$2", "symbols": [{"literal":"A"}, {"literal":"S"}, {"literal":"S"}, {"literal":"I"}, {"literal":"G"}, {"literal":"N"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "variableAssignment", "symbols": ["variableAssignment$string$1", "identifier", "variableAssignment$string$2", "number"], "postprocess": 
        // "VARxASSIGN123.456" -> d = [ "VAR", "x", "ASSIGN", "123.456" ]
        (d) => ({
          type: "VariableAssignment",
          identifier: d[1],
          value: d[3] 
        })
          },
    {"name": "identifier$ebnf$1", "symbols": [/[a-z]/]},
    {"name": "identifier$ebnf$1", "symbols": ["identifier$ebnf$1", /[a-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "identifier", "symbols": ["identifier$ebnf$1"]},
    {"name": "number", "symbols": ["digits", {"literal":"."}, "digits"], "postprocess": 
        // "123.456" -> d = [ "123", ".", "456" ]
        (d) => Number(d[0] + "." + d[2])
          },
    {"name": "number", "symbols": ["digits"], "postprocess": 
        // "123" -> d = [ "123" ]
        (d) => Number(d[0])
          },
    {"name": "digits$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "digits$ebnf$1", "symbols": ["digits$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "digits", "symbols": ["digits$ebnf$1"], "postprocess": 
        // "123" -> d = [ [ "1", "2", "3" ] ]
        (d) => d[0].join("")
          }
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
