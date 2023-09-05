// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "variable_assignment$string$1", "symbols": [{"literal":"V"}, {"literal":"A"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "variable_assignment$string$2", "symbols": [{"literal":"A"}, {"literal":"S"}, {"literal":"S"}, {"literal":"I"}, {"literal":"G"}, {"literal":"N"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "variable_assignment", "symbols": ["variable_assignment$string$1", "identifier", "variable_assignment$string$2", "number"]},
    {"name": "identifier$ebnf$1", "symbols": [/[a-z]/]},
    {"name": "identifier$ebnf$1", "symbols": ["identifier$ebnf$1", /[a-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "identifier", "symbols": ["identifier$ebnf$1"]},
    {"name": "number", "symbols": ["digits", {"literal":"."}, "digits"]},
    {"name": "number", "symbols": ["digits"]},
    {"name": "digits$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "digits$ebnf$1", "symbols": ["digits$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "digits", "symbols": ["digits$ebnf$1"]}
]
  , ParserStart: "variable_assignment"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
