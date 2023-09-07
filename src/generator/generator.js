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
 * @param {{type: string, [key: string]: any}[]} statements
 * @returns {string} Generated JS statements.
 */
function generateJsStatements(astStatements) {
  let jsStatements = '';

  for (const astStatement of astStatements) {
    if (astStatement.type === 'PrintStatement') {
      const jsValueExpression = generateJsExpression(astStatement.value);

      jsStatements += `console.log(${jsValueExpression});\n`;
    } else if (astStatement.type === 'AssignmentStatement') {
      const jsValueExpression = generateJsExpression(astStatement.value);
      const jsIdentifier = astStatement.identifier.name;

      jsStatements += `let ${jsIdentifier} = ${jsValueExpression};\n`;
    } else if (astStatement.type === 'WhileStatement') {
      const jsConditionExpression = generateJsExpression(astStatement.condition);
      const jsBodyStatements = generateJsStatements(astStatement.body);

      jsStatements += `while (${jsConditionExpression}) {\n${jsBodyStatements}}\n`;
    }
  }

  return jsStatements;
}

/**
 * @param {{type: string, [key: string]: any}} astExpression
 * @returns {string} Generated JS expression.
 */
function generateJsExpression(astExpression) {
  let jsExpression;

  if (astExpression.type === 'Literal') {
    jsExpression = astExpression.value;
  } else if (astExpression.type === 'Identifier') {
    jsExpression = astExpression.name;
  } else if (astExpression.type === 'BinaryExpression') {
    const jsLeftExpression = generateJsExpression(astExpression.left);
    const jsRightExpression = generateJsExpression(astExpression.right);
    const jsOperator = BINARY_OPERATORS_MAP[astExpression.operator];

    jsExpression = `${jsLeftExpression} ${jsOperator} ${jsRightExpression}`;
  }

  return jsExpression;
}

const generator = {
  generateJsStatements,
  generateJsExpression,
};

module.exports = generator;
