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

const DEFAULT_INDENT_SIZE = 2;

/**
 * @param {string} jsStatements
 * @returns {string} Indented JS statements.
 */
function indentJsStatements(jsStatements, indentSize = DEFAULT_INDENT_SIZE) {
  return jsStatements
    .trim()
    .split('\n')
    .map((statement) => ' '.repeat(indentSize) + statement)
    .join('\n')
    .concat('\n');
}

/**
 * @param {{type: string, [key: string]: any}[]} statements
 * @param {{[key: string]: boolean}} declaredVariablesMap
 * @returns {string} Generated JS statements.
 */
function generateJsStatements(astStatements, declaredVariablesMap = {}) {
  let jsStatements = '';

  for (const astStatement of astStatements) {
    if (astStatement.type === 'PrintStatement') {
      const jsValueExpression = generateJsExpression(astStatement.value);

      jsStatements += `console.log(${jsValueExpression});\n`;
    } else if (astStatement.type === 'AssignmentStatement') {
      const jsValueExpression = generateJsExpression(astStatement.value);
      const jsIdentifier = astStatement.identifier.name;

      if (declaredVariablesMap[jsIdentifier]) {
        jsStatements += `${jsIdentifier} = ${jsValueExpression};\n`;
      } else {
        jsStatements += `let ${jsIdentifier} = ${jsValueExpression};\n`;
        declaredVariablesMap[jsIdentifier] = true;
      }
    } else if (astStatement.type === 'WhileStatement') {
      const jsConditionExpression = generateJsExpression(astStatement.condition);
      const jsBodyStatements = generateJsStatements(astStatement.body, declaredVariablesMap);
      const jsBodyStatementsIndented = indentJsStatements(jsBodyStatements);

      jsStatements += `while (${jsConditionExpression}) {\n${jsBodyStatementsIndented}}\n`;
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
