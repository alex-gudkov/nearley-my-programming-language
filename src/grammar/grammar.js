// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "topLevelStatement", "symbols": ["variableAssignment"], "postprocess": id},
    {"name": "topLevelStatement", "symbols": ["printStatement"], "postprocess": id},
    {"name": "printStatement$string$1", "symbols": [{"literal":"P"}, {"literal":"R"}, {"literal":"I"}, {"literal":"N"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "printStatement", "symbols": ["printStatement$string$1", "__", "number", "_", {"literal":";"}], "postprocess": 
        // "PRINT 10;" -> d = [ "PRINT", null, "10", null, ";" ]
        (d) => ({
          type: "PrintStatement",
          value: d[2]
        })
          },
    {"name": "variableAssignment$string$1", "symbols": [{"literal":"V"}, {"literal":"A"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "variableAssignment$string$2", "symbols": [{"literal":"A"}, {"literal":"S"}, {"literal":"S"}, {"literal":"I"}, {"literal":"G"}, {"literal":"N"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "variableAssignment", "symbols": ["variableAssignment$string$1", "__", "identifier", "__", "variableAssignment$string$2", "__", "expression", "_", {"literal":";"}], "postprocess": 
        // "VAR x ASSIGN 10;" -> d = [ "VAR", null, "x", null, "ASSIGN", null, "10", null, ";" ]
        (d) => ({
          type: "VariableAssignment",
          identifier: d[2],
          value: d[6] 
        })
          },
    {"name": "expression", "symbols": ["identifier"], "postprocess": id},
    {"name": "expression", "symbols": ["number"], "postprocess": id},
    {"name": "identifier$ebnf$1", "symbols": [/[a-z]/]},
    {"name": "identifier$ebnf$1", "symbols": ["identifier$ebnf$1", /[a-z]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "identifier", "symbols": ["identifier$ebnf$1"], "postprocess": 
        (d) => d[0].join("")
          },
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
  , ParserStart: "topLevelStatement"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
