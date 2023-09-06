/**
 * @param {{type: string, [key: string]: any}[]} astStatements AST statements.
 * @returns {string[]} JS code lines.
 */
function generateJsCodeLinesFromAstStatements(astStatements) {
  const jsCodeLines = [];

  for (const statement of astStatements) {
    if (statement.type === 'PrintStatement') {
      const jsValue = generateJsValueFromExpression(statement.value);

      jsCodeLines.push(`console.log(${jsValue});`);
    } else if (statement.type === 'AssignmentStatement') {
    } else if (statement.type === 'WhileStatement') {
    }
  }

  return jsCodeLines;
}

/**
 * @param {{type: string, [key: string]: any}} expression
 * @returns {string}
 */
function generateJsValueFromExpression(expression) {
  const operatorsMap = {
    'PLUS': '+',
    'MINUS': '-',
    'TIMES': '*',
    'DIVIDE': '/',
    'LESS': '<',
    'GREATER': '>',
    'EQUAL': '==',
    'NOT_EQUAL': '!=',
    'LESS_OR_EQUAL': '<=',
    'GREATER_OR_EQUAL': '>=',
  };

  if (expression.type === 'Literal') {
    return expression.value;
  } else if (expression.type === 'Identifier') {
    return expression.name;
  } else if (expression.type === 'BinaryExpression') {
    const jsLeftValue = generateJsValueFromExpression(expression.left);
    const jsRightValue = generateJsValueFromExpression(expression.right);

    return `${jsLeftValue} ${operatorsMap[expression.operator]} ${jsRightValue}`;
  }
}

module.exports = {
  generateJsCodeLinesFromAstStatements,
  generateJsValueFromExpression,
};
