const { join, basename } = require('node:path');
const { readFile, readdir, writeFile } = require('node:fs/promises');
const nearley = require('nearley');
const rules = require('./rules/rules');

async function myplToAst() {
  try {
    // create grammar from compiled rules
    const grammar = nearley.Grammar.fromCompiled(rules);

    // get list of MyPL files
    const myplDirPath = join(__dirname, '..', 'mypl');
    const astDirPath = join(__dirname, '..', 'ast');
    const myplFilesNames = await readdir(myplDirPath);

    for (const myplFileName of myplFilesNames) {
      // read MyPL file data
      const myplFilePath = join(myplDirPath, myplFileName);
      const myplFileData = await readFile(myplFilePath, { encoding: 'utf8' });

      // generate AST
      const parser = new nearley.Parser(grammar);

      parser.feed(myplFileData);

      const ast = parser.results[0];

      // write AST file data
      const astFileName = basename(myplFileName, '.mypl') + '.ast';
      const astFilePath = join(astDirPath, astFileName);
      const astFileData = JSON.stringify(ast, null, '  ') + '\n';

      await writeFile(astFilePath, astFileData, { encoding: 'utf-8' });
    }
  } catch (error) {
    console.error(error);
  }
}

async function astToJs() {
  try {
    // get list of AST files
    const astDirPath = join(__dirname, '..', 'ast');
    const jsDirPath = join(__dirname, '..', 'js');
    const astFilesNames = await readdir(astDirPath);

    for (const astFileName of astFilesNames) {
      // read AST file data
      const astFilePath = join(astDirPath, astFileName);
      const astFileData = await readFile(astFilePath, { encoding: 'utf8' });
      const ast = JSON.parse(astFileData);

      // generate JS
      const jsCodeLines = generateJsCodeLinesFromAstStatements(ast);
      const jsFileData = jsCodeLines.join('');

      // write JS file data
      const jsFileName = basename(astFileName, '.ast') + '.js';
      const jsFilePath = join(jsDirPath, jsFileName);

      await writeFile(jsFilePath, jsFileData, { encoding: 'utf-8' });
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * @param {{type: string, [key: string]: any}[]} astStatements
 * @returns {string[]}
 */
function generateJsCodeLinesFromAstStatements(astStatements) {
  const jsCodeLines = [];

  for (const statement of astStatements) {
    if (statement.type === 'PrintStatement') {
      const jsValue = generateJsValueFromExpression(statement.value);

      jsCodeLines.push(`console.log(${jsValue});\n`);
    } else if (statement.type === 'AssignmentStatement') {
    } else if (statement.type === 'WhileStatement') {
    }
  }

  return jsCodeLines;
}

/**
 * @param {{type: string, [key: string]: any}} expression
 * @returns {string}
 * */
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

async function main() {
  await myplToAst();
  await astToJs();
}

main();
