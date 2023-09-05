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
    {"name": "program", "symbols": ["statements"], "postprocess": id},
    {"name": "statements", "symbols": ["_", "statement", "_"], "postprocess": 
        // "PRINT 10"
        // -> d = [ null, {...}, null ]
        (d) => [d[1]]
          },
    {"name": "statements", "symbols": ["_", "statement", "__", "statements", "_"], "postprocess": 
        // "PRINT 10
        //  PRINT 20"
        // -> d = [ null, {...}, null, [...], null ]
        (d) => [d[1], ...d[3]]
          },
    {"name": "statement", "symbols": ["assignmentStatement"], "postprocess": id},
    {"name": "statement", "symbols": ["printStatement"], "postprocess": id},
    {"name": "statement", "symbols": ["whileStatement"], "postprocess": id},
    {"name": "whileStatement$string$1", "symbols": [{"literal":"W"}, {"literal":"H"}, {"literal":"I"}, {"literal":"L"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "whileStatement$string$2", "symbols": [{"literal":"B"}, {"literal":"E"}, {"literal":"G"}, {"literal":"I"}, {"literal":"N"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "whileStatement$string$3", "symbols": [{"literal":"E"}, {"literal":"N"}, {"literal":"D"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "whileStatement", "symbols": ["whileStatement$string$1", "__", "expression", "__", "whileStatement$string$2", "__", "statements", "__", "whileStatement$string$3"], "postprocess": 
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
          },
    {"name": "printStatement$string$1", "symbols": [{"literal":"P"}, {"literal":"R"}, {"literal":"I"}, {"literal":"N"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "printStatement", "symbols": ["printStatement$string$1", "__", "expression"], "postprocess": 
        // "PRINT 10"
        // -> d = [ "PRINT", null, "10" ]
        (d) => ({
          type: "PrintStatement",
          value: d[2]
        })
          },
    {"name": "assignmentStatement$string$1", "symbols": [{"literal":"A"}, {"literal":"S"}, {"literal":"S"}, {"literal":"I"}, {"literal":"G"}, {"literal":"N"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "assignmentStatement", "symbols": ["identifier", "__", "assignmentStatement$string$1", "__", "expression"], "postprocess": 
        // "x ASSIGN 10"
        // -> d = [ "x", null, "ASSIGN", null, "10" ]
        (d) => ({
          type: "AssignmentStatement",
          identifier: d[0],
          value: d[4] 
        })
          },
    {"name": "expression", "symbols": ["unaryExpression"], "postprocess": id},
    {"name": "expression", "symbols": ["binaryExpression"], "postprocess": id},
    {"name": "binaryExpression", "symbols": ["unaryExpression", "__", "operator", "__", "expression"], "postprocess": 
        // "10 PLUS 20"
        // -> d = [ "10", null, "PLUS", null, "20" ]
        (d) => ({
          type: "BinaryExpression",
          left: d[0],
          operator: d[2],
          right: d[4]
        })
          },
    {"name": "unaryExpression", "symbols": ["identifier"], "postprocess": id},
    {"name": "unaryExpression", "symbols": ["number"], "postprocess": id},
    {"name": "operator$string$1", "symbols": [{"literal":"P"}, {"literal":"L"}, {"literal":"U"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$1"], "postprocess": id},
    {"name": "operator$string$2", "symbols": [{"literal":"M"}, {"literal":"I"}, {"literal":"N"}, {"literal":"U"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$2"], "postprocess": id},
    {"name": "operator$string$3", "symbols": [{"literal":"T"}, {"literal":"I"}, {"literal":"M"}, {"literal":"E"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$3"], "postprocess": id},
    {"name": "operator$string$4", "symbols": [{"literal":"D"}, {"literal":"I"}, {"literal":"V"}, {"literal":"I"}, {"literal":"D"}, {"literal":"E"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$4"], "postprocess": id},
    {"name": "operator$string$5", "symbols": [{"literal":"L"}, {"literal":"E"}, {"literal":"S"}, {"literal":"S"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$5"], "postprocess": id},
    {"name": "operator$string$6", "symbols": [{"literal":"G"}, {"literal":"R"}, {"literal":"E"}, {"literal":"A"}, {"literal":"T"}, {"literal":"E"}, {"literal":"R"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$6"], "postprocess": id},
    {"name": "operator$string$7", "symbols": [{"literal":"E"}, {"literal":"Q"}, {"literal":"U"}, {"literal":"A"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$7"], "postprocess": id},
    {"name": "operator$string$8", "symbols": [{"literal":"N"}, {"literal":"O"}, {"literal":"T"}, {"literal":"_"}, {"literal":"E"}, {"literal":"Q"}, {"literal":"U"}, {"literal":"A"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$8"], "postprocess": id},
    {"name": "operator$string$9", "symbols": [{"literal":"L"}, {"literal":"E"}, {"literal":"S"}, {"literal":"S"}, {"literal":"_"}, {"literal":"O"}, {"literal":"R"}, {"literal":"_"}, {"literal":"E"}, {"literal":"Q"}, {"literal":"U"}, {"literal":"A"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$9"], "postprocess": id},
    {"name": "operator$string$10", "symbols": [{"literal":"G"}, {"literal":"R"}, {"literal":"E"}, {"literal":"A"}, {"literal":"T"}, {"literal":"E"}, {"literal":"R"}, {"literal":"_"}, {"literal":"O"}, {"literal":"R"}, {"literal":"_"}, {"literal":"E"}, {"literal":"Q"}, {"literal":"U"}, {"literal":"A"}, {"literal":"L"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "operator", "symbols": ["operator$string$10"], "postprocess": id},
    {"name": "identifier$ebnf$1", "symbols": [/[a-z_]/]},
    {"name": "identifier$ebnf$1", "symbols": ["identifier$ebnf$1", /[a-z_]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "identifier", "symbols": ["identifier$ebnf$1"], "postprocess": 
        // "ab_c"
        // -> d = [ [ "a", "b", "_", "c" ] ]
        (d) => ({
          type: "Identifier",
          name: d[0].join("")
        })
          },
    {"name": "number", "symbols": ["digits", {"literal":"."}, "digits"], "postprocess": 
        // "123.456"
        // -> d = [ "123", ".", "456" ]
        (d) => ({
          type: "Literal",
          value: Number(d[0] + "." + d[2]),
        })
          },
    {"name": "number", "symbols": ["digits"], "postprocess": 
        // "123"
        // -> d = [ "123" ]
        (d) => ({
          type: "Literal",
          value: Number(d[0]),
        })
          },
    {"name": "digits$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "digits$ebnf$1", "symbols": ["digits$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "digits", "symbols": ["digits$ebnf$1"], "postprocess": 
        // "123"
        // -> d = [ [ "1", "2", "3" ] ]
        (d) => d[0].join("")
          }
]
  , ParserStart: "program"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.rules = grammar;
}
})();
