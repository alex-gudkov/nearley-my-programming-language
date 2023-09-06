const compileMyplToAst = require('./compile-mypl-to-ast');
const compileAstToJs = require('./compile-ast-to-js');

const compiler = {
  compileMyplToAst,
  compileAstToJs,
};

module.exports = compiler;
