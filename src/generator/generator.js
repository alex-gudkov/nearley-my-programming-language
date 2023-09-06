const BINARY_OPERATORS_MAP = {
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

/**
 * @param {{type: string, [key: string]: any}[]} astStatements
 * @returns {string[]} Generated JS code lines.
 */
function generateJsCodeLinesFromAstStatements(astStatements) {
  const jsCodeLines = [];

  for (const statement of astStatements) {
    if (statement.type === 'PrintStatement') {
      const jsValue = generateJsValueFromExpression(statement.value);

      jsCodeLines.push(`console.log(${jsValue});`);
    } else if (statement.type === 'AssignmentStatement') {
      //
    } else if (statement.type === 'WhileStatement') {
      //
    }
  }

  return jsCodeLines;
}

/**
 * @param {{type: string, [key: string]: any}} expression
 * @returns {string} Generated JS value.
 */
function generateJsValueFromExpression(expression) {
  if (expression.type === 'Literal') {
    return expression.value;
  } else if (expression.type === 'Identifier') {
    return expression.name;
  } else if (expression.type === 'BinaryExpression') {
    const jsLeftValue = generateJsValueFromExpression(expression.left);
    const jsRightValue = generateJsValueFromExpression(expression.right);

    return `${jsLeftValue} ${BINARY_OPERATORS_MAP[expression.operator]} ${jsRightValue}`;
  }
}

const generator = {
  generateJsCodeLinesFromAstStatements,
  generateJsValueFromExpression,
};

module.exports = generator;
